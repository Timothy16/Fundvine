// server/api/forgot-password.post.ts
export default defineEventHandler(async (event) => {
  try {
    // Get request body
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.email) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Email address is required'
      })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Please enter a valid email address'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/auth/forgot-password-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email: body.email
      }
    })

    // Return success response
    return {
      success: true,
      message: 'Password reset email sent successfully',
      data: response
    }

  } catch (error: any) {
    console.error('Forgot password error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      const status = error.response.status || 500
      const errorData = error.response._data
      
      // Map specific error statuses to user-friendly messages
      let statusMessage = 'Failed to send reset email'
      if (status === 404) {
        statusMessage = 'No account found with this email address'
      } else if (status === 422) {
        statusMessage = 'Please enter a valid email address'
      } else if (status === 429) {
        statusMessage = 'Too many requests. Please try again later'
      }
      
      throw createError({
        statusCode: status,
        statusMessage: errorData?.message || statusMessage,
        data: errorData
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