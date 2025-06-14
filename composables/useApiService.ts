// /composables/useApiService.ts
import { $fetch, type FetchOptions, FetchError } from 'ofetch'
import { useAuthToken } from './useAuthToken'

export const useApiService = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl
  const tokenState = useAuthToken()
  
  /**
   * Make an authenticated API request
   * @param endpoint API endpoint path or full URL
   * @param options Fetch options
   * @returns Promise with response data or throws enhanced error object
   */
  const apiRequest = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    // Set up headers with auth token if available
    const headers: HeadersInit = {
      ...options.headers,
      'Content-Type': 'application/json'
    }
    
    if (tokenState.value) {
      headers['Authorization'] = `Bearer ${tokenState.value}`
    }
    
    try {
      // Make the request
      return await $fetch<T>(
        endpoint.startsWith('http') ? endpoint : `${baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`,
        {
          ...options,
          headers
        }
      )
    } catch (error) {
      // Handle error and enhance it with more information
      if (error instanceof FetchError) {
        // Extract the response data if it exists
        const responseData = error.response?._data
        
        // Create an enhanced error object
        const enhancedError: any = new Error(
          responseData?.message || error.message || 'An error occurred'
        )
        
        // Add additional properties from the response
        enhancedError.status = error.response?.status
        enhancedError.statusText = error.response?.statusText
        enhancedError.data = responseData
        
        // Add validation errors if they exist
        if (responseData?.errors) {
          enhancedError.errors = responseData.errors
        }
        
        throw enhancedError
      }
      
      // For other types of errors, just throw them as is
      throw error
    }
  }
  
  return {
    apiRequest
  }
}