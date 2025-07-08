// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { status, data: authData, getSession } = useAuth()
  
  // If the user is not authenticated
  if (status.value === 'unauthenticated') {
    // Allow access to public pages
    if (to.path === '/login' || to.path === '/register' || to.path === '/' || to.path === '/forgot-password') {
      return
    }
    
    // Redirect to login for all other pages
    return navigateTo('/login')
  }
  
  // If user is authenticated, get their data
  if (status.value === 'authenticated') {
    let user = authData.value?.user
    
    // For protected routes, ensure we have the latest session data
    const protectedRoutes = ['/dashboard', '/kyc', '/settings', '/transactions']
    const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
    
    // Force refresh session for protected routes to get latest user data
    if (isProtectedRoute) {
      try {
        console.log('Middleware: Refreshing session for protected route...')
        const freshSession = await getSession({ force: true })
        user = freshSession?.user || user
        console.log('Middleware: Fresh user data:', { email_verified: user?.email_verified })
      } catch (error) {
        console.error('Middleware: Failed to refresh session:', error)
        // Continue with existing user data as fallback
      }
    }
    
    // If we're on login page and user is authenticated, redirect based on email verification
    if (to.path === '/login') {
      if (user?.email_verified) {
        return navigateTo('/dashboard')
      } else {
        return navigateTo('/verify-account')
      }
    }
    
    // If trying to access verify-account but email is already verified
    if (to.path === '/verify-account' && user?.email_verified) {
      return navigateTo('/dashboard')
    }
    
    // If trying to access dashboard pages but email is not verified
    if (to.path.startsWith('/dashboard') && !user?.email_verified) {
      console.log('Middleware: Redirecting to verify-account, email_verified:', user?.email_verified)
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