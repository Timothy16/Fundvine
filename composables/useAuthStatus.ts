// composables/useAuthStatus.ts
export const useAuthStatus = () => {
    const { status } = useAuth()
    
    return useState('authenticated', () => status)
  }