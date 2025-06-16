import { NuxtAuthHandler } from "#auth"
import CredentialsProvider from "next-auth/providers/credentials"

const config = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || "your-secret-key",
  
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials: any) {
        
        try {
          // Make login API call
          const loginResponse = await $fetch<{
            status_code: number;
            message: string;
            data: {
              expires_at: string;
              token: string;
            }
          }>(
            config.apiBaseUrl+'/api/client/v2/auth/login',
            {
              method: "POST",
              body: {
                username: credentials.email,
                password: credentials.password,
              },
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          
          if (!loginResponse || loginResponse.status_code !== 200 || !loginResponse.data.token) {
            throw createError({
              statusCode: 422,
              statusMessage: "Invalid credentials",
            })
          }
          
          // Get user profile
          const profileResponse = await $fetch<{
            status_code: number;
            message: string;
            data: {
              
              full_name: string;
              last_name: string;
              is_corporate: boolean ;
              email_verified: boolean;
              account_approved: boolean;
              
            }
          }>(
             config.apiBaseUrl+'/api/client/v2/profile/my-account',
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${loginResponse.data.token}`,
              },
            }
          )
          
          if (!profileResponse || profileResponse.status_code !== 200) {
            throw createError({
              statusCode: 422,
              statusMessage: "Could not retrieve user profile",
            })
          }
          
          // Combine login and profile data for the JWT
          const userData = {
           
            full_name: profileResponse.data.full_name,
            last_name: profileResponse.data.last_name,
            is_corporate: profileResponse.data.is_corporate,
            email_verified: profileResponse.data.email_verified,
            account_approved: profileResponse.data.account_approved,
            accessToken: loginResponse.data.token,
            profile: profileResponse.data
          }
          
          return userData
        } catch (error: any) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Save user data and token in the JWT
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    // Make the user data and token available in the session
    async session({ session, token }) {
      if (token.user) {
        // Always fetch fresh user data when creating session
        try {
          const profileResponse = await $fetch<{
            status_code: number;
            message: string;
            data: {
              full_name: string;
              last_name: string;
              is_corporate: boolean;
              email_verified: boolean;
              account_approved: boolean;
            }
          }>(
            config.apiBaseUrl + '/api/client/v2/profile/my-account',
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.user.accessToken}`,
              },
            }
          )
          
          if (profileResponse && profileResponse.status_code === 200) {
            // Use fresh profile data
            session.user = {
              ...token.user,
              full_name: profileResponse.data.full_name,
              last_name: profileResponse.data.last_name,
              is_corporate: profileResponse.data.is_corporate,
              email_verified: profileResponse.data.email_verified,
              account_approved: profileResponse.data.account_approved,
              profile: profileResponse.data
            }
          } else {
            // Fallback to token data if API fails
            session.user = token.user
          }
        } catch (error) {
          console.error("Error fetching fresh user profile:", error)
          // Fallback to token data if API fails
          session.user = token.user
        }
      }
      return session
    }
  },
})