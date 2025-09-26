// server/api/mutual-funds/[id].get.ts
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    // Get the fund ID from the route parameters
    const id = event.context.params?.id
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Fund ID is required'
      })
    }

    // Get the session to extract the access token
    const session = await getServerSession(event)
    
    if (!session || !session.user?.accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized - No valid session'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/funds/fund-detail/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`
      }
    })

    // Return success response
    return {
      success: true,
      message: 'Fund details retrieved successfully',
      data: response.data
    }

  } catch (error: any) {
    console.error('Get fund detail error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Failed to fetch fund details',
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