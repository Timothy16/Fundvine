// composables/useAuthUser.ts
import { type User } from "./useAuthToken"

export const useAuthUser = () => {
  const { data } = useAuth()
  
  // Return computed user that updates when session changes
  return computed(() => {
    return data.value?.user as User || null
  })
}