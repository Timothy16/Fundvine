<!-- pages/dashboard/payment/success.vue -->
<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-8">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <!-- Success Icon -->
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-check-circle text-green-500 text-4xl"></i>
        </div>

        <!-- Success Message -->
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p class="text-gray-600 mb-6">Your wallet has been topped up successfully.</p>

        <!-- Transaction Details -->
        <div v-if="transactionData" class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 class="font-semibold text-gray-800 mb-3">Transaction Details</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Reference:</span>
              <span class="font-medium text-gray-800">{{ transactionData.reference }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Amount:</span>
              <span class="font-medium text-gray-800">
                {{ transactionData.currency === 'naira' ? '₦' : '' }}{{ formatCurrency(transactionData.amount) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Currency:</span>
              <span class="font-medium text-gray-800">{{ transactionData.currency === 'naira' ? 'NGN' : 'USD' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Status:</span>
              <span class="font-medium text-green-600">Completed</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Date:</span>
              <span class="font-medium text-gray-800">{{ formatDate(new Date()) }}</span>
            </div>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="isVerifying" class="mb-6">
          <div class="flex items-center justify-center space-x-2 text-blue-600">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Verifying payment...</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="goToDashboard"
            class="w-full bg-[#1a3c6d] text-white py-3 px-6 rounded-lg hover:bg-[#2a4c7d] transition-colors"
          >
            Back to Dashboard
          </button>
          <button
            @click="viewTransactionHistory"
            class="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Transaction History
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})

const router = useRouter()
const route = useRoute()

const isVerifying = ref(false)
const transactionData = ref(null)

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

// Format date
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Navigation functions
const goToDashboard = () => {
  router.push('/dashboard')
}

const viewTransactionHistory = () => {
  router.push('/dashboard/transactions')
}

// Verify payment on mount
onMounted(async () => {
  const ref = route.query.ref
  
  if (ref) {
    isVerifying.value = true
    
    try {
      // Get stored transaction data
      const storedData = localStorage.getItem('pending_transaction')
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        if (parsedData.reference === ref) {
          transactionData.value = parsedData
        }
      }
      
      // Here you would typically verify the payment with your backend
      // Example API call:
      // const response = await $fetch('/api/verify-payment', {
      //   method: 'POST',
      //   body: { reference: ref }
      // })
      
      // For now, we'll simulate verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear pending transaction
      localStorage.removeItem('pending_transaction')
      
      // You could update user balance here or trigger a refresh
      // await refreshUserData()
      
    } catch (error) {
      console.error('Payment verification failed:', error)
      // Handle verification error
    } finally {
      isVerifying.value = false
    }
  } else {
    // No reference found, redirect to dashboard
    router.push('/dashboard')
  }
})
</script>