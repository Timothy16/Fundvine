// composables/useAuthStatus.ts
export const useAuthStatus = () => {
  const { status } = useAuth()
  
  // Return reactive status directly, not cached in useState
  return status
}