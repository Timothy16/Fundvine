<!-- pages/dashboard/payment/cancel.vue -->
<template>
  <NuxtLayout name="dashboard">
    <div class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-8">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <!-- Cancel Icon -->
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-times-circle text-red-500 text-4xl"></i>
        </div>

        <!-- Cancel Message -->
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>
        <p class="text-gray-600 mb-6">Your payment was cancelled. No charges have been made to your account.</p>

        <!-- Transaction Details -->
        <div v-if="transactionData" class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 class="font-semibold text-gray-800 mb-3">Cancelled Transaction</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Reference:</span>
              <span class="font-medium text-gray-800">{{ transactionData.reference }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Amount:</span>
              <span class="font-medium text-gray-800">
                {{ transactionData.currency === 'naira' ? '₦' : '$' }}{{ formatCurrency(transactionData.amount) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Currency:</span>
              <span class="font-medium text-gray-800">{{ transactionData.currency === 'naira' ? 'NGN' : 'USD' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Status:</span>
              <span class="font-medium text-red-600">Cancelled</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Date:</span>
              <span class="font-medium text-gray-800">{{ formatDate(new Date()) }}</span>
            </div>
          </div>
        </div>

        <!-- Help Information -->
        <div class="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <h3 class="font-semibold text-blue-800 mb-2">Need Help?</h3>
          <p class="text-sm text-blue-700 mb-2">
            If you're experiencing issues with payment, here are some things you can try:
          </p>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• Check your internet connection</li>
            <li>• Verify your card details</li>
            <li>• Ensure you have sufficient funds</li>
            <li>• Try a different payment method</li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="retryPayment"
            class="w-full bg-[#1a3c6d] text-white py-3 px-6 rounded-lg hover:bg-[#2a4c7d] transition-colors"
          >
            Try Payment Again
          </button>
          <button
            @click="goToDashboard"
            class="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>
          <button
            @click="contactSupport"
            class="w-full text-blue-600 hover:text-blue-800 transition-colors text-sm"
          >
            Contact Support
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
  // Clear any pending transaction data
  localStorage.removeItem('pending_transaction')
  router.push('/dashboard')
}

const retryPayment = () => {
  // Clear the cancelled transaction and redirect to add money modal
  localStorage.removeItem('pending_transaction')
  router.push('/dashboard?openAddMoney=true')
}

const contactSupport = () => {
  // You can implement this to open a support chat, email, or phone
  alert('Support: support@yourapp.com or call +234-xxx-xxx-xxxx')
}

// Load transaction data on mount
onMounted(() => {
  const ref = route.query.ref
  
  if (ref) {
    // Get stored transaction data
    const storedData = localStorage.getItem('pending_transaction')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      if (parsedData.reference === ref) {
        transactionData.value = parsedData
      }
    }
  }
})
</script>