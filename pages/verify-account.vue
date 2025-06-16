<template>
  <div class="flex flex-col min-h-screen p-2 bg-[#1a3c6d] items-center justify-center">
    <!-- Logo at the Top -->
    <div class="mb-6">
      <img
        src="/images/logo.png" 
        alt="Logo"
        class="h-10"
      />
    </div>

    <!-- Verification Form (Show when not verified) -->
    <div v-if="!isVerified" class="bg-white rounded-lg shadow-lg px-10 py-12 text-center max-w-md w-full">
      <!-- Email Icon -->
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
        <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </div>

      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Verify Your Email</h2>
      <p class="text-gray-600 mb-6">
        We've sent a 6-digit verification code to your email address. Please enter it below to verify your account.
      </p>

      <!-- Error Message -->
      <div v-if="error" class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Success Message for Resend -->
      <div v-if="resendSuccess" class="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-800">{{ resendSuccess }}</p>
          </div>
        </div>
      </div>

      <!-- Verification Code Form -->
      <form @submit.prevent="handleVerification" class="space-y-6">
        <div>
          <label for="verification-code" class="block text-sm font-medium text-gray-700 mb-2">
            6-Digit Verification Code
          </label>
          <input
            id="verification-code"
            type="text"
            v-model="verificationCode"
            maxlength="6"
            :class="[
              'block w-full px-4 py-3 text-center text-2xl font-mono border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              error ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="000000"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading || verificationCode.length !== 6"
          :class="[
            'w-full flex justify-center py-3 px-6 rounded-md text-white font-medium',
            isLoading || verificationCode.length !== 6
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          ]"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Verifying...' : 'Verify Email' }}
        </button>
      </form>

      <!-- Resend Section -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-600 mb-4">
          Didn't receive the email?
        </p>
        <button
          @click="handleResendEmail"
          :disabled="isResending"
          :class="[
            'text-sm font-medium',
            isResending
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:text-blue-500'
          ]"
        >
          {{ isResending ? 'Sending...' : 'Resend verification email' }}
        </button>
      </div>
    </div>

    <!-- Success State (Show after verification) -->
    <div v-else class="bg-white rounded-lg shadow-lg px-10 py-12 text-center max-w-md w-full">
      <svg
        class="w-16 h-16 mx-auto text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4M7 12a5 5 0 11-2 0m2-5a5 5 0 01.883-2.872A5 5 0 0121 12m-7 7a5 5 0 10-4-9.874"
        />
      </svg>
      <h2 class="mt-6 text-2xl font-semibold text-gray-900">Account Successfully Verified!</h2>
      <p class="mt-4 text-gray-600">
        Your account has been verified. You can now access your dashboard.
      </p>
      <button
        @click="goToDashboard"
        class="mt-6 w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-300"
      >
        Go to Dashboard →
      </button>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ['auth'] // User must be logged in to access this page
})

const { apiRequest } = useApiService()
const config = useRuntimeConfig()
const router = useRouter()

// Form state
const verificationCode = ref('')
const isVerified = ref(false)

// UI state
const isLoading = ref(false)
const isResending = ref(false)
const error = ref('')
const resendSuccess = ref('')

// Message timeouts
let errorTimeout = null
let resendSuccessTimeout = null

// Clear error when user types
watch(verificationCode, () => {
  error.value = ''
  if (errorTimeout) {
    clearTimeout(errorTimeout)
    errorTimeout = null
  }
})

// Auto-hide error message after 5 seconds
watch(error, (newValue) => {
  if (newValue && errorTimeout) {
    clearTimeout(errorTimeout)
  }
  if (newValue) {
    errorTimeout = setTimeout(() => {
      error.value = ''
      errorTimeout = null
    }, 5000)
  }
})

// Auto-hide resend success message after 5 seconds
watch(resendSuccess, (newValue) => {
  if (newValue && resendSuccessTimeout) {
    clearTimeout(resendSuccessTimeout)
  }
  if (newValue) {
    resendSuccessTimeout = setTimeout(() => {
      resendSuccess.value = ''
      resendSuccessTimeout = null
    }, 5000)
  }
})


const handleVerificationOld = async () => {
  if (verificationCode.value.length !== 6) {
    error.value = 'Please enter a valid 6-digit code'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const payload = {
      code: verificationCode.value
    }

    await apiRequest(
      `${config.public.apiBaseUrl}/api/client/v2/auth/verify-email`,
      {
        method: 'POST',
        body: payload
      }
    )

    // Verification successful
    isVerified.value = true

  } catch (err) {
    console.error('Verification error:', err)
    
    // Handle different error types
    if (err.status === 422) {
      error.value = 'Invalid verification code. Please check and try again.'
    } else if (err.status === 400) {
      error.value = 'Verification code has expired. Please request a new one.'
    } else {
      error.value = err.message || 'Verification failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleResendEmailOld = async () => {
  isResending.value = true
  error.value = ''
  resendSuccess.value = ''

  try {
    await apiRequest(
      `${config.public.apiBaseUrl}/api/client/v2/auth/resend-email-verification`,
      {
        method: 'POST'
      }
    )

    // Resend successful
    resendSuccess.value = 'Verification email sent successfully! Please check your inbox.'
    
    // Clear the current verification code
    verificationCode.value = ''

  } catch (err) {
    console.error('Resend error:', err)
    error.value = err.message || 'Failed to resend email. Please try again.'
  } finally {
    isResending.value = false
  }
}

const handleVerification = async () => {
  if (verificationCode.value.length !== 6) {
    error.value = 'Please enter a valid 6-digit code'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const payload = {
      code: verificationCode.value
    }

    // Call the server API route instead of external API directly
    const response = await $fetch('/api/verify-email', {
      method: 'POST',
      body: payload
    })

    // Verification successful - just set the verified state
    // We'll handle navigation separately since NextAuth session update is complex
    isVerified.value = true

  } catch (err) {
    console.error('Verification error:', err)
    
    // Handle different error types
    if (err.statusCode === 422) {
      error.value = 'Invalid verification code. Please check and try again.'
    } else if (err.statusCode === 400) {
      error.value = 'Verification code has expired. Please request a new one.'
    } else {
      error.value = err.statusMessage || err.message || 'Verification failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

const goToDashboard = async () => {
  // Navigate using router after verification
  await router.push('/dashboard/offers')
}

const handleResendEmail = async () => {
  isResending.value = true
  error.value = ''
  resendSuccess.value = ''

  try {
    // Call the server API route instead of external API directly
    const response = await $fetch('/api/resend-email-verification', {
      method: 'POST'
    })

    // Resend successful
    resendSuccess.value = 'Verification email sent successfully! Please check your inbox.'
    
    // Clear the current verification code
    verificationCode.value = ''

  } catch (err) {
    console.error('Resend error:', err)
    error.value = err.statusMessage || err.message || 'Failed to resend email. Please try again.'
  } finally {
    isResending.value = false
  }
}

// Cleanup timeouts on component unmount
onUnmounted(() => {
  if (errorTimeout) clearTimeout(errorTimeout)
  if (resendSuccessTimeout) clearTimeout(resendSuccessTimeout)
})
</script>