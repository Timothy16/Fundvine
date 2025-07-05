// pages/dashboard/index.vue
<template>
    <NuxtLayout name="dashboard">
        <div class="p-6">
           
            <!-- Wallet Balance Section - Add before Hero Section -->
            <div class="mb-8">
  <!-- Wallet Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800">Wallet Balance</h2>
      <p class="text-gray-600">Manage your funds and add money to your account</p>
    </div>
    <button
      @click="openAddMoneyModal"
      class="bg-[#1a3c6d] text-white px-6 py-3 rounded-lg hover:bg-[#2a4c7d] transition-colors flex items-center space-x-2 shadow-lg"
    >
      <i class="fa fa-plus"></i>
      <span>Add Money</span>
    </button>
  </div>

  <!-- Balance Cards -->
  <div class="grid md:grid-cols-2 gap-6">
    <!-- Naira Balance Card -->
    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg">₦</span>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">Naira Balance</h3>
            <p class="text-sm text-gray-600">NGN Wallet</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">Available Balance</p>
        </div>
      </div>
      <div class="mb-4">
        <p class="text-3xl font-bold text-gray-800">₦{{ formatCurrency(nairaBalance) }}</p>
        <p class="text-sm text-green-600 mt-1">
          <i class="fa fa-arrow-up"></i>
          +2.5% from last month
        </p>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
        <span class="text-sm text-gray-600">Last updated: {{ lastUpdated }}</span>
        <button class="text-green-600 hover:text-green-700 text-sm font-medium">
          View History
        </button>
      </div>
    </div>

    <!-- USD Balance Card -->
    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg">$</span>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">USD Balance</h3>
            <p class="text-sm text-gray-600">USD Wallet</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">Available Balance</p>
        </div>
      </div>
      <div class="mb-4 b">
        <p class="text-3xl font-bold text-gray-800">${{ formatCurrency(usdBalance) }}</p>
        <p class="text-sm text-blue-600 mt-1">
          <i class="fa fa-arrow-up"></i>
          +1.8% from last month
        </p>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-gray-200">
        <span class="text-sm text-gray-600">Last updated: {{ lastUpdated }}</span>
        <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View History
        </button>
      </div>
    </div>
  </div>
</div>
            <!-- Hero Section -->
            <div class="bg-[#1a3c6d] rounded-lg p-8 text-white mb-8">
            <h2 class="text-2xl font-semibold mb-4">Explore, Invest, and Own: A Smarter and More Efficient Subscription Experience</h2>
            <button class="bg-white text-[#1a3c6d] px-6 py-2 rounded-lg flex items-center">
                Explore our offers
                <span class="material-icons ml-2">arrow_forward</span>
            </button>
            </div>

            <!-- Available Offers -->
            <div>
            <h3 class="text-xl font-semibold mb-6">Available Offers</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <!-- UBA Offer Card -->
                <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex justify-between items-start mb-6">
                    <div class="flex items-center">
                        <img src="/images/flag.svg" alt="UBA" class="h-8 mr-3" />
                        <div>
                            <h4 class="font-medium">Fundvine Money Market Fund</h4>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Rights Issue
                            </span>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                    <p class="text-sm text-gray-600">DEAL SIZE</p>
                    <p class="font-medium">6,839,884,274</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">UNIT PRICE</p>
                    <p class="font-medium">₦35.00</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">RIGHTS LAUNCH DATE</p>
                    <p class="font-medium">Nov 15, 2024</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">RIGHTS CLOSING DATE</p>
                    <p class="font-medium">Dec 24, 2024</p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button class="flex-1 px-4 py-2 border border-[#1a3c6d] text-[#1a3c6d] rounded-lg">
                    View offer details
                    </button>
                    <button class="flex-1 px-4 py-2 bg-[#1a3c6d] text-white rounded-lg">
                    Buy Now →
                    </button>
                </div>
                </div>

                <!-- FBN Offer Card - Similar structure -->
                <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex justify-between items-start mb-6">
                    <div class="flex items-center">
                        <img src="/images/flag.svg" alt="UBA" class="h-8 mr-3" />
                    <div>
                        <h4 class="font-medium">FBN Holdings Rights Issue</h4>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Rights Issue
                        </span>
                    </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                    <p class="text-sm text-gray-600">DEAL SIZE</p>
                    <p class="font-medium">5,982,548,799</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">UNIT PRICE</p>
                    <p class="font-medium">₦25.00</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">RIGHTS LAUNCH DATE</p>
                    <p class="font-medium">Nov 04, 2024</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">RIGHTS CLOSING DATE</p>
                    <p class="font-medium">Dec 12, 2024</p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button class="flex-1 px-4 py-2 border border-[#1a3c6d] text-[#1a3c6d] rounded-lg">
                    View offer details
                    </button>
                    <button class="flex-1 px-4 py-2 bg-[#1a3c6d] text-white rounded-lg">
                    Buy Now →
                    </button>
                </div>
                </div>
            </div>
            </div>
            <!-- Add Money Modal -->
            <div v-if="showAddMoneyModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <!-- Modal Header -->
                <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-semibold text-gray-900">Add Money to Wallet</h3>
                    <button
                    @click="closeAddMoneyModal"
                    class="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                    <i class="fa fa-times text-lg"></i>
                    </button>
                </div>
                </div>

                <!-- Modal Content -->
                <div class="p-6">
                <p class="text-gray-600 mb-6">Choose the currency you want to add to your wallet</p>
                
                <!-- Currency Selection -->
                <div class="space-y-4 mb-6">
                    <!-- Naira Option -->
                    <label 
                    class="p-4 border rounded-lg cursor-pointer block transition-all duration-200 hover:border-green-300" 
                    :class="selectedCurrency === 'naira' ? 'border-green-500 bg-green-50' : 'border-gray-200'"
                    >
                    <div class="flex items-start">
                        <input 
                        type="radio" 
                        name="currency" 
                        class="mt-1" 
                        value="naira"
                        v-model="selectedCurrency"
                        />
                        <div class="ml-3 flex-1">
                        <div class="flex items-center space-x-2">
                            <span class="font-medium text-gray-800">Add Naira (NGN)</span>
                            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span class="text-white text-xs font-bold">₦</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">Add Nigerian Naira to your local currency wallet.</p>
                        <p class="text-xs text-green-600 mt-1 font-medium">Current Balance: ₦{{ formatCurrency(nairaBalance) }}</p>
                        </div>
                    </div>
                    </label>

                    <!-- USD Option -->
                    <label 
                    class="p-4 border rounded-lg cursor-pointer block transition-all duration-200 hover:border-blue-300" 
                    :class="selectedCurrency === 'usd' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
                    >
                    <div class="flex items-start">
                        <input 
                        type="radio" 
                        name="currency" 
                        class="mt-1" 
                        value="usd"
                        v-model="selectedCurrency"
                        />
                        <div class="ml-3 flex-1">
                        <div class="flex items-center space-x-2">
                            <span class="font-medium text-gray-800">Add USD ($)</span>
                            <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span class="text-white text-xs font-bold">$</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">Add US Dollars to your international currency wallet.</p>
                        <p class="text-xs text-blue-600 mt-1 font-medium">Current Balance: ${{ formatCurrency(usdBalance) }}</p>
                        </div>
                    </div>
                    </label>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-3">
                    <button
                    @click="closeAddMoneyModal"
                    class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                    Cancel
                    </button>
                    <button
                    @click="proceedToAddMoney"
                    :disabled="!selectedCurrency"
                    class="flex-1 px-4 py-3 bg-[#1a3c6d] text-white rounded-lg hover:bg-[#2a4c7d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                    <span>Proceed</span>
                    <i class="fa fa-arrow-right"></i>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})
// Add to your script section
const showAddMoneyModal = ref(false)
const selectedCurrency = ref('')
const nairaBalance = ref(2450000.50) // Example balance
const usdBalance = ref(8750.25) // Example balance

// Computed property for last updated time
const lastUpdated = computed(() => {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Format currency with commas
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

// Modal functions
const openAddMoneyModal = () => {
  selectedCurrency.value = ''
  showAddMoneyModal.value = true
}

const closeAddMoneyModal = () => {
  showAddMoneyModal.value = false
  selectedCurrency.value = ''
}

const proceedToAddMoney = () => {
  if (!selectedCurrency.value) return
  
  // Handle the proceed action based on selected currency
  console.log(`Proceeding to add ${selectedCurrency.value} to wallet`)
  
  // You can add your logic here to navigate to payment page or show next step
  // For example:
  // if (selectedCurrency.value === 'naira') {
  //   // Navigate to Naira payment page
  // } else {
  //   // Navigate to USD payment page
  // }
  
  closeAddMoneyModal()
  
  // Show success message or navigate to next step
  alert(`Proceeding to add ${selectedCurrency.value.toUpperCase()} to your wallet`)
}
</script>
