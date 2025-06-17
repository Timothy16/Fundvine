// server/api/upload-means-of-id.post.ts
import { getServerSession } from '#auth'

// server/api/upload-means-of-id.post.ts

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
        statusMessage: 'No data uploaded'
      })
    }

    // Extract form fields
    let documentFile = null
    let target = null
    let meansId = null

    formData.forEach(item => {
      if (item.name === 'document') {
        documentFile = item
      } else if (item.name === 'target') {
        target = new TextDecoder().decode(item.data)
      } else if (item.name === 'means_id') {
        meansId = new TextDecoder().decode(item.data)
      }
    })

    // Validate required fields
    if (!documentFile) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Document file is required'
      })
    }

    if (!target || !['front', 'back'].includes(target)) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Valid target (front or back) is required'
      })
    }

    if (!meansId) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Means ID is required'
      })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(documentFile.type || '')) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Invalid file type. Please upload JPG, PNG, or PDF files only.'
      })
    }

    // Validate file size (2MB limit)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (documentFile.data.length > maxSize) {
      throw createError({
        statusCode: 422,
        statusMessage: 'File size exceeds 2MB limit'
      })
    }

    // Get runtime config for API base URL
    const config = useRuntimeConfig()
    
    // Prepare FormData for external API
    const externalFormData = new FormData()
    const blob = new Blob([documentFile.data], { type: documentFile.type })
    externalFormData.append('document', blob, documentFile.filename || `${target}.${documentFile.type?.split('/')[1] || 'jpg'}`)
    externalFormData.append('target', target)
    externalFormData.append('means_id', meansId)

    // Make the external API call
    const response = await $fetch(`${config.apiBaseUrl}/api/client/v2/profile/upload-means-of-id`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.user.accessToken}`
      },
      body: externalFormData
    })

    // Return success response
    return {
      success: true,
      message: 'Document uploaded successfully',
      data: response
    }

  } catch (error: any) {
    console.error('Document upload error:', error)
    
    // Handle different types of errors
    if (error.response) {
      // API responded with an error
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: error.response._data?.message || 'Document upload failed',
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