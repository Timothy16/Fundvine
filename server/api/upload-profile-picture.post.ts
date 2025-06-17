// server/api/upload-profile-picture.post.ts
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

    // Get the form data
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 422,
        statusMessage: 'No file uploaded'
      })
    }

    // Find the profile image file
    const profileFile = formData.find(item => item.name === 'profile')
    
    if (!profileFile) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Profile image file is required'
      })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(profileFile.type || '')) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Invalid file type. Please upload JPG, PNG, GIF, or WEBP images only.'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Prepare FormData for external API
    const externalFormData = new FormData()
    const blob = new Blob([profileFile.data], { type: profileFile.type })
    externalFormData.append('profile', blob, profileFile.filename || 'profile.jpg')

    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/profile/upload-profile-picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.user.accessToken}`
      },
      body: externalFormData
    })

    // Return success response
    return {
      success: true,
      message: 'Profile picture uploaded successfully',
      data: response
    }

  } catch (error: any) {
    console.error('Profile picture upload error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Profile picture upload failed',
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