<!-- pages/dashboard/liquidate.vue -->
<template>
    <NuxtLayout name="dashboard">
        <div class="p-2 sm:p-6">
            <!-- Header Section -->
            <div class="mb-8">
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Liquidations</h2>
                <p class="text-gray-600">Track your fund liquidation requests and their status</p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <div class="text-center">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p class="text-gray-600">Loading your liquidations...</p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-circle text-3xl text-red-500 mb-3"></i>
                <p class="text-red-700 font-medium mb-2">Failed to load liquidations</p>
                <p class="text-red-600 text-sm mb-4">{{ error }}</p>
                <button 
                    @click="fetchLiquidations"
                    class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Try Again
                </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="!liquidations || liquidations.length === 0" class="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <i class="fas fa-inbox text-5xl text-gray-400 mb-4"></i>
                <p class="text-gray-600 font-medium mb-2">No liquidation requests</p>
                <p class="text-gray-500 text-sm mb-6">You haven't made any fund liquidation requests yet.</p>
                <NuxtLink 
                    to="/dashboard/my-subscriptions"
                    class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                    View My Subscriptions
                </NuxtLink>
            </div>

            <!-- Liquidations List -->
            <div v-else class="space-y-6">
                <!-- Summary Cards -->
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <p class="text-sm text-gray-600 mb-1">Total Requests</p>
                        <p class="text-2xl font-bold text-gray-800">{{ liquidations.length }}</p>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4 shadow-sm border border-yellow-200">
                        <p class="text-sm text-yellow-700 mb-1">Pending</p>
                        <p class="text-2xl font-bold text-yellow-800">{{ getPendingCount }}</p>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4 shadow-sm border border-green-200">
                        <p class="text-sm text-green-700 mb-1">Approved</p>
                        <p class="text-2xl font-bold text-green-800">{{ getApprovedCount }}</p>
                    </div>
                    <div class="bg-red-50 rounded-lg p-4 shadow-sm border border-red-200">
                        <p class="text-sm text-red-700 mb-1">Rejected</p>
                        <p class="text-2xl font-bold text-red-800">{{ getRejectedCount }}</p>
                    </div>
                </div>

                <!-- Liquidation Cards -->
                <div class="grid lg:grid-cols-3 gap-6">
                    <div 
                        v-for="liquidation in liquidations" 
                        :key="liquidation.id"
                        class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                        <!-- Status Header -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 rounded-full" 
                                     :class="getStatusColor(liquidation.status)"></div>
                                <span class="text-sm font-medium" 
                                      :class="getStatusTextColor(liquidation.status)">
                                    {{ liquidation.status }}
                                </span>
                            </div>
                            <div v-if="liquidation.has_pending_dividend" 
                                 class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                Pending Dividend
                            </div>
                        </div>

                        <!-- Units Information -->
                        <div class="mb-4">
                            <p class="text-sm text-gray-600 mb-1">Units to Liquidate</p>
                            <p class="text-2xl font-bold text-gray-800">
                                {{ formatNumber(liquidation.totalUnits) }} units
                            </p>
                        </div>

                        <!-- Penalty Information (if applicable) -->
                        <div v-if="liquidation.penaltyOnUnits > 0" class="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-exclamation-triangle text-orange-600 mr-2"></i>
                                <p class="text-sm font-medium text-orange-800">Early Liquidation Penalty</p>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <p class="text-xs text-orange-700">Penalty Rate</p>
                                    <p class="text-sm font-semibold text-orange-800">{{ liquidation.penaltyRate }}%</p>
                                </div>
                                <div>
                                    <p class="text-xs text-orange-700">Penalty Units</p>
                                    <p class="text-sm font-semibold text-orange-800">{{ formatNumber(liquidation.penaltyOnUnits) }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Holding Period Information -->
                        <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-xs text-gray-600 mb-1">Days Held</p>
                                    <p class="text-sm font-semibold text-gray-800">{{ liquidation.daysHeld }} days</p>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-600 mb-1">Expected Hold</p>
                                    <p class="text-sm font-semibold text-gray-800">{{ liquidation.expectedHoldDays }} days</p>
                                </div>
                            </div>
                            
                            <!-- Progress Bar -->
                            <div class="mt-3">
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        class="h-2 rounded-full transition-all"
                                        :class="getHoldingProgressColor(liquidation)"
                                        :style="`width: ${getHoldingProgressPercentage(liquidation)}%`"
                                    ></div>
                                </div>
                                <p class="text-xs text-gray-600 mt-1">
                                    {{ getHoldingProgressPercentage(liquidation) }}% of minimum holding period
                                </p>
                            </div>
                        </div>

                        <!-- Approval Date (if approved) -->
                        <div v-if="liquidation.approvalDate" class="mb-4 p-3 bg-green-50 rounded-lg">
                            <p class="text-xs text-green-700 mb-1">Approval Date</p>
                            <p class="text-sm font-semibold text-green-800">
                                {{ formatDate(liquidation.approvalDate) }}
                            </p>
                        </div>

                        <!-- Additional Details -->
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <p class="text-xs text-gray-600 mb-1">Currency</p>
                                <p class="text-sm font-semibold text-gray-800">
                                    {{ liquidation.currency.code }} ({{ liquidation.currency.symbol }})
                                </p>
                            </div>
                            <!-- <div>
                                <p class="text-xs text-gray-600 mb-1">Liquidation ID</p>
                                <p class="text-xs font-mono text-gray-600 truncate">{{ liquidation.id }}</p>
                            </div> -->
                        </div>
                    </div>
                </div>

                <!-- Pagination Info -->
                <div v-if="pageInfo" class="flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-lg">
                    <p class="text-sm text-gray-600">
                        Total: <span class="font-semibold text-gray-800">{{ pageInfo.total }}</span> liquidation(s)
                    </p>
                    <button 
                        v-if="pageInfo.hasNextPage"
                        @click="loadMore"
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                        Load More
                    </button>
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
const liquidations = ref([])
const isLoading = ref(false)
const error = ref(null)
const pageInfo = ref(null)

// Fetch liquidations from API
const fetchLiquidations = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await $fetch('/api/mutual-funds/liquidate-fund')
    
    if (response.success && response.data?.result) {
      liquidations.value = response.data.result
      pageInfo.value = response.data.page_info
    } else {
      error.value = 'Invalid response format'
    }
  } catch (err) {
    console.error('Failed to fetch liquidations:', err)
    error.value = err.message || 'An error occurred while loading liquidations'
  } finally {
    isLoading.value = false
  }
}

// Computed properties for summary stats
const getPendingCount = computed(() => {
  return liquidations.value.filter(l => l.status === 'PENDING').length
})

const getApprovedCount = computed(() => {
  return liquidations.value.filter(l => l.status === 'APPROVED').length
})

const getRejectedCount = computed(() => {
  return liquidations.value.filter(l => l.status === 'REJECTED').length
})

// Helper functions
const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number || 0)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusColor = (status) => {
  const colors = {
    'PENDING': 'bg-yellow-500',
    'APPROVED': 'bg-green-500',
    'REJECTED': 'bg-red-500',
    'PROCESSING': 'bg-blue-500',
    'COMPLETED': 'bg-green-600'
  }
  return colors[status] || 'bg-gray-500'
}

const getStatusTextColor = (status) => {
  const colors = {
    'PENDING': 'text-yellow-700',
    'APPROVED': 'text-green-700',
    'REJECTED': 'text-red-700',
    'PROCESSING': 'text-blue-700',
    'COMPLETED': 'text-green-800'
  }
  return colors[status] || 'text-gray-700'
}

const getHoldingProgressPercentage = (liquidation) => {
  if (!liquidation.expectedHoldDays || liquidation.expectedHoldDays === 0) return 0
  const percentage = (liquidation.daysHeld / liquidation.expectedHoldDays) * 100
  return Math.min(Math.round(percentage), 100)
}

const getHoldingProgressColor = (liquidation) => {
  const percentage = getHoldingProgressPercentage(liquidation)
  if (percentage >= 100) return 'bg-green-600'
  if (percentage >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

const loadMore = () => {
  // TODO: Implement pagination with nextPageCursor
  console.log('Load more functionality')
}

// Fetch data on component mount
onMounted(() => {
  fetchLiquidations()
})
</script>