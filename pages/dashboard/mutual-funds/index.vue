<!-- pages/dashboard/mutual-funds/index.vue -->
<template>
    <NuxtLayout name="dashboard">
        <div class="p-2 sm:p-6">
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
            <div v-if="isLoading" class="flex justify-center items-center py-12">
                <div class="text-center">
                    <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p class="text-gray-600">Loading mutual funds...</p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-circle text-3xl text-red-500 mb-3"></i>
                <p class="text-red-700 font-medium mb-2">Failed to load mutual funds</p>
                <p class="text-red-600 text-sm mb-4">{{ error }}</p>
                <button 
                    @click="fetchMutualFunds"
                    class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Try Again
                </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="!mutualFunds || mutualFunds.length === 0" class="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <i class="fas fa-folder-open text-5xl text-gray-400 mb-4"></i>
                <p class="text-gray-600 font-medium mb-2">No mutual funds available</p>
                <p class="text-gray-500 text-sm">Please check back later for available investment options.</p>
            </div>

            <!-- Funds Grid -->
            <div v-else class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                <!-- Fund Card -->
                <div 
                    v-for="fund in mutualFunds" 
                    :key="fund.id"
                    class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <!-- Fund Logo and Risk Badge -->
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                            <img 
                                v-if="fund.logo" 
                                :src="fund.logo" 
                                :alt="fund.name"
                                class="w-full h-full object-cover"
                            />
                            <i v-else class="fas fa-chart-pie text-2xl text-gray-400"></i>
                        </div>
                        <div class="flex items-center space-x-1 px-3 py-1 rounded-full"
                             :class="getRiskBadgeClass(fund.risk_level)">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 3c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 8c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"/>
                            </svg>
                            <span class="text-xs font-medium">{{ fund.risk_level }}</span>
                        </div>
                    </div>

                    <!-- Fund Name and Company -->
                    <div class="mb-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-1">{{ fund.name }}</h3>
                        <p class="text-sm text-gray-500">{{ getCompanyName(fund) }}</p>
                    </div>

                    <!-- Annual Returns -->
                    <div class="mb-6">
                        <p class="text-sm text-gray-600 mb-1">Annual Returns</p>
                        <p class="text-3xl font-bold text-green-500">{{ calculateAnnualReturn(fund) }}%</p>
                    </div>

                    <!-- View Details Link -->
                    <NuxtLink 
                        :to="{ path: `/dashboard/mutual-funds/${generateSlug(fund.name)}`, query: { id: fund.id } }"
                        class="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                    >
                        <i class="fas fa-arrow-right mr-2 group-hover:translate-x-1 transition-transform"></i>
                        <span>View Details</span>
                    </NuxtLink>
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
const mutualFunds = ref([])
const isLoading = ref(false)
const error = ref(null)

// Fetch mutual funds from API
const fetchMutualFunds = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await $fetch('/api/mutual-funds')
    
    if (response.success && response.data?.result) {
      mutualFunds.value = response.data.result
    } else {
      error.value = 'Invalid response format'
    }
  } catch (err) {
    console.error('Failed to fetch mutual funds:', err)
    error.value = err.message || 'An error occurred while loading mutual funds'
  } finally {
    isLoading.value = false
  }
}

// Helper functions
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const getCompanyName = (fund) => {
  // Extract company name from fund name or use a default
  // You can customize this based on your data structure
  return ''
}

const calculateAnnualReturn = (fund) => {
  // Calculate annual return based on NAV or risk value
  // This is a placeholder - adjust based on your actual calculation logic
  
//   return baseReturn.toFixed(2)
return '0.00'
}

const getRiskBadgeClass = (riskLevel) => {
  const classes = {
    'Conservative': 'bg-blue-50 text-blue-700',
    'Moderate': 'bg-yellow-50 text-yellow-700',
    'Aggressive': 'bg-red-50 text-red-700',
    'Growth': 'bg-red-50 text-red-700'
  }
  return classes[riskLevel] || 'bg-gray-50 text-gray-700'
}

// Fetch data on component mount
onMounted(() => {
  fetchMutualFunds()
})
</script>