// composables/useAuthToken.ts
export interface User {
  full_name: string;
  last_name: string;
  is_corporate: boolean;
  email_verified: boolean;
  account_approved: boolean;
  accessToken: string;
  profile: {
    full_name: string;
    last_name: string;
    is_corporate: boolean;
    email_verified: boolean;
    account_approved: boolean;
  };
}

export const useAuthToken = () => {
  const { data } = useAuth()
  
  // Return computed token that updates when session changes
  return computed(() => {
    const user = data.value?.user as User
    return user?.accessToken || null
  })
}