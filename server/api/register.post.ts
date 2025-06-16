// server/api/register.post.ts
export default defineEventHandler(async (event) => {
  try {
    // Get request body
    const body = await readBody(event)
    
    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'user_email', 'phone_number', 'user_password']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      throw createError({
        statusCode: 422,
        statusMessage: `Missing required fields: ${missingFields.join(', ')}`
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/auth/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        first_name: body.first_name,
        last_name: body.last_name,
        user_email: body.user_email,
        phone_number: body.phone_number,
        user_password: body.user_password
      }
    })

    // Return success response
    return {
      success: true,
      message: 'Account created successfully',
      data: response
    }

  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Registration failed',
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