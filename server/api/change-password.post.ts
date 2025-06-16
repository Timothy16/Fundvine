// server/api/change-password.post.ts
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    // Get the session to extract the access token
    const session = await getServerSession(event)
    
    if (!session || !session.user?.accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - No valid session'
      })
    }

    // Get request body
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.old_password || !body.password || !body.confirm_password) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Missing required fields'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user?.accessToken}`
      },
      body: {
        old_password: body.old_password,
        password: body.password,
        confirm_password: body.confirm_password
      }
    })

    // Return success response
    return {
      success: true,
      message: 'Password changed successfully',
      data: response
    }

  } catch (error: any) {
    console.error('Change password error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Failed to change password',
        data: error.response._data
      })
    } else if (error.statusCode) {
      // Already a proper error, re-throw
      throw error
    } else {
      // Unknown error
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error'
      })
    }
  }
})