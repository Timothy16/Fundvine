<!-- pages/dashboard/my-subscriptions.vue -->
<template>
    <NuxtLayout name="dashboard">
        <div class="p-2 sm:p-6">
            <!-- Header Section -->
            <div class="mb-8">
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Fund Subscriptions</h2>
                <p class="text-gray-600">Track your mutual fund investments and performance</p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <div class="text-center">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p class="text-gray-600">Loading your subscriptions...</p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-circle text-3xl text-red-500 mb-3"></i>
                <p class="text-red-700 font-medium mb-2">Failed to load subscriptions</p>
                <p class="text-red-600 text-sm mb-4">{{ error }}</p>
                <button 
                    @click="fetchSubscriptions"
                    class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Try Again
                </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="!subscriptions || subscriptions.length === 0" class="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <i class="fas fa-chart-pie text-5xl text-gray-400 mb-4"></i>
                <p class="text-gray-600 font-medium mb-2">No active subscriptions</p>
                <p class="text-gray-500 text-sm mb-6">You haven't invested in any mutual funds yet.</p>
                <NuxtLink 
                    to="/dashboard/mutual-funds"
                    class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Explore Mutual Funds
                </NuxtLink>
            </div>

            <!-- Subscriptions Grid -->
            <div v-else class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <!-- Subscription Card -->
                <div 
                    v-for="subscription in subscriptions" 
                    :key="subscription.id"
                    class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                    <!-- Fund Status Badge -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full" 
                                 :class="getStatusColor(subscription.status)"></div>
                            <span class="text-sm font-medium" 
                                  :class="getStatusTextColor(subscription.status)">
                                {{ subscription.status }}
                            </span>
                        </div>
                        <div v-if="subscription.is_reinvest_active" 
                             class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Auto Reinvest
                        </div>
                    </div>

                    <!-- Investment Amount -->
                    <div class="mb-4">
                        <p class="text-sm text-gray-600 mb-1">Total Investment</p>
                        <p class="text-2xl font-bold text-gray-800">
                            {{ formatCurrency(subscription.totalInvestmentAmount, subscription.currency) }}
                        </p>
                    </div>

                    <!-- Current Value -->
                    <div class="mb-4">
                        <p class="text-sm text-gray-600 mb-1">Current Value</p>
                        <div class="flex items-center space-x-2">
                            <p class="text-xl font-semibold text-green-600">
                                {{ formatCurrency(subscription.current_value, subscription.currency) }}
                            </p>
                            <span v-if="getYieldPercentage(subscription) !== 0" 
                                  :class="getYieldPercentage(subscription) >= 0 ? 'text-green-600' : 'text-red-600'"
                                  class="text-sm font-medium">
                                {{ getYieldPercentage(subscription) >= 0 ? '+' : '' }}{{ getYieldPercentage(subscription).toFixed(2) }}%
                            </span>
                        </div>
                    </div>

                    <!-- Investment Details Grid -->
                    <div class="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Units</p>
                            <p class="text-sm font-semibold text-gray-800">{{ formatNumber(subscription.totalUnits) }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Realized Yield</p>
                            <p class="text-sm font-semibold text-gray-800">
                                {{ formatCurrency(subscription.realized_yield, subscription.currency) }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Unrealized Yield</p>
                            <p class="text-sm font-semibold" 
                               :class="subscription.unrealizedYield >= 0 ? 'text-green-600' : 'text-red-600'">
                                {{ formatCurrency(subscription.unrealizedYield, subscription.currency) }}
                            </p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Investment Date</p>
                            <p class="text-sm font-semibold text-gray-800">{{ formatDate(subscription.subscription_date) }}</p>
                        </div>
                    </div>

                    <!-- Holding Period -->
                    <div class="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p class="text-xs text-blue-600 mb-1">Minimum Holding Period</p>
                        <p class="text-sm font-semibold text-blue-800">
                            Until {{ formatDate(subscription.min_holding_till) }}
                        </p>
                        <div class="mt-2">
                            <div class="w-full bg-blue-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full transition-all" 
                                     :style="`width: ${getHoldingProgress(subscription)}%`"></div>
                            </div>
                            <p class="text-xs text-blue-600 mt-1">
                                {{ getHoldingProgress(subscription) }}% completed
                            </p>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex space-x-2">
                        <button 
                            @click="openModal('liquidate', subscription)"
                            class="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded-lg transition-colors text-sm font-medium border border-red-200"
                        >
                            <i class="fas fa-money-bill-wave mr-1"></i>
                            Liquidate
                        </button>
                        <button 
                            @click="openModal('buy', subscription)"
                            class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg transition-colors text-sm font-medium border border-blue-200"
                        >
                            <i class="fas fa-plus mr-1"></i>
                            Buy More
                        </button>
                    </div>
                </div>
            </div>

            <!-- Subscription Action Modal -->
            <SubscriptionActionModal
                :is-visible="showModal"
                :action-type="modalActionType"
                :subscription="selectedSubscription"
                @close="closeModal"
                @success="handleActionSuccess"
                @error="handleActionError"
            />

            <!-- Success/Error Toast -->
            <div v-if="toastMessage" 
                 :class="toastType === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'"
                 class="fixed top-4 right-4 border-l-4 p-4 rounded shadow-lg z-50">
                <div class="flex">
                    <i :class="toastType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="text-lg mr-2"></i>
                    <span>{{ toastMessage }}</span>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
definePageMeta({
  middleware: ['auth']
})

// Reactive data
const subscriptions = ref([])
const isLoading = ref(false)
const error = ref(null)
const showModal = ref(false)
const modalActionType = ref('')
const selectedSubscription = ref(null)
const toastMessage = ref('')
const toastType = ref('success')

// Fetch subscriptions from API
const fetchSubscriptions = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await $fetch('/api/mutual-funds/subscriptions')
    
    if (response.success && response.data?.result) {
      subscriptions.value = response.data.result
    } else {
      error.value = 'Invalid response format'
    }
  } catch (err) {
    console.error('Failed to fetch subscriptions:', err)
    error.value = err.message || 'An error occurred while loading subscriptions'
  } finally {
    isLoading.value = false
  }
}

// Computed properties for summary stats
const totalInvested = computed(() => {
  return subscriptions.value.reduce((sum, sub) => sum + (sub.totalInvestmentAmount || 0), 0)
})

const totalCurrentValue = computed(() => {
  return subscriptions.value.reduce((sum, sub) => sum + (sub.current_value || 0), 0)
})

const totalYield = computed(() => {
  return subscriptions.value.reduce((sum, sub) => sum + (sub.realized_yield || 0) + (sub.unrealizedYield || 0), 0)
})

// Helper functions
const formatCurrency = (amount, currency = null) => {
  const symbol = currency?.symbol || '₦'
  const position = currency?.position || 'before'
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0)
  
  return position === 'before' ? `${symbol}${formattedAmount}` : `${formattedAmount}${symbol}`
}

const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number || 0)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusColor = (status) => {
  const colors = {
    'ACTIVE': 'bg-green-500',
    'PENDING': 'bg-yellow-500',
    'MATURED': 'bg-blue-500',
    'LIQUIDATED': 'bg-gray-500',
    'SUSPENDED': 'bg-red-500'
  }
  return colors[status] || 'bg-gray-500'
}

const getStatusTextColor = (status) => {
  const colors = {
    'ACTIVE': 'text-green-700',
    'PENDING': 'text-yellow-700',
    'MATURED': 'text-blue-700',
    'LIQUIDATED': 'text-gray-700',
    'SUSPENDED': 'text-red-700'
  }
  return colors[status] || 'text-gray-700'
}

const getYieldPercentage = (subscription) => {
  if (!subscription.totalInvestmentAmount || subscription.totalInvestmentAmount === 0) return 0
  const totalYield = (subscription.realized_yield || 0) + (subscription.unrealizedYield || 0)
  return (totalYield / subscription.totalInvestmentAmount) * 100
}

const getHoldingProgress = (subscription) => {
  const startDate = new Date(subscription.subscription_date)
  const endDate = new Date(subscription.min_holding_till)
  const currentDate = new Date()
  
  const totalDuration = endDate - startDate
  const elapsed = currentDate - startDate
  
  if (elapsed <= 0) return 0
  if (elapsed >= totalDuration) return 100
  
  return Math.round((elapsed / totalDuration) * 100)
}

const openModal = (actionType, subscription) => {
  modalActionType.value = actionType
  selectedSubscription.value = subscription
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  modalActionType.value = ''
  selectedSubscription.value = null
}

const handleActionSuccess = (data) => {
  const actionName = modalActionType.value === 'liquidate' ? 'liquidation' : 'purchase'
  showToast(`Fund ${actionName} completed successfully!`, 'success')
  
  // Close modal first
  closeModal()
  
  // Refresh subscriptions data
  fetchSubscriptions()

//     if (data && selectedSubscription.value) {
//     const index = subscriptions.value.findIndex(sub => sub.id === selectedSubscription.value.id)
//     if (index !== -1) {
//       subscriptions.value[index] = { ...data }
//     }
//   }
}

const handleActionError = (error) => {
  showToast(error, 'error')
}

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  
  // Auto hide toast after 5 seconds
  setTimeout(() => {
    toastMessage.value = ''
  }, 5000)
}

// Fetch data on component mount
onMounted(() => {
  fetchSubscriptions()
})
</script>