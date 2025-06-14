export default defineNuxtRouteMiddleware(async (to) => {
  const { status, data: authData } = useAuth()
  
  // If the user is not authenticated
  if (status.value === 'unauthenticated') {
    // Allow access to public pages
    if (to.path === '/login' || to.path === '/register' || to.path === '/') {
      return
    }
    
    // Redirect to login for all other pages
    return navigateTo('/login')
  }
  
  // If user is authenticated, get their data
  if (status.value === 'authenticated') {
    const user = authData.value?.user
    
    // If we're on login page and user is authenticated, redirect based on email verification
    if (to.path === '/login') {
      if (user?.email_verified) {
        return navigateTo('/dashboard/offers')
      } else {
        return navigateTo('/verify-account')
      }
    }
    
    // If trying to access verify-account but email is already verified
    if (to.path === '/verify-account' && user?.email_verified) {
      return navigateTo('/dashboard/offers')
    }
    
    // If trying to access dashboard pages but email is not verified
    if (to.path.startsWith('/dashboard') && !user?.email_verified) {
      return navigateTo('/verify-account')
    }

    // If trying to access kyc pages but email is not verified
    if (to.path.startsWith('/kyc') && !user?.email_verified) {
      return navigateTo('/verify-account')
    }

    if (to.path.startsWith('/settings') && !user?.email_verified) {
      return navigateTo('/verify-account')
    }

    if (to.path.startsWith('/transactions') && !user?.email_verified) {
      return navigateTo('/verify-account')
    }
    
    // Allow access to verify-account if email is not verified
    if (to.path === '/verify-account' && !user?.email_verified) {
      return
    }
  }
})