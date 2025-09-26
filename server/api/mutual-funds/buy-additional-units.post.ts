// server/api/mutual-funds/buy-additional-units.post.ts
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

    // Get the request body
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.subscription_id || typeof body.units !== 'number') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: subscription_id, units'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/funds/buy-additional-units`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`
      },
      body: {
        subscription_id: body.subscription_id,
        units: body.units
      }
    })

    // Return success response
    return {
      success: true,
      message: 'Additional units purchased successfully',
      data: response.data
    }

  } catch (error: any) {
    console.error('Buy additional units error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Failed to buy additional units',
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