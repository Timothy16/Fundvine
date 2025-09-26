// server/api/mutual-funds/subscription/index.post.ts
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
    if (!body.fund_id || typeof body.units !== 'number' || typeof body.auto_reinvest !== 'boolean') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: fund_id, units, auto_reinvest'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/funds/subscribe-to-fund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`
      },
      body: {
        fund_id: body.fund_id,
        auto_reinvest: body.auto_reinvest,
        units: body.units
      }
    })

    // Return success response
    return {
      success: true,
      message: 'Fund subscription successful',
      data: response.data
    }

  } catch (error: any) {
    console.error('Fund subscription error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Failed to subscribe to fund',
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