<!-- pages/dashboard/mutual-funds/invest/[slug]/review.vue -->
<template>
    <NuxtLayout name="dashboard">
        <div class="min-h-screen bg-gray-50">
            <!-- Progress Bar -->
            <div class="">
                <div class=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 100%"></div>
                    </div>
                </div>
            </div>

            <div class=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <!-- Back Button -->
                <div class="mb-8">
                    <button 
                        @click="goBack"
                        class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <i class="fas fa-chevron-left mr-2"></i>
                        Back
                    </button>
                </div>

                <!-- Loading State -->
                <div v-if="isLoadingFund" class="flex justify-center items-center py-12">
                    <div class="text-center">
                        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                        <p class="text-gray-600">Loading fund details...</p>
                    </div>
                </div>

                <!-- Error State -->
                <div v-else-if="fundError" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <i class="fas fa-exclamation-circle text-3xl text-red-500 mb-3"></i>
                    <p class="text-red-700 font-medium mb-2">Failed to load fund details</p>
                    <p class="text-red-600 text-sm mb-4">{{ fundError }}</p>
                    <button 
                        @click="fetchFundDetails"
                        class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>

                <!-- Content -->
                <template v-else-if="fundData && investmentAmount && investmentUnits">
                    <div class="grid lg:grid-cols-2 gap-12 items-start">
                        <!-- Left Column - Heading -->
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-[#1a3c6d] leading-tight">
                                Review Investment Plan
                            </h1>
                        </div>

                        <!-- Right Column - Investment Summary -->
                        <div class="space-y-6">
                            <!-- Investment Summary Card -->
                            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <!-- Fund Header -->
                                <div class="flex items-center space-x-3 mb-6">
                                    <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                                        <img 
                                            v-if="fundData.logo" 
                                            :src="fundData.logo" 
                                            :alt="fundData.name"
                                            class="w-full h-full object-cover"
                                        />
                                        <i v-else class="fas fa-chart-pie text-xl text-gray-400"></i>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-blue-600 text-lg">{{ fundData.name }}</h3>
                                    </div>
                                </div>

                                <!-- Investment Details -->
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between py-2">
                                        <div class="flex items-center space-x-2">
                                            <span class="text-gray-600">Units</span>
                                            <div class="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center cursor-help" title="Number of units to be purchased">
                                                <i class="fas fa-info text-xs text-gray-600"></i>
                                            </div>
                                        </div>
                                        <span class="font-semibold text-gray-800">{{ investmentUnits }} units</span>
                                    </div>

                                    <div class="flex items-center justify-between py-2">
                                        <span class="text-gray-600">Amount</span>
                                        <span class="font-semibold text-gray-800">{{ currencySymbol }}{{ formatAmount(investmentAmount) }}</span>
                                    </div>

                                    <!-- Reinvest My Dividend Toggle -->
                                    <div class="flex items-center justify-between py-3 border-t border-gray-100">
                                        <div class="flex items-center space-x-2">
                                            <span class="text-gray-600 font-medium">Reinvest My Dividend</span>
                                            <div class="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center cursor-help" title="Automatically reinvest dividends">
                                                <i class="fas fa-info text-xs text-gray-600"></i>
                                            </div>
                                        </div>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                v-model="reinvestDividend" 
                                                type="checkbox" 
                                                class="sr-only peer"
                                            >
                                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Confirm Purchase Button -->
                            <div>
                                <button
                                    @click="showConfirmationModal"
                                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                                >
                                    CONFIRM PURCHASE
                                </button>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- No Data State -->
                <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <i class="fas fa-exclamation-triangle text-3xl text-yellow-500 mb-3"></i>
                    <p class="text-yellow-700 font-medium mb-2">Invalid Investment Data</p>
                    <p class="text-yellow-600 text-sm mb-4">Please go back and enter a valid investment amount.</p>
                    <button 
                        @click="goBack"
                        class="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            <!-- Confirmation Modal -->
            <FundConfirmationModal
                :is-visible="showModal"
                :fund-name="fundData?.name"
                :fund-id="fundData?.id"
                :amount="investmentAmount"
                :units="investmentUnits"
                :auto-reinvest="reinvestDividend"
                :currency-symbol="currencySymbol"
                @close="closeModal"
                @success="handlePurchaseSuccess"
                @error="handlePurchaseError"
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

const route = useRoute()
const router = useRouter()

// Reactive data
const investmentAmount = ref('')
const investmentUnits = ref(0)
const reinvestDividend = ref(true)
const fundData = ref(null)
const isLoadingFund = ref(false)
const fundError = ref(null)
const showModal = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Get fund ID from route params
const fundId = computed(() => {
    return route.params.slug
})

// Computed properties
const currencySymbol = computed(() => {
    return fundData.value?.currency?.symbol || '₦'
})

// Methods
const fetchFundDetails = async () => {
    if (!fundId.value) {
        fundError.value = 'Fund ID is missing'
        return
    }

    try {
        isLoadingFund.value = true
        fundError.value = null
        
        const response = await $fetch(`/api/mutual-funds/${fundId.value}`)
        
        if (response.success && response.data) {
            fundData.value = response.data
        } else {
            fundError.value = 'Invalid response format'
        }
    } catch (err) {
        console.error('Failed to fetch fund details:', err)
        fundError.value = err.message || 'An error occurred while loading fund details'
    } finally {
        isLoadingFund.value = false
    }
}

const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(parseFloat(amount) || 0)
}

const goBack = () => {
    // Go back to amount page with current data preserved
    router.push({
        path: `/dashboard/mutual-funds/invest/${fundId.value}/amount`,
        query: {
            amount: investmentAmount.value
        }
    })
}

const showConfirmationModal = () => {
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const handlePurchaseSuccess = (data) => {
    closeModal()
    showToast('Investment successful! Redirecting to dashboard...', 'success')
    
    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
        router.push('/dashboard/my-subscriptions')
    }, 2000)
}

const handlePurchaseError = (error) => {
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

// Initialize
onMounted(() => {
    // Get investment data from query parameters
    const amount = route.query.amount
    const units = route.query.units
    
    if (!amount || !units) {
        // If no investment data, redirect back to amount page
        router.replace(`/dashboard/mutual-funds/invest/${fundId.value}/amount`)
        return
    }
    
    investmentAmount.value = amount
    investmentUnits.value = parseInt(units)
    
    // Fetch fund details
    fetchFundDetails()
})
</script>