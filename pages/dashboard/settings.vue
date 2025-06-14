// pages/dashboard/settings.vue
<template>
  <NuxtLayout name="dashboard">
    <div class="h-full">
      <!-- Tabs -->
      <div class="bg-white border-b border-gray-200">
        <nav class="flex gap-4 p-2 px-6">
          <button 
            @click="activeTab = 'profile'"
            :class="[
              'px-4 py-2 focus:outline-none',
              activeTab === 'profile' ? 'text-white bg-green-600 rounded-lg' : 'text-gray-600'
            ]"
          >
            Profile
          </button>
          <button 
            @click="activeTab = 'password'"
            :class="[
              'px-4 py-2 focus:outline-none',
              activeTab === 'password' ? 'text-white bg-green-600 rounded-lg' : 'text-gray-600'
            ]"
          >
            Change Password
          </button>
        </nav>
      </div>

      <!-- Profile Tab Content -->
      <div v-if="activeTab === 'profile'" class="mt-6">
        <div class="bg-green-50">
          <div class="px-6 py-4">
            <h2 class="text-gray-700">Personal Information</h2>
          </div>
        </div>

        <div class="bg-white px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="space-y-1">
              <label class="text-sm text-gray-500">FIRST NAME</label>
              <p class="text-gray-900">Bekee</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">MIDDLE NAME</label>
              <p class="text-gray-900">N/A</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">LAST NAME</label>
              <p class="text-gray-900">Franklin</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">EMAIL ADDRESS</label>
              <p class="text-gray-900">frank4up@yahoo.com</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">PHONE NUMBER</label>
              <p class="text-gray-900 flex items-center">
                <img src="/images/flag.svg" alt="NG" class="h-4 w-6 mr-2" />
                2348067937292
              </p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">BVN</label>
              <p class="text-gray-900">2224*******</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">ADDRESS</label>
              <p class="text-gray-900">273b Ajose Adeogun Street</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">NEXT OF KIN NAME</label>
              <p class="text-gray-900">Bekee Jayden Chimebuka</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">NEXT OF KIN PHONE NUMBER</label>
              <p class="text-gray-900 flex items-center">
                <img src="/images/flag.svg" alt="NG" class="h-4 w-6 mr-2" />
                8067937292
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Change Password Tab Content -->
      <div v-if="activeTab === 'password'" class="mt-6">
        <div class="bg-green-50">
          <div class="px-6 py-4">
            <h2 class="text-gray-700">Change Password</h2>
          </div>
        </div>

        <div class="bg-white px-6 py-4">
          <div class="max-w-2xl">
            <!-- Success/Error Messages -->
            <div v-if="success" class="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-green-800">{{ success }}</p>
                </div>
              </div>
            </div>

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

            <form @submit.prevent="handlePasswordChange">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm mb-2">Current Password</label>
                  <div class="relative">
                    <input 
                      :type="showCurrentPassword ? 'text' : 'password'"
                      v-model="currentPassword"
                      :class="[
                        'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500',
                        fieldErrors.currentPassword ? 'border-red-500' : 'border-gray-300'
                      ]"
                      placeholder="Current Password"
                    />
                    <button 
                      type="button"
                      @click="showCurrentPassword = !showCurrentPassword"
                      class="absolute right-3 top-2.5"
                    >
                      <span class="material-icons text-gray-400">
                        {{ showCurrentPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                  <p v-if="fieldErrors.currentPassword" class="mt-1 text-sm text-red-600">{{ fieldErrors.currentPassword }}</p>
                </div>

                <div>
                  <label class="block text-sm mb-2">New Password</label>
                  <div class="relative">
                    <input 
                      :type="showNewPassword ? 'text' : 'password'"
                      v-model="newPassword"
                      :class="[
                        'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500',
                        fieldErrors.newPassword ? 'border-red-500' : 'border-gray-300'
                      ]"
                      placeholder="New Password"
                    />
                    <button 
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="absolute right-3 top-2.5"
                    >
                      <span class="material-icons text-gray-400">
                        {{ showNewPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                  <p v-if="fieldErrors.newPassword" class="mt-1 text-sm text-red-600">{{ fieldErrors.newPassword }}</p>
                </div>

                <div>
                  <label class="block text-sm mb-2">Confirm Password</label>
                  <div class="relative">
                    <input 
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-model="confirmPassword"
                      :class="[
                        'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500',
                        fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      ]"
                      placeholder="Confirm Password"
                    />
                    <button 
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute right-3 top-2.5"
                    >
                      <span class="material-icons text-gray-400">
                        {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                  <p v-if="fieldErrors.confirmPassword" class="mt-1 text-sm text-red-600">{{ fieldErrors.confirmPassword }}</p>
                </div>

                <!-- Password Policy -->
                <div class="bg-green-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-2">Password Policy</h3>
                  <ul class="space-y-1 text-sm">
                    <li>• one upper case letter [A-Z]</li>
                    <li>• one lower case letter [a-z]</li>
                    <li>• one digit [0-9]</li>
                    <li>• one special character [!@#$%*&_-+/]</li>
                    <li>• minimum length of eight characters</li>
                  </ul>
                </div>

                <button 
                  type="submit"
                  :disabled="isLoading"
                  :class="[
                    'w-full py-2 rounded-lg transition-colors flex justify-center items-center',
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  ]"
                >
                  <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLoading ? 'Changing Password...' : 'Change Password' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
definePageMeta({
  middleware: ['auth']
})

const { apiRequest } = useApiService()
const config = useRuntimeConfig()

const activeTab = ref('profile')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// UI state
const isLoading = ref(false)
const error = ref('')
const success = ref('')
const fieldErrors = ref({})
let successTimeout = null
let errorTimeout = null


const handlePasswordChange = async () => {
  // Reset states
  isLoading.value = true
  error.value = ''
  success.value = ''
  fieldErrors.value = {}

  // Client-side validation
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    error.value = 'All fields are required'
    isLoading.value = false
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'New password and confirm password do not match'
    isLoading.value = false
    return
  }

  try {
    const payload = {
      old_password: currentPassword.value,
      password: newPassword.value,
      confirm_password: confirmPassword.value
    }

    await apiRequest(
      `${config.public.apiBaseUrl}/api/client/v2/auth/change-password`,
      {
        method: 'POST',
        body: payload
      }
    )

    // Success
    success.value = 'Password changed successfully!'
    
    // Clear form
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''

  } catch (err) {
    console.error('Password change error:', err)
    
    // Handle validation errors (422)
    if (err.status === 422 && err.data?.errors) {
      const errors = {}
      err.data.errors.forEach(error => {
        // Map API field names to form field names
        if (error.field === 'old_password') {
          errors.currentPassword = error.message
        } else if (error.field === 'password') {
          errors.newPassword = error.message
        } else if (error.field === 'confirm_password') {
          errors.confirmPassword = error.message
        }
      })
      fieldErrors.value = errors
    } else {
      // Handle other errors
      error.value = err.message || 'Failed to change password. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

// Clear errors when user types (but keep success message)
watch([currentPassword, newPassword, confirmPassword], () => {
  error.value = ''
  fieldErrors.value = {}
  // Clear any existing timeouts
  if (errorTimeout) {
    clearTimeout(errorTimeout)
    errorTimeout = null
  }
})

// Auto-hide success message after 5 seconds
watch(success, (newValue) => {
  if (newValue && successTimeout) {
    clearTimeout(successTimeout)
  }
  if (newValue) {
    successTimeout = setTimeout(() => {
      success.value = ''
      successTimeout = null
    }, 5000)
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
</script>