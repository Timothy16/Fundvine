// server/api/mutual-funds/liquidate-fund.post.ts
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
    if (!body.subscription_id || !body.units || !body.type) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: subscription_id, units, type'
      })
    }

    // Validate type
    if (!['MATURITY', 'PARTIAL'].includes(body.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid type. Must be MATURITY or PARTIAL'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/funds/liquidate-fund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`
      },
      body: {
        subscription_id: body.subscription_id,
        units: body.units,
        type: body.type
      }
    })

    // Return success response
    return {
      success: true,
      message: 'Fund liquidation successful',
      data: response.data
    }

  } catch (error: any) {
    console.error('Fund liquidation error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Failed to liquidate fund',
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