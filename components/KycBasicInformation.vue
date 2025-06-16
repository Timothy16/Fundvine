<template>
  <div>
    <p class="text-sm text-gray-600 mb-4">Personal Information</p>
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Complete your profile</h3>

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

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Account Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Account Type</label>
        <div class="flex gap-4">
          <label class="flex items-center">
            <input
              type="radio"
              v-model="formData.is_corporate"
              :value="false"
              class="mr-2 focus:ring-[#1a3c6d]"
            />
            <span class="text-sm">Individual</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              v-model="formData.is_corporate"
              :value="true"
              class="mr-2 focus:ring-[#1a3c6d]"
            />
            <span class="text-sm">Corporate</span>
          </label>
        </div>
        <p v-if="fieldErrors.is_corporate" class="mt-1 text-sm text-red-600">{{ fieldErrors.is_corporate }}</p>
      </div>

      <!-- Corporate Fields (show only if corporate) -->
      <div v-if="formData.is_corporate" class="space-y-6">
        <div class="flex flex-col md:flex-row md:space-x-4">
          <div class="flex-1">
            <label for="company-name" class="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              id="company-name"
              type="text"
              v-model="formData.company_name"
              :class="[
                'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
                fieldErrors.company_name ? 'border-red-500' : 'border-gray-300'
              ]"
              placeholder="Company Name"
            />
            <p v-if="fieldErrors.company_name" class="mt-1 text-sm text-red-600">{{ fieldErrors.company_name }}</p>
          </div>

          <div class="flex-1 mt-4 md:mt-0">
            <label for="rc-number" class="block text-sm font-medium text-gray-700">RC Number</label>
            <input
              id="rc-number"
              type="text"
              v-model="formData.rc_number"
              :class="[
                'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
                fieldErrors.rc_number ? 'border-red-500' : 'border-gray-300'
              ]"
              placeholder="RC Number"
            />
            <p v-if="fieldErrors.rc_number" class="mt-1 text-sm text-red-600">{{ fieldErrors.rc_number }}</p>
          </div>
        </div>
      </div>

      <!-- NIN and BVN Fields -->
      <div class="flex flex-col md:flex-row md:space-x-4">
        <div class="flex-1">
          <label for="nin" class="block text-sm font-medium text-gray-700">National Identification Number (NIN)</label>
          <input
            id="nin"
            type="text"
            v-model="formData.nin"
            :class="[
              'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
              fieldErrors.nin ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="National Identification Number"
            required
          />
          <p v-if="fieldErrors.nin" class="mt-1 text-sm text-red-600">{{ fieldErrors.nin }}</p>
        </div>

        <div class="flex-1 mt-4 md:mt-0">
          <label for="bvn" class="block text-sm font-medium text-gray-700">Bank Verification Number (BVN)</label>
          <input
            id="bvn"
            type="text"
            v-model="formData.bvn"
            :class="[
              'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
              fieldErrors.bvn ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Bank Verification Number"
            required
          />
          <p v-if="fieldErrors.bvn" class="mt-1 text-sm text-red-600">{{ fieldErrors.bvn }}</p>
        </div>
      </div>

      <!-- Date of Birth and Gender -->
      <div class="flex flex-col md:flex-row md:space-x-4">
        <div class="flex-1">
          <label for="dob" class="block text-sm font-medium text-gray-700">Date of birth</label>
          <input
            id="dob"
            type="date"
            v-model="formData.date_of_birth"
            :class="[
              'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
              fieldErrors.date_of_birth ? 'border-red-500' : 'border-gray-300'
            ]"
            required
          />
          <p v-if="fieldErrors.date_of_birth" class="mt-1 text-sm text-red-600">{{ fieldErrors.date_of_birth }}</p>
        </div>

        <div class="flex-1 mt-4 md:mt-0">
          <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            v-model="formData.gender"
            :class="[
              'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
              fieldErrors.gender ? 'border-red-500' : 'border-gray-300'
            ]"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p v-if="fieldErrors.gender" class="mt-1 text-sm text-red-600">{{ fieldErrors.gender }}</p>
        </div>
      </div>

      <!-- Contact Phone Number -->
      <div>
        <label for="contact-phone" class="block text-sm font-medium text-gray-700">Contact Phone Number</label>
        <div class="flex items-center mt-2">
          <span class="flex items-center justify-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
            <img src="/images/flag.svg" alt="Nigeria Flag" class="h-4 w-6" />
            <span class="ml-2 text-gray-600">+234</span>
          </span>
          <input
            id="contact-phone"
            type="tel"
            v-model="formData.phoneInput"
            :class="[
              'block w-full px-4 py-3 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
              fieldErrors.contact_phone_number ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Contact Phone Number"
            required
          />
        </div>
        <p v-if="fieldErrors.contact_phone_number" class="mt-1 text-sm text-red-600">{{ fieldErrors.contact_phone_number }}</p>
      </div>

      <!-- Home Address -->
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Home Address</label>
        <textarea
          id="address"
          v-model="formData.address"
          rows="3"
          :class="[
            'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
            fieldErrors.address ? 'border-red-500' : 'border-gray-300'
          ]"
          placeholder="Home Address"
          required
        ></textarea>
        <p v-if="fieldErrors.address" class="mt-1 text-sm text-red-600">{{ fieldErrors.address }}</p>
      </div>

      <!-- Country, State, LGA -->
      <div class="space-y-6">
        <!-- Country -->
        <div>
          <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
          <select
            id="country"
            v-model="formData.country_of_origin_id"
            @change="onCountryChange"
            :class="[
              'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
              fieldErrors.country_of_origin_id ? 'border-red-500' : 'border-gray-300'
            ]"
            required
          >
            <option value="">Select Country</option>
            <option v-for="country in countries" :key="country.id" :value="country.id">
              {{ country.name }}
            </option>
          </select>
          <p v-if="fieldErrors.country_of_origin_id" class="mt-1 text-sm text-red-600">{{ fieldErrors.country_of_origin_id }}</p>
        </div>

        <!-- State and LGA -->
        <div class="flex flex-col md:flex-row md:space-x-4">
          <div class="flex-1">
            <label for="state" class="block text-sm font-medium text-gray-700">State Of Origin</label>
            <select
              id="state"
              v-model="formData.state_of_origin_id"
              @change="onStateChange"
              :disabled="!formData.country_of_origin_id || isLoadingStates"
              :class="[
                'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
                fieldErrors.state_of_origin_id ? 'border-red-500' : 'border-gray-300',
                (!formData.country_of_origin_id || isLoadingStates) ? 'bg-gray-100 cursor-not-allowed' : ''
              ]"
              required
            >
              <option value="">{{ isLoadingStates ? 'Loading...' : 'Select State' }}</option>
              <option v-for="state in states" :key="state.id" :value="state.id">
                {{ state.name }}
              </option>
            </select>
            <p v-if="fieldErrors.state_of_origin_id" class="mt-1 text-sm text-red-600">{{ fieldErrors.state_of_origin_id }}</p>
          </div>

          <div class="flex-1 mt-4 md:mt-0">
            <label for="lga" class="block text-sm font-medium text-gray-700">Local Government Area (LGA)</label>
            <select
              id="lga"
              v-model="formData.lga_of_origin_id"
              :disabled="!formData.state_of_origin_id || isLoadingLgas"
              :class="[
                'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
                fieldErrors.lga_of_origin_id ? 'border-red-500' : 'border-gray-300',
                (!formData.state_of_origin_id || isLoadingLgas) ? 'bg-gray-100 cursor-not-allowed' : ''
              ]"
              required
            >
              <option value="">{{ isLoadingLgas ? 'Loading...' : 'Select LGA' }}</option>
              <option v-for="lga in lgas" :key="lga.id" :value="lga.id">
                {{ lga.name }}
              </option>
            </select>
            <p v-if="fieldErrors.lga_of_origin_id" class="mt-1 text-sm text-red-600">{{ fieldErrors.lga_of_origin_id }}</p>
          </div>
        </div>
      </div>

      <!-- Next of Kin Name and Mother's Maiden Name -->
      <div class="flex flex-col md:flex-row md:space-x-4">
        <div class="flex-1">
          <label for="next-of-kin-name" class="block text-sm font-medium text-gray-700">Next of Kin Name</label>
          <input
            id="next-of-kin-name"
            type="text"
            v-model="formData.next_of_kin_name"
            :class="[
              'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
              fieldErrors.next_of_kin_name ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Next of Kin Name"
          />
          <p v-if="fieldErrors.next_of_kin_name" class="mt-1 text-sm text-red-600">{{ fieldErrors.next_of_kin_name }}</p>
        </div>

        <div class="flex-1 mt-4 md:mt-0">
          <label for="mothers-maiden-name" class="block text-sm font-medium text-gray-700">Mother's Maiden Name</label>
          <input
            id="mothers-maiden-name"
            type="text"
            v-model="formData.maiden_name"
            :class="[
              'mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900',
              fieldErrors.maiden_name ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Mother's Maiden Name"
          />
          <p v-if="fieldErrors.maiden_name" class="mt-1 text-sm text-red-600">{{ fieldErrors.maiden_name }}</p>
        </div>
      </div>

      <!-- Authorization Checkbox -->
      <div class="flex items-start">
        <input 
          id="authorization" 
          type="checkbox" 
          v-model="formData.authorization"
          class="mt-1 mr-2 focus:ring-[#1a3c6d]" 
          required 
        />
        <label for="authorization" class="text-sm text-gray-600">
          I hereby give authorization to access my BVN information with NIBSS
        </label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isLoading"
        :class="[
          'w-full px-6 py-3 rounded-md focus:ring-2 focus:ring-[#1a3c6d] flex justify-center items-center',
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed text-white' 
            : 'bg-[#1a3c6d] hover:bg-[#153154] text-white'
        ]"
      >
        <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isLoading ? 'Submitting...' : 'Submit Information' }}
      </button>
    </form>
  </div>
</template>
<script setup>
// Form data
const formData = ref({
  nin: '',
  bvn: '',
  address: '',
  country_of_origin_id: '',
  state_of_origin_id: '',
  lga_of_origin_id: '',
  phoneInput: '', // Will be converted to contact_phone_number
  date_of_birth: '',
  gender: '',
  is_corporate: false,
  company_name: '',
  rc_number: '',
  next_of_kin_name: '',
  maiden_name: '',
  authorization: false
})

// UI state
const isLoading = ref(false)
const success = ref('')
const error = ref('')
const fieldErrors = ref({})

// Location data
const countries = ref([])
const states = ref([])
const lgas = ref([])
const isLoadingStates = ref(false)
const isLoadingLgas = ref(false)

// Message timeouts
let successTimeout = null
let errorTimeout = null

// Computed property for full phone number
const fullPhoneNumber = computed(() => {
  return formData.value.phoneInput ? `+234${formData.value.phoneInput}` : ''
})

// Clear errors when user types
watch(formData, () => {
  fieldErrors.value = {}
  error.value = ''
  if (errorTimeout) {
    clearTimeout(errorTimeout)
    errorTimeout = null
  }
}, { deep: true })

// Auto-hide messages after 5 seconds
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

// Load countries on component mount
onMounted(async () => {
  await loadCountries()
})

// Load countries
const loadCountries = async () => {
  try {
    const response = await $fetch('/api/countries')
    countries.value = response.data || []
  } catch (err) {
    console.error('Error loading countries:', err)
    error.value = 'Failed to load countries. Please refresh the page.'
  }
}

// Load states when country changes
const onCountryChange = async () => {
  // Reset state and LGA when country changes
  formData.value.state_of_origin_id = ''
  formData.value.lga_of_origin_id = ''
  states.value = []
  lgas.value = []

  if (!formData.value.country_of_origin_id) return

  isLoadingStates.value = true
  try {
    const response = await $fetch(`/api/states?countryId=${formData.value.country_of_origin_id}`)
    states.value = response.data || []
  } catch (err) {
    console.error('Error loading states:', err)
    error.value = 'Failed to load states. Please try again.'
  } finally {
    isLoadingStates.value = false
  }
}

// Load LGAs when state changes
const onStateChange = async () => {
  // Reset LGA when state changes
  formData.value.lga_of_origin_id = ''
  lgas.value = []

  if (!formData.value.state_of_origin_id) return

  isLoadingLgas.value = true
  try {
    const response = await $fetch(`/api/lgas?stateId=${formData.value.state_of_origin_id}`)
    lgas.value = response.data || []
  } catch (err) {
    console.error('Error loading LGAs:', err)
    error.value = 'Failed to load LGAs. Please try again.'
  } finally {
    isLoadingLgas.value = false
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!formData.value.authorization) {
    error.value = 'Please accept the authorization to proceed'
    return
  }

  isLoading.value = true
  error.value = ''
  success.value = ''
  fieldErrors.value = {}

  try {
    // Prepare payload
    const payload = {
      nin: formData.value.nin,
      bvn: formData.value.bvn,
      address: formData.value.address,
      country_of_origin_id: formData.value.country_of_origin_id,
      state_of_origin_id: formData.value.state_of_origin_id,
      lga_of_origin_id: formData.value.lga_of_origin_id,
      contact_phone_number: fullPhoneNumber.value,
      date_of_birth: formData.value.date_of_birth,
      gender: formData.value.gender,
      is_corporate: formData.value.is_corporate,
      company_name: formData.value.is_corporate ? formData.value.company_name : '',
      rc_number: formData.value.is_corporate ? formData.value.rc_number : '',
      next_of_kin_name: formData.value.next_of_kin_name,
      maiden_name: formData.value.maiden_name
    }

    // Call the server API route instead of external API directly
    const response = await $fetch('/api/kyc-data', {
      method: 'PATCH',
      body: payload
    })

    // Success
    success.value = 'Your basic information has been saved successfully!'

  } catch (err) {
    console.error('KYC submission error:', err)
    
    // Handle validation errors (422)
    if (err.statusCode === 422 && err.data?.data?.errors) {
      const errors = {}
      err.data.data.errors.forEach(error => {
        errors[error.field] = error.message
      })
      fieldErrors.value = errors
    } else {
      // Handle other errors
      error.value = err.statusMessage || err.message || 'Failed to save information. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

// Cleanup timeouts on component unmount
onUnmounted(() => {
  if (successTimeout) clearTimeout(successTimeout)
  if (errorTimeout) clearTimeout(errorTimeout)
})
</script>