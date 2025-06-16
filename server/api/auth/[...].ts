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
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    // Store the access token in the JWT
    async jwt({ token, user }) {
      if (user) {
        // On signin, store the access token
        token.accessToken = user.accessToken
        token.user = user
      }
      return token
    },
    
    // Always fetch fresh user data in session callback
    async session({ session, token }) {
      if (token.accessToken) {
        console.log('Session callback - Always fetching fresh user data...')
        
        try {
          // Always fetch fresh profile data from API
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
                "Authorization": `Bearer ${token.accessToken}`,
              },
            }
          )
          
          console.log('Fresh profile API response:', {
            status: profileResponse?.status_code,
            email_verified: profileResponse?.data?.email_verified
          })
          
          if (profileResponse && profileResponse.status_code === 200) {
            // Always use fresh data from API
            session.user = {
              full_name: profileResponse.data.full_name,
              last_name: profileResponse.data.last_name,
              is_corporate: profileResponse.data.is_corporate,
              email_verified: profileResponse.data.email_verified,
              account_approved: profileResponse.data.account_approved,
              accessToken: token.accessToken,
              profile: profileResponse.data
            }
            
            console.log('Session updated with fresh user data:', { 
              email_verified: session.user.email_verified 
            })
          } else {
            console.error('Failed to fetch fresh profile data')
            // Fallback to token data if API fails
            session.user = token.user
          }
        } catch (error) {
          console.error("Error fetching fresh user profile:", error)
          // Fallback to token data if API fails
          session.user = token.user || {}
        }
      }
      
      return session
    }
  },
})