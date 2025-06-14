// composables/useAuthUser.ts
import { type User } from "./useAuthToken"

export const useAuthUser = () => {
  const { data } = useAuth()
  
  const user = data.value?.user ? data.value?.user as User : null
  
  return useState('user', () => user)
}