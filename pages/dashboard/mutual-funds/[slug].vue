<!-- pages/dashboard/mutual-funds/[slug].vue -->
<template>
    <NuxtLayout name="dashboard">
        <div class="p-2 sm:p-6">
            <!-- Back Button -->
            <div class="mb-6">
                <button 
                    @click="$router.push('/dashboard/mutual-funds')"
                    class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <i class="fas fa-chevron-left mr-2"></i>
                    Back
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <div class="text-center">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p class="text-gray-600">Loading fund details...</p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-circle text-3xl text-red-500 mb-3"></i>
                <p class="text-red-700 font-medium mb-2">Failed to load fund details</p>
                <p class="text-red-600 text-sm mb-4">{{ error }}</p>
                <button 
                    @click="fetchFundDetails"
                    class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Try Again
                </button>
            </div>

            <!-- Fund Details Content -->
            <template v-else-if="fundData">
                <!-- Fund Header -->
                <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                                <img 
                                    v-if="fundData.logo" 
                                    :src="fundData.logo" 
                                    :alt="fundData.name"
                                    class="w-full h-full object-cover"
                                />
                                <i v-else class="fas fa-chart-pie text-2xl text-gray-400"></i>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-800">{{ fundData.name }}</h1>
                                <!-- <p class="text-gray-600">Fund Manager Limited</p> -->
                            </div>
                        </div>
                        <NuxtLink 
                            :to="`/dashboard/mutual-funds/invest/${fundData.id}/amount`"
                            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                        >
                            <span>Invest Now</span>
                            <i class="fas fa-arrow-right"></i>
                        </NuxtLink>
                    </div>
                </div>

                <div class="grid lg:grid-cols-2 gap-6 items-start">
                    <!-- Left Column - Annual Returns -->
                    <div class="bg-white rounded-xl p-6 shadow-sm h-fit">
                        <div class="mb-6">
                            <div class="flex items-center space-x-2 mb-2">
                                <h3 class="text-lg font-semibold text-gray-800">Annual Returns</h3>
                                <div class="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center cursor-help" title="Annual return percentage">
                                    <i class="fas fa-info text-xs text-gray-600"></i>
                                </div>
                            </div>
                            <div class="flex items-baseline space-x-2">
                                <span class="text-4xl font-bold text-green-500">{{ formatPercentage(fundData.annual_return) }}%</span>
                                <span class="text-gray-600">({{ formatDividendFrequency(fundData.dividend_frequency) }})</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Fund Information -->
                    <div class="space-y-4">
                        <!-- About Section -->
                        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <button 
                                @click="toggleAbout"
                                class="w-full flex items-center justify-between text-left p-4 hover:bg-gray-50 transition-colors"
                            >
                                <h3 class="text-lg font-semibold text-gray-800">About</h3>
                                <i class="fas fa-chevron-up transition-transform" 
                                   :class="{ 'rotate-180': !isAboutExpanded }"></i>
                            </button>
                            
                            <div v-if="isAboutExpanded" class="px-4 pb-4 border-t border-gray-100">
                                <!-- Description -->
                                <p class="text-gray-600 leading-relaxed mb-4 mt-4">{{ fundData.about_fund || 'No description available' }}</p>
                                
                                <!-- Fund Details Grid -->
                                <div class="grid grid-cols-1 gap-3">
                                    <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span class="text-sm font-medium text-gray-600">Management Fee</span>
                                        <span class="text-sm font-semibold text-gray-800">{{ fundData.mgt_fee_percentge }}%</span>
                                    </div>
                                    <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span class="text-sm font-medium text-gray-600">Min Purchase Units</span>
                                        <span class="text-sm font-semibold text-gray-800">{{ formatNumber(fundData.min_purchase_units) }} units</span>
                                    </div>
                                    <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span class="text-sm font-medium text-gray-600">Min Additional Units</span>
                                        <span class="text-sm font-semibold text-gray-800">{{ formatNumber(fundData.min_additional_units) }} units</span>
                                    </div>
                                    <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span class="text-sm font-medium text-gray-600">Min Holding Days</span>
                                        <span class="text-sm font-semibold text-gray-800">{{ fundData.min_holding_days }} days</span>
                                    </div>
                                    <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span class="text-sm font-medium text-gray-600">Early Liquidation Fee</span>
                                        <span class="text-sm font-semibold text-gray-800">{{ fundData.early_liquidation_percent_on_interest }}%</span>
                                    </div>
                                    <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span class="text-sm font-medium text-gray-600">Risk Level</span>
                                        <div class="flex items-center space-x-2">
                                            <div class="w-3 h-3 rounded-full" :class="getRiskColor(fundData.risk_level)"></div>
                                            <span class="text-sm font-semibold text-gray-800">{{ fundData.risk_level }}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between py-2">
                                        <span class="text-sm font-medium text-gray-600">Dividend Payment</span>
                                        <span class="text-sm font-semibold text-gray-800">{{ formatDividendFrequency(fundData.dividend_frequency) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- How You Earn Section -->
                        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <button 
                                @click="toggleHowYouEarn"
                                class="w-full flex items-center justify-between text-left p-4 hover:bg-gray-50 transition-colors"
                            >
                                <h3 class="text-lg font-semibold text-gray-800">How You Earn</h3>
                                <i class="fas fa-chevron-down transition-transform" 
                                   :class="{ 'rotate-180': isHowYouEarnExpanded }"></i>
                            </button>
                            
                            <div v-if="isHowYouEarnExpanded" class="px-4 pb-4 border-t border-gray-100">
                                <p class="text-gray-600 leading-relaxed mt-4">{{ fundData.how_you_earn || 'No information available' }}</p>
                            </div>
                        </div>

                        <!-- Suitability Section -->
                        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <button 
                                @click="toggleSuitability"
                                class="w-full flex items-center justify-between text-left p-4 hover:bg-gray-50 transition-colors"
                            >
                                <h3 class="text-lg font-semibold text-gray-800">Suitability</h3>
                                <i class="fas fa-chevron-down transition-transform" 
                                   :class="{ 'rotate-180': isSuitabilityExpanded }"></i>
                            </button>
                            
                            <div v-if="isSuitabilityExpanded" class="px-4 pb-4 border-t border-gray-100">
                                <p class="text-gray-600 leading-relaxed mt-4">{{ fundData.suitability || 'No information available' }}</p>
                            </div>
                        </div>

                        <!-- Terms of Use Section -->
                        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <button 
                                @click="toggleTermsOfUse"
                                class="w-full flex items-center justify-between text-left p-4 hover:bg-gray-50 transition-colors"
                            >
                                <h3 class="text-lg font-semibold text-gray-800">Terms of Use</h3>
                                <i class="fas fa-chevron-down transition-transform" 
                                   :class="{ 'rotate-180': isTermsOfUseExpanded }"></i>
                            </button>
                            
                            <div v-if="isTermsOfUseExpanded" class="px-4 pb-4 border-t border-gray-100">
                                <p class="text-gray-600 leading-relaxed mt-4">{{ fundData.terms_of_use || 'No information available' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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
const fundData = ref(null)
const isLoading = ref(false)
const error = ref(null)
const isAboutExpanded = ref(true)
const isHowYouEarnExpanded = ref(false)
const isSuitabilityExpanded = ref(false)
const isTermsOfUseExpanded = ref(false)

// Get fund ID from route state or query
const fundId = computed(() => {
    return route.query.id || null
})

// Fetch fund details
const fetchFundDetails = async () => {
    if (!fundId.value) {
        error.value = 'Fund ID is missing'
        return
    }

    try {
        isLoading.value = true
        error.value = null
        
        const response = await $fetch(`/api/mutual-funds/${fundId.value}`)
        
        if (response.success && response.data) {
            fundData.value = response.data
        } else {
            error.value = 'Invalid response format'
        }
    } catch (err) {
        console.error('Failed to fetch fund details:', err)
        error.value = err.message || 'An error occurred while loading fund details'
    } finally {
        isLoading.value = false
    }
}

// Toggle functions
const toggleAbout = () => {
    isAboutExpanded.value = !isAboutExpanded.value
}

const toggleHowYouEarn = () => {
    isHowYouEarnExpanded.value = !isHowYouEarnExpanded.value
}

const toggleSuitability = () => {
    isSuitabilityExpanded.value = !isSuitabilityExpanded.value
}

const toggleTermsOfUse = () => {
    isTermsOfUseExpanded.value = !isTermsOfUseExpanded.value
}

// Helper functions
const getRiskColor = (riskLevel) => {
    const colors = {
        'Conservative': 'bg-blue-500',
        'Moderate': 'bg-yellow-500',
        'Aggressive': 'bg-red-500',
        'Growth': 'bg-red-500'
    }
    return colors[riskLevel] || 'bg-gray-500'
}

const formatPercentage = (value) => {
    return value ? value.toFixed(2) : '0.00'
}

const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value)
}

const formatDividendFrequency = (frequency) => {
    const frequencies = {
        'QUARTERLY': 'Paid Quarterly',
        'MONTHLY': 'Paid Monthly',
        'DAILY': 'Paid Daily',
        'ANNUALLY': 'Paid Annually'
    }
    return frequencies[frequency] || frequency
}

// Watch for fundId changes
watch(fundId, (newId) => {
    if (newId) {
        fetchFundDetails()
    }
}, { immediate: true })

// If no fund ID in query, redirect to mutual funds list
onMounted(() => {
    if (!fundId.value) {
        router.push('/dashboard/mutual-funds')
    }
})
</script>