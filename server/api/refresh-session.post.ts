// server/api/refresh-session.post.ts
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    // Get the current session
    const session = await getServerSession(event)
    
    if (!session || !session.user?.accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - No valid session'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Fetch fresh user profile data
    const profileResponse = await $fetch(`${config.apiBaseUrl}/api/client/v2/profile/my-account`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`
      }
    })

    if (!profileResponse || profileResponse.status_code !== 200) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch user profile'
      })
    }

    // Return the fresh user data
    return {
      success: true,
      message: 'Session refreshed successfully',
      user: {
        full_name: profileResponse.data.full_name,
        last_name: profileResponse.data.last_name,
        is_corporate: profileResponse.data.is_corporate,
        email_verified: profileResponse.data.email_verified,
        account_approved: profileResponse.data.account_approved,
        is_kyc_complete :profileResponse.data.is_kyc_complete,
        accessToken: session.user.accessToken,
        profile: profileResponse.data
      }
    }

  } catch (error: any) {
    console.error('Session refresh error:', error)
    
    // Handle different types of errors
    if (error.response) {
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Failed to refresh session',
        data: error.response._data
      })
    } else if (error.statusCode) {
      throw error
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error'
      })
    }
  }
})