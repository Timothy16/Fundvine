<!-- components/FundConfirmationModal.vue -->
<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900">{{ fundName }}</h3>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6">
        <!-- Amount Display -->
        <div class="text-center mb-6">
          <div class="text-3xl font-bold text-gray-900 mb-2">
            {{ currencySymbol }}{{ formatAmount(amount) }}
          </div>
          <div class="text-sm text-gray-600">
            + {{ units }} Units
          </div>
        </div>

        <!-- Investment Details -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-600">Amount</span>
            <span class="text-sm font-semibold text-gray-800">{{ currencySymbol }}{{ formatAmount(amount) }}</span>
          </div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-600">Units</span>
            <span class="text-sm font-semibold text-gray-800">{{ units }} units</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">Auto Reinvest</span>
            <span class="text-sm font-semibold text-gray-800">{{ autoReinvest ? 'Yes' : 'No' }}</span>
          </div>
        </div>

        <!-- Confirm Button -->
        <button
          @click="confirmPurchase"
          :disabled="isProcessing"
          :class="isProcessing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'"
          class="w-full text-white py-4 px-6 rounded-lg font-bold text-lg transition-colors"
        >
          <span v-if="isProcessing" class="flex items-center justify-center">
            <i class="fas fa-spinner fa-spin mr-2"></i>
            Processing...
          </span>
          <span v-else>
            Pay {{ currencySymbol }}{{ formatAmount(amount) }}
          </span>
        </button>
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
  fundName: {
    type: String,
    default: ''
  },
  amount: {
    type: [String, Number],
    default: 0
  },
  units: {
    type: Number,
    default: 0
  },
  autoReinvest: {
    type: Boolean,
    default: false
  },
  currencySymbol: {
    type: String,
    default: '₦'
  },
  fundId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'success', 'error'])

// Reactive data
const isProcessing = ref(false)

// Methods
const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(amount) || 0)
}

const closeModal = () => {
  if (!isProcessing.value) {
    emit('close')
  }
}

const confirmPurchase = async () => {
  try {
    isProcessing.value = true
    
    const response = await $fetch('/api/mutual-funds/subscriptions', {
      method: 'POST',
      body: {
        fund_id: props.fundId,
        auto_reinvest: props.autoReinvest,
        units: props.units
      }
    })

    if (response.success) {
      emit('success', response.data)
    } else {
      emit('error', 'Failed to process investment')
    }
  } catch (error) {
    console.error('Fund subscription error:', error)
    emit('error', error.message || 'An error occurred while processing your investment')
  } finally {
    isProcessing.value = false
  }
}

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