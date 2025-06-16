<template>
    <div class="flex min-h-screen">
        <!-- Mobile Back Button -->
      <div class="md:hidden fixed top-4 left-4 z-50">
        <NuxtLink to="/" class="flex items-center text-gray-700 hover:text-[#1a3c6d]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="ml-2">Back</span>
        </NuxtLink>
      </div>
      <!-- Left Side -->
      <div class="hidden md:flex w-2/5 sidebar-gradient flex-col justify-start items-start px-8 py-6 relative">
        <NuxtLink to="/" class="mt-4 z-20">
          <img src="/images/logo.png" alt="Logo" class="h-12" />
        </NuxtLink>
        <!-- Subtle pattern -->
        <div class="absolute inset-0 opacity-20">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="M0 50 L50 0 L100 50 L50 100 Z" fill="none" stroke="#ffffff" stroke-width="0.5" />
          </svg>
        </div>
      </div>
  
      <!-- Right Side -->
      <div class="flex flex-1 items-center justify-center bg-gray-50">
        <div class="w-full max-w-3xl px-6 md:px-12 py-8 rounded-lg mt-16 md:mt-0">
          <h2 class="text-3xl font-semibold text-gray-900">Forgot Password</h2>
          <p class="text-sm text-gray-600 mt-2">
            Enter the email address linked to your account in order to reset your password.
          </p>

          <!-- Error Alert -->
          <div v-if="error" class="mb-6 mt-5 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
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
  
          <!-- Form -->
          <form class="mt-6 space-y-6 mb-3" @submit.prevent="handleForgotPassword">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                v-model="email"
                :class="[
                  'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffa500] focus:border-[#ffa500] text-gray-900',
                  error ? 'border-red-500' : 'border-gray-300'
                ]"
                placeholder="Email Address"
                required
              />
            </div>
  
            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading"
              :class="[
                'w-full mt-5 px-6 py-3 rounded-md focus:ring-2 focus:ring-[#1a3c6d]-500 flex justify-center items-center',
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-[#1a3c6d] hover:bg-[#1a3c6d] text-white'
              ]"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Sending...' : 'Reset Password →' }}
            </button>
          </form>
  
          <!-- Go Back Link -->
          <div class="mt-6">
            <NuxtLink to="/login" class="text-sm text-[#1a3c6d] hover:text-blue-900">
              Go back
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <!-- Success Icon -->
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Email Sent!</h3>
        <p class="text-gray-600 mb-6">
          We've sent a password reset link to <strong>{{ email }}</strong>. Please check your inbox and follow the instructions to reset your password.
        </p>
        
        <!-- Actions -->
        <div class="space-y-3">
          <button
            @click="closeModal"
            class="w-full bg-[#1a3c6d] text-white py-2 px-4 rounded-md hover:bg-[#1a3c6d] focus:ring-2 focus:ring-[#1a3c6d]-400"
          >
            Got it
          </button>
          <button
            @click="goToLogin"
            class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-400"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
</template>
<script setup>
const router = useRouter()

// Form data
const email = ref('')

// UI state
const isLoading = ref(false)
const error = ref('')
const showSuccessModal = ref(false)

// Message timeout
let errorTimeout = null

// Clear error when user types
watch(email, () => {
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

const handleForgotPassword = async () => {
  if (!email.value) {
    error.value = 'Please enter your email address'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const payload = {
      email: email.value
    }

    // Call the server API route instead of external API directly
    const response = await $fetch('/api/forgot-password', {
      method: 'POST',
      body: payload
    })

    // Success - show modal
    showSuccessModal.value = true

  } catch (err) {
    console.error('Forgot password error:', err)
    
    // Handle different error types
    if (err.statusCode === 404) {
      error.value = 'No account found with this email address.'
    } else if (err.statusCode === 422) {
      error.value = 'Please enter a valid email address.'
    } else if (err.statusCode === 429) {
      error.value = 'Too many requests. Please try again later.'
    } else {
      error.value = err.statusMessage || err.message || 'Failed to send reset email. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  showSuccessModal.value = false
  // Clear the form
  email.value = ''
}

const goToLogin = () => {
  showSuccessModal.value = false
  router.push('/login')
}

// Cleanup timeout on component unmount
onUnmounted(() => {
  if (errorTimeout) clearTimeout(errorTimeout)
})
</script>

<style>
.sidebar-gradient {
  background-image: linear-gradient(90deg, #1a3c6d, #102442);
}

.sidebar-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
</style>