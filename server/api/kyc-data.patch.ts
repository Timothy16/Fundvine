// server/api/kyc-data.post.ts
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
    const requiredFields = ['nin', 'bvn', 'address', 'contact_phone_number', 'date_of_birth', 'gender']
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
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/profile/kyc-data`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`
      },
      body: {
        nin: body.nin,
        bvn: body.bvn,
        address: body.address,
        country_of_origin_id: body.country_of_origin_id,
        state_of_origin_id: body.state_of_origin_id,
        lga_of_origin_id: body.lga_of_origin_id,
        contact_phone_number: body.contact_phone_number,
        date_of_birth: body.date_of_birth,
        gender: body.gender,
        is_corporate: body.is_corporate,
        company_name: body.company_name || '',
        rc_number: body.rc_number || '',
        next_of_kin_name: body.next_of_kin_name,
        maiden_name: body.maiden_name
      }
    })

    // Return success response
    return {
      success: true,
      message: 'KYC data saved successfully',
      data: response
    }

  } catch (error: any) {
    console.error('KYC data submission error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Failed to save KYC data',
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