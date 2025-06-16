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
          <h2 class="text-3xl font-semibold text-gray-900">Create new account</h2>
          <p class="text-sm text-gray-600 mt-2">
            Already an investor?
            <NuxtLink to="login" class="text-[#1a3c6d] hover:text-[#1a3c6d]-900 font-medium">Login</NuxtLink>
          </p>

          <!-- General Error Alert -->
          <div v-if="generalError" class="mb-6 mt-5 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ generalError }}</p>
              </div>
            </div>
          </div>
  
          <!-- Form -->
          <form class="mt-8 space-y-6" @submit.prevent="handleRegistration">
            <!-- Name Fields in Two Columns -->
            <div class="flex flex-col md:flex-row md:space-x-4">
              <!-- First Name -->
              <div class="flex-1">
                <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  v-model="formData.first_name"
                  :class="[
                    'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900',
                    fieldErrors.first_name ? 'border-red-500' : 'border-gray-300'
                  ]"
                  placeholder="First Name"
                  required
                />
                <p v-if="fieldErrors.first_name" class="mt-1 text-sm text-red-600">{{ fieldErrors.first_name }}</p>
              </div>
  
              <!-- Last Name -->
              <div class="flex-1 mt-4 md:mt-0">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  v-model="formData.last_name"
                  :class="[
                    'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900',
                    fieldErrors.last_name ? 'border-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Last Name"
                  required
                />
                <p v-if="fieldErrors.last_name" class="mt-1 text-sm text-red-600">{{ fieldErrors.last_name }}</p>
              </div>
            </div>
  
            <!-- Contact Fields in Two Columns -->
            <div class="flex flex-col md:flex-row md:space-x-4">
              <!-- Phone Number -->
              <div class="flex-1">
                <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <div class="flex items-center mt-2">
                    <span class="flex items-center justify-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    <img src="/images/flag.svg" alt="Nigeria Flag" class="h-4 w-6" />
                    <span class="ml-2 text-gray-600">+234</span>
                    </span>
                  <input
                    id="phone-number"
                    type="tel"
                    v-model="formData.phoneInput"
                    :class="[
                      'block w-full px-4 py-3 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900',
                      fieldErrors.phone_number ? 'border-red-500' : 'border-gray-300'
                    ]"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <p v-if="fieldErrors.phone_number" class="mt-1 text-sm text-red-600">{{ fieldErrors.phone_number }}</p>
              </div>
  
              <!-- Email -->
              <div class="flex-1 mt-4 md:mt-0">
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  type="email"
                  v-model="formData.user_email"
                  :class="[
                    'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900',
                    fieldErrors.user_email ? 'border-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Email Address"
                  required
                />
                <p v-if="fieldErrors.user_email" class="mt-1 text-sm text-red-600">{{ fieldErrors.user_email }}</p>
              </div>
            </div>
  
            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="relative">
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="formData.user_password"
                  :class="[
                    'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900',
                    fieldErrors.user_password ? 'border-red-500' : 'border-gray-300'
                  ]"
                  placeholder="Minimum of 8 characters"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.09.25-.198.492-.316.724" />
                  </svg>
                </button>
              </div>
              <p v-if="fieldErrors.user_password" class="mt-1 text-sm text-red-600">{{ fieldErrors.user_password }}</p>
              <ul class="text-xs text-gray-500 mt-2 space-y-1">
                <li>✔️ One lowercase character</li>
                <li>✔️ One uppercase character</li>
                <li>✔️ One special character</li>
                <li>✔️ One number</li>
                <li>✔️ Minimum 8 characters</li>
              </ul>
            </div>
  
            <!-- Checkbox -->
            <div class="flex items-start">
              <input 
                id="terms" 
                type="checkbox" 
                v-model="formData.agreeToTerms"
                class="mt-1 mr-2 focus:ring-[#1a3c6d]-400" 
                required 
              />
              <label for="terms" class="text-sm text-gray-600">
                I acknowledge that I have read and agree to
                <a href="#" class="text-[#1a3c6d]-600 hover:text-[#1a3c6d]-900"> Terms and Conditions </a>
                and
                <a href="#" class="text-[#1a3c6d]-600 hover:text-[#1a3c6d]-900"> Privacy Policy </a>.
              </label>
            </div>
  
            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="isLoading"
                :class="[
                  'w-full flex justify-center bg-[#1a3c6d] text-white px-6 py-3 rounded-md hover:bg-[#1a3c6d]-600 focus:ring-2 focus:ring-[#1a3c6d]-400',
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                ]"
              >
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Creating Account...' : 'Get Started →' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
        <!-- Success Icon -->
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <!-- Congratulations Message -->
        <div v-if="!isLoggingIn">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Congratulations!</h3>
          <p class="text-gray-600 mb-6">Your account has been created successfully.</p>
        </div>
        
        <!-- Logging In Message -->
        <div v-else>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Sending Verification Email</h3>
          <p class="text-gray-600 mb-6">Please wait while we send verification email to your inbox...</p>
          
          <!-- Loading Spinner -->
          <div class="flex justify-center">
            <svg class="animate-spin h-8 w-8 text-[#1a3c6d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
const { signIn } = useAuth()
const router = useRouter()
const { apiRequest } = useApiService()
const config = useRuntimeConfig()

// Form data
const formData = ref({
  first_name: '',
  last_name: '',
  user_email: '',
  phoneInput: '', // This will be combined with +234
  user_password: '',
  agreeToTerms: false
})

// UI state
const isLoading = ref(false)
const showPassword = ref(false)
const generalError = ref('')
const fieldErrors = ref({})
const showSuccessModal = ref(false)
const isLoggingIn = ref(false)

// Clear field errors when user types
watch(formData, () => {
  fieldErrors.value = {}
  generalError.value = ''
}, { deep: true })

// Computed property for full phone number
const fullPhoneNumber = computed(() => {
  return formData.value.phoneInput ? `+234${formData.value.phoneInput}` : ''
})

const handleRegistration = async () => {
  if (!formData.value.agreeToTerms) {
    generalError.value = 'Please accept the terms and conditions'
    return
  }

  isLoading.value = true
  generalError.value = ''
  fieldErrors.value = {}

  try {
    // Prepare registration data
    const registrationData = {
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      user_email: formData.value.user_email,
      phone_number: fullPhoneNumber.value,
      user_password: formData.value.user_password
    }

    // Call the server API route instead of external API directly
    const response = await $fetch('/api/register', {
      method: 'POST',
      body: registrationData
    })

    // Registration successful, show success modal
    showSuccessModal.value = true
    
    // Wait 2 seconds to show congratulations message
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Switch to logging in state
    isLoggingIn.value = true
    
    // Now auto-login
    const loginResult = await signIn('credentials', {
      email: formData.value.user_email,
      password: formData.value.user_password,
      redirect: false
    })

    if (loginResult?.error) {
      // Registration succeeded but login failed
      isLoggingIn.value = false
      showSuccessModal.value = false
      generalError.value = 'Account created successfully, but auto-login failed. Please login manually.'
      // Redirect to login page after a delay
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } else {
      // Both registration and login successful
      // Force refresh the session to get updated user data
      const { getSession } = useAuth()
      await getSession({ force: true })
      
      // Wait a moment to show the sending email state and ensure session is updated
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/verify-account')
    }

  } catch (error) {
    console.error('Registration error:', error)
    
    // Handle validation errors (422)
    if (error.statusCode === 422 && error.data?.data?.errors) {
      const errors = {}
      error.data.data.errors.forEach(err => {
        errors[err.field] = err.message
      })
      fieldErrors.value = errors
    } else {
      // Handle other errors
      generalError.value = error.statusMessage || error.message || 'Registration failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
const handleRegistrationOld = async () => {
  if (!formData.value.agreeToTerms) {
    generalError.value = 'Please accept the terms and conditions'
    return
  }

  isLoading.value = true
  generalError.value = ''
  fieldErrors.value = {}

  try {
    // Prepare registration data
    const registrationData = {
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      user_email: formData.value.user_email,
      phone_number: fullPhoneNumber.value,
      user_password: formData.value.user_password
    }

    // Call registration API
    const response = await apiRequest(
      `${config.public.apiBaseUrl}/api/client/v2/auth/create-account`,
      {
        method: 'POST',
        body: registrationData
      }
    )

    // Registration successful, show success modal
    showSuccessModal.value = true
    
    // Wait 2 seconds to show congratulations message
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Switch to logging in state
    isLoggingIn.value = true
    
    // Now auto-login
    const loginResult = await signIn('credentials', {
      email: formData.value.user_email,
      password: formData.value.user_password,
      redirect: false
    })

    if (loginResult?.error) {
      // Registration succeeded but login failed
      isLoggingIn.value = false
      showSuccessModal.value = false
      generalError.value = 'Account created successfully, but auto-login failed. Please login manually.'
      // Redirect to login page after a delay
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } else {
      // Both registration and login successful
      // Force refresh the session to get updated user data
      const { getSession } = useAuth()
      await getSession({ force: true })
      
      // Wait a moment to show the sending email state and ensure session is updated
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/verify-account')
    }

  } catch (error) {
    console.error('Registration error:', error)
    
    // Handle validation errors (422)
    if (error.status === 422 && error.data?.errors) {
      const errors = {}
      error.data.errors.forEach(err => {
        errors[err.field] = err.message
      })
      fieldErrors.value = errors
    } else {
      // Handle other errors
      generalError.value = error.message || 'Registration failed. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
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