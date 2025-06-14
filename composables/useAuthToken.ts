// composables/useAuthToken.ts
export interface User {
   
    full_name: string;
    last_name: string;
    is_corporate: boolean ;
    email_verified: boolean;
    account_approved: boolean;
    accessToken: string;
    profile: {
      full_name: string;
      last_name: string;
      is_corporate: boolean ;
      email_verified: boolean;
      account_approved: boolean;
    };
  }
  
  
  export const useAuthToken = () => {
    const { data } = useAuth()
    
    let token: string | null = null
    const user = data.value?.user ? data.value?.user as User : null
    
    if (user) {
      token = user.accessToken
    }
    
    return useState('token', () => token)
  }