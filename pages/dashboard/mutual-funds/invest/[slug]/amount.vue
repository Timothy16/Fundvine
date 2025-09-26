<!-- pages/dashboard/mutual-funds/invest/[slug]/amount.vue -->
<template>
    <NuxtLayout name="dashboard">
        <div class="min-h-screen bg-gray-50">
            <!-- Progress Bar -->
            <div class="">
                <div class=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 50%"></div>
                    </div>
                </div>
            </div>

            <div class=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <!-- Back Button -->
                <div class="mb-8">
                    <button 
                        @click="$router.go(-1)"
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
                <template v-else-if="fundData">
                    <div class="grid lg:grid-cols-2 gap-12 items-start">
                        <!-- Left Column - Question -->
                        <div>
                            <h1 class="text-3xl lg:text-4xl font-bold text-[#1a3c6d] leading-tight">
                                How much would you like to invest in this mutual fund?
                            </h1>
                        </div>

                        <!-- Right Column - Amount Input -->
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-red-600 mb-2">
                                    Amount
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span class="text-gray-500 text-xl font-medium">{{ currencySymbol }}</span>
                                    </div>
                                    <input
                                        v-model="investmentAmount"
                                        type="number"
                                        :min="minAmount"
                                        step="100"
                                        placeholder="0"
                                        class="w-full pl-10 pr-4 py-4 text-xl font-medium border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        @input="calculateUnits"
                                    />
                                </div>
                                
                                <!-- Validation Messages -->
                                <div class="mt-3 space-y-2">
                                    <div v-if="!isValidAmount && investmentAmount" class="flex items-start">
                                        <div class="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                        <p class="text-sm text-red-600">
                                            A minimum of {{ currencySymbol }}{{ formatAmount(minAmount) }} is required
                                        </p>
                                    </div>
                                    
                                    <div v-if="unitsError && investmentAmount" class="flex items-start">
                                        <div class="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                        <p class="text-sm text-red-600">
                                            {{ unitsError }}
                                        </p>
                                    </div>
                                    
                                    <div v-if="calculatedUnits > 0 && !unitsError" class="flex items-start">
                                        <div class="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                        <p class="text-sm text-green-600">
                                            This will purchase {{ calculatedUnits }} units
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-gray-100 rounded-lg p-4">
                                <p class="text-sm text-gray-600 leading-relaxed">
                                    The amount specified here is the amount you want to invest in this Mutual Fund
                                </p>
                            </div>

                            <!-- Continue Button -->
                            <div class="pt-4">
                                <button
                                    @click="proceedToReview"
                                    :disabled="!isValidAmount"
                                    :class="isValidAmount 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
                                    class="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
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
const calculatedUnits = ref(0)
const unitsError = ref('')
const fundData = ref(null)
const isLoadingFund = ref(false)
const fundError = ref(null)

// Get fund ID from route params
const fundId = computed(() => {
    return route.params.slug
})

// Computed properties
const currencySymbol = computed(() => {
    return fundData.value?.currency?.symbol || '₦'
})

const minAmount = computed(() => {
    if (!fundData.value) return 1000
    return (fundData.value.min_purchase_units || 0) * (fundData.value.nav || 1)
})

const isValidAmount = computed(() => {
    const amount = parseFloat(investmentAmount.value)
    return amount >= minAmount.value && calculatedUnits.value > 0 && !unitsError.value
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

const calculateUnits = () => {
    unitsError.value = ''
    calculatedUnits.value = 0
    
    const amount = parseFloat(investmentAmount.value)
    if (!amount || !fundData.value) return
    
    const nav = fundData.value.nav || 1
    const minPurchaseUnits = fundData.value.min_purchase_units || 0
    
    // Calculate units
    const units = Math.floor(amount / nav)
    
    // Validate minimum units
    if (units < minPurchaseUnits) {
        unitsError.value = `Minimum ${minPurchaseUnits} units required. You need at least ${currencySymbol.value}${formatAmount(minPurchaseUnits * nav)}`
        return
    }
    
    calculatedUnits.value = units
}

const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(parseFloat(amount) || 0)
}

const proceedToReview = () => {
    if (!isValidAmount.value) return
    
    // Navigate to review page with investment data
    router.push({
        path: `/dashboard/mutual-funds/invest/${fundId.value}/review`,
        query: {
            amount: investmentAmount.value,
            units: calculatedUnits.value
        }
    })
}

// Watch for amount changes
watch(investmentAmount, calculateUnits)

// Initialize
onMounted(() => {
    fetchFundDetails()
    
    // Pre-fill with query param if coming back from review page
    if (route.query.amount) {
        investmentAmount.value = route.query.amount
        nextTick(() => calculateUnits())
    }
})
</script>