<!-- components/SubscriptionActionModal.vue -->
<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900">
          {{ actionType === 'liquidate' ? 'Liquidate Fund' : 'Buy Additional Units' }}
        </h3>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          :disabled="isProcessing"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6">
        <!-- Subscription Info -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-600">Current Units</span>
            <span class="text-sm font-semibold text-gray-800">{{ formatNumber(subscription?.totalUnits || 0) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">Current Value</span>
            <span class="text-sm font-semibold text-gray-800">{{ formatCurrency(subscription?.current_value || 0) }}</span>
          </div>
        </div>

        <!-- Form Fields -->
        <div class="space-y-4">
          <!-- Units Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ actionType === 'liquidate' ? 'Units to Liquidate' : 'Additional Units to Buy' }}
            </label>
            <input
              v-model="units"
              type="number"
              :min="1"
              :max="actionType === 'liquidate' ? subscription?.totalUnits : undefined"
              placeholder="Enter number of units"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            <!-- Validation Messages -->
            <div v-if="unitsError" class="mt-2 text-sm text-red-600">
              {{ unitsError }}
            </div>
          </div>

          <!-- Estimated Value (for liquidation) -->
          <div v-if="actionType === 'liquidate' && units > 0" class="bg-yellow-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-yellow-800 mb-2">Estimated Liquidation Value</h4>
            <p class="text-lg font-semibold text-yellow-900">{{ formatCurrency(estimatedValue) }}</p>
            <p class="text-xs text-yellow-700 mt-1">*Actual amount may vary based on current NAV</p>
          </div>

          <!-- Estimated Cost (for buying additional units) -->
          <div v-if="actionType === 'buy' && units > 0" class="bg-blue-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-blue-800 mb-2">Estimated Cost</h4>
            <p class="text-lg font-semibold text-blue-900">{{ formatCurrency(estimatedCost) }}</p>
            <p class="text-xs text-blue-700 mt-1">*Actual amount may vary based on current NAV</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3 mt-6">
          <button
            @click="closeModal"
            :disabled="isProcessing"
            class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            @click="performAction"
            :disabled="!isValidForm || isProcessing"
            :class="isValidForm && !isProcessing
              ? (actionType === 'liquidate' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700')
              : 'bg-gray-300 cursor-not-allowed'"
            class="flex-1 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <span v-if="isProcessing" class="flex items-center justify-center">
              <i class="fas fa-spinner fa-spin mr-2"></i>
              Processing...
            </span>
            <span v-else>
              {{ actionType === 'liquidate' ? 'Liquidate Fund' : 'Buy Units' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  actionType: {
    type: String,
    required: true,
    validator: (value) => ['liquidate', 'buy'].includes(value)
  },
  subscription: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'success', 'error'])

// Reactive data
const units = ref('')
const isProcessing = ref(false)
const unitsError = ref('')

// Computed properties
const isValidForm = computed(() => {
  if (!units.value || units.value <= 0) return false
  if (unitsError.value) return false
  return true
})

const estimatedValue = computed(() => {
  if (!units.value || !props.subscription?.current_value || !props.subscription?.totalUnits) return 0
  const valuePerUnit = props.subscription.current_value / props.subscription.totalUnits
  return valuePerUnit * parseFloat(units.value)
})

const estimatedCost = computed(() => {
  if (!units.value || !props.subscription?.current_value || !props.subscription?.totalUnits) return 0
  const valuePerUnit = props.subscription.current_value / props.subscription.totalUnits
  return valuePerUnit * parseFloat(units.value)
})

// Methods
const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number || 0)
}

const formatCurrency = (amount) => {
  const symbol = props.subscription?.currency?.symbol || '₦'
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0)
  return `${symbol}${formattedAmount}`
}

const validateUnits = () => {
  unitsError.value = ''
  const unitValue = parseFloat(units.value)
  
  if (!unitValue || unitValue <= 0) {
    unitsError.value = 'Please enter a valid number of units'
    return
  }
  
  if (props.actionType === 'liquidate') {
    if (unitValue > (props.subscription?.totalUnits || 0)) {
      unitsError.value = `Cannot liquidate more than ${props.subscription?.totalUnits || 0} units`
    }
  }
}

const closeModal = () => {
  if (!isProcessing.value) {
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
  units.value = ''
  unitsError.value = ''
}

const performAction = async () => {
  if (!isValidForm.value || isProcessing.value) return
  
  try {
    isProcessing.value = true
    
    const payload = {
      subscription_id: props.subscription.id,
      units: parseFloat(units.value)
    }
    
    let endpoint = ''
    if (props.actionType === 'liquidate') {
      endpoint = '/api/mutual-funds/liquidate-fund'
    } else {
      endpoint = '/api/mutual-funds/buy-additional-units'
    }
    
    const response = await $fetch(endpoint, {
      method: 'POST',
      body: payload
    })
    
    if (response.success) {
      emit('success', response.data)
    } else {
      emit('error', 'Operation failed')
    }
  } catch (error) {
    console.error(`${props.actionType} error:`, error)
    // Extract clean error message from API response
    const errorMessage = error.data?.message || error.statusMessage || `Failed to ${props.actionType} fund`
    emit('error', errorMessage)
  } finally {
    isProcessing.value = false
  }
}

// Watch for changes
watch(units, validateUnits)

// Close modal on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isVisible && !isProcessing.value) {
      closeModal()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>