// pages/dashboard/index.vue
<template>
    <NuxtLayout name="dashboard">
        <div class="p-2 sm:p-6">
           
            <!-- Investment Portfolio Section -->
            <div class="mb-8">
                <!-- Portfolio Header -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Investment Portfolio</h2>
                    <p class="text-gray-600 text-sm sm:text-base">
                        Track your investments and portfolio performance
                    </p>
                    </div>

                    <button
                    @click="openAddMoneyModal"
                    class="bg-[#1a3c6d] text-white c px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-[#2a4c7d] transition-colors flex items-center justify-center sm:justify-start space-x-2 shadow-lg w-full sm:w-auto"
                    >
                    <i class="fa fa-plus"></i>
                    <span>Fund Wallet</span>
                    </button>
                </div>

                <!-- Investment Cards -->
                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    <!-- Current Wallet Balance Card -->
                    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                    <i class="fas fa-wallet text-white text-lg"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-800">Current Wallet Balance</h3>
                                    <p class="text-sm text-gray-600">Available Funds</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-500">Ready to Invest</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <!-- Loading state -->
                            <div v-if="isLoadingWallet" class="text-3xl font-bold text-gray-400">
                                <i class="fas fa-spinner fa-spin"></i> Loading...
                            </div>
                            <!-- Error state -->
                            <div v-else-if="walletError" class="text-3xl font-bold text-red-500">
                                Error loading balance
                            </div>
                            <!-- Success state with currency symbol -->
                            <div v-else class="text-3xl font-bold text-gray-800">
                                <span v-if="walletCurrency.position === 'before'">{{ walletCurrency.symbol }}</span>{{ formatCurrency(walletBalance) }}<span v-if="walletCurrency.position === 'after'">{{ walletCurrency.symbol }}</span>
                            </div>
                            <p class="text-sm text-purple-600 mt-1">
                                <i class="fa fa-check-circle"></i>
                                Available for investment
                            </p>
                        </div>
                        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                            <span class="text-sm text-gray-600">Last updated: {{ lastUpdated }}</span>
                            <div class="flex space-x-2">
                                <button 
                                    @click="fetchWalletBalance" 
                                    class="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                    :disabled="isLoadingWallet"
                                >
                                    <i class="fas fa-sync-alt" :class="{ 'fa-spin': isLoadingWallet }"></i>
                                    Refresh
                                </button>
                                <button class="text-purple-600 hover:text-purple-700 text-sm font-medium">
                                    View History
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Total Investment Card -->
                    <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                    <i class="fas fa-chart-pie text-white text-lg"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-800">Total Investment</h3>
                                    <p class="text-sm text-gray-600">Principal Amount</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-500">Portfolio Value</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="text-3xl font-bold text-gray-800">₦{{ formatCurrency(totalInvestment) }}</p>
                            <p class="text-sm text-blue-600 mt-1">
                                <i class="fa fa-arrow-up"></i>
                                +0% from last month
                            </p>
                        </div>
                        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                            <span class="text-sm text-gray-600">Last updated: {{ lastUpdated }}</span>
                            <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View Details
                            </button>
                        </div>
                    </div>

                  
                </div>

                <!-- Investment Diversification Section -->
                <div class="bg-white rounded-lg p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-800">Investment Diversification</h3>
                            <p class="text-gray-600">Your portfolio allocation across different asset classes</p>
                        </div>
                        <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Rebalance Portfolio
                        </button>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8">
                        <!-- Pie Chart Placeholder -->
                        <div class="flex justify-center items-center">
                            <div class="relative w-64 h-64">
                                <!-- Pie Chart using CSS -->
                                <div class="w-64 h-64 rounded-full relative overflow-hidden" style="background: conic-gradient(
                                    #3B82F6 0deg 126deg,
                                    #10B981 126deg 216deg,
                                    #F59E0B 216deg 306deg,
                                    #EF4444 306deg 360deg
                                );">
                                    <!-- Center circle -->
                                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <div class="text-center">
                                            <p class="text-xs text-gray-500">Total</p>
                                            <p class="text-sm font-bold text-gray-800">100%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Legend and Details -->
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <p class="font-medium text-gray-800">MNF</p>
                                        <p class="text-sm text-gray-600">Money Market Funds</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold text-gray-800">35%</p>
                                    <p class="text-sm text-gray-600">₦{{ formatCurrency(totalInvestment * 0.35) }}</p>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p class="font-medium text-gray-800">IPO</p>
                                        <p class="text-sm text-gray-600">Initial Public Offerings</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold text-gray-800">25%</p>
                                    <p class="text-sm text-gray-600">₦{{ formatCurrency(totalInvestment * 0.25) }}</p>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                    <div>
                                        <p class="font-medium text-gray-800">TB</p>
                                        <p class="text-sm text-gray-600">Treasury Bills</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold text-gray-800">25%</p>
                                    <p class="text-sm text-gray-600">₦{{ formatCurrency(totalInvestment * 0.25) }}</p>
                                </div>
                            </div>

                            <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <div class="flex items-center space-x-3">
                                    <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                                    <div>
                                        <p class="font-medium text-gray-800">Fixed Deposit</p>
                                        <p class="text-sm text-gray-600">Term Deposits</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold text-gray-800">15%</p>
                                    <p class="text-sm text-gray-600">₦{{ formatCurrency(totalInvestment * 0.15) }}</p>
                                </div>
                            </div>
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
                            <h3 class="text-xl font-semibold text-gray-900">
                                {{ currentStep === 1 ? 'Add Money to Wallet' : 'Enter Amount' }}
                            </h3>
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
                        <!-- Step 1: Currency Selection -->
                        <div v-if="currentStep === 1">
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
                                <!-- <label 
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
                                </label> -->
                            </div>

                            <!-- Step 1 Action Buttons -->
                            <div class="flex space-x-3">
                                <button
                                    @click="closeAddMoneyModal"
                                    class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    @click="goToAmountStep"
                                    :disabled="!selectedCurrency"
                                    class="flex-1 px-4 py-3 bg-[#1a3c6d] text-white rounded-lg hover:bg-[#2a4c7d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    <span>Proceed</span>
                                    <i class="fa fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Step 2: Amount Input -->
                        <div v-if="currentStep === 2">
                            <div class="mb-6">
                                <div class="flex items-center space-x-3 mb-4">
                                    <div class="w-8 h-8 rounded-full flex items-center justify-center"
                                         :class="selectedCurrency === 'naira' ? 'bg-green-500' : 'bg-blue-500'">
                                        <span class="text-white text-sm font-bold">
                                            {{ selectedCurrency === 'naira' ? '₦' : '$' }}
                                        </span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-800">
                                            {{ selectedCurrency === 'naira' ? 'Nigerian Naira (NGN)' : 'US Dollar (USD)' }}
                                        </p>
                                        <p class="text-sm text-gray-600">Enter the amount to add</p>
                                    </div>
                                </div>

                                <!-- Amount Input -->
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span class="text-gray-500 text-lg font-medium">
                                            {{ selectedCurrency === 'naira' ? '₦' : '$' }}
                                        </span>
                                    </div>
                                    <input
                                        v-model="amount"
                                        type="number"
                                        :placeholder="selectedCurrency === 'naira' ? '0.00' : '0.00'"
                                        :min="selectedCurrency === 'naira' ? '100' : '1'"
                                        :max="selectedCurrency === 'naira' ? '10000000' : '100000'"
                                        step="0.01"
                                        class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                                        @input="validateAmount"
                                    />
                                </div>

                                <!-- Amount validation feedback -->
                                <div v-if="amountError" class="mt-2 text-sm text-red-600">
                                    {{ amountError }}
                                </div>

                                <!-- Amount suggestions -->
                                <div class="mt-4">
                                    <p class="text-sm text-gray-600 mb-2">Quick amounts:</p>
                                    <div class="grid grid-cols-3 gap-2">
                                        <button
                                            v-for="suggestion in amountSuggestions"
                                            :key="suggestion"
                                            @click="amount = suggestion"
                                            class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                            :class="selectedCurrency === 'naira' ? 'text-green-600' : 'text-blue-600'"
                                        >
                                            {{ selectedCurrency === 'naira' ? '₦' : '$' }}{{ formatCurrency(suggestion) }}
                                        </button>
                                    </div>
                                </div>

                                <!-- Payment info -->
                                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-sm text-gray-600">Amount:</span>
                                        <span class="font-medium text-gray-800">
                                            {{ selectedCurrency === 'naira' ? '₦' : '$' }}{{ formatCurrency(parseFloat(amount) || 0) }}
                                        </span>
                                    </div>
                                    
                                    <hr class="my-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-gray-800">Total to pay:</span>
                                        <span class="font-bold text-lg text-gray-800">
                                            {{ selectedCurrency === 'naira' ? '₦' : '$' }}{{ formatCurrency(calculateTotal(parseFloat(amount) || 0)) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Step 2 Action Buttons -->
                            <div class="flex space-x-3">
                                <button
                                    @click="goBackToCurrency"
                                    class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <i class="fa fa-arrow-left"></i>
                                    <span>Back</span>
                                </button>
                                <button
                                    @click="proceedToPayment"
                                    :disabled="!amount || amountError || isProcessing"
                                    class="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    <i v-if="isProcessing" class="fa fa-spinner fa-spin"></i>
                                    <i v-else class="fa fa-credit-card"></i>
                                    <span>{{ isProcessing ? 'Processing...' : 'Pay Now' }}</span>
                                </button>
                            </div>
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

// Paystack Configuration - REPLACE WITH YOUR ACTUAL KEYS
const PAYSTACK_PUBLIC_KEY = 'pk_test_947ab6ffe750078cff2aa1c559cb20eccfb96f3b'
const CURRENT_DOMAIN = 'https://fundvine.vercel.app' // Replace with your actual domain

// Modal and form state
const showAddMoneyModal = ref(false)
const currentStep = ref(1)
const selectedCurrency = ref('')
const amount = ref('')
const amountError = ref('')
const isProcessing = ref(false)

// Wallet
const walletData = ref(null)
const isLoadingWallet = ref(false)
const walletError = ref(null)

// Investment data
const totalInvestment = ref(0.00)
const accruedValue = ref(750000.50)
const nairaBalance = ref(0.00)
const usdBalance = ref(8750.25)

// Get authenticated user data
const { data: authData } = useAuth()
const user = computed(() => authData.value?.user || null)

// Amount suggestions based on currency
const amountSuggestions = computed(() => {
  if (selectedCurrency.value === 'naira') {
    return [1000, 5000, 10000]
  } else {
    return [10, 50, 100]
  }
})

// Computed properties
const returnPercentage = computed(() => {
  const percentage = (accruedValue.value / totalInvestment.value) * 100
  return percentage.toFixed(1)
})

const lastUpdated = computed(() => {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const calculateFee = (amount) => {
  if (!amount) return 0
  // Paystack charges: 1.5% + ₦100 for NGN, 3.9% + $0.50 for USD
  if (selectedCurrency.value === 'naira') {
    return Math.round((amount * 0.015 + 100) * 100) / 100
  } else {
    return Math.round((amount * 0.039 + 0.5) * 100) / 100
  }
}

const calculateTotal = (amount) => {
  return amount 
}

const validateAmount = () => {
  const amt = parseFloat(amount.value)
  amountError.value = ''
  
  if (!amt || amt <= 0) {
    amountError.value = 'Please enter a valid amount'
    return false
  }
  
  if (selectedCurrency.value === 'naira') {
    if (amt < 100) {
      amountError.value = 'Minimum amount is ₦100'
      return false
    }
    if (amt > 10000000) {
      amountError.value = 'Maximum amount is ₦10,000,000'
      return false
    }
  } else {
    if (amt < 1) {
      amountError.value = 'Minimum amount is $1'
      return false
    }
    if (amt > 100000) {
      amountError.value = 'Maximum amount is $100,000'
      return false
    }
  }
  
  return true
}

// Modal functions
const openAddMoneyModal = () => {
  currentStep.value = 1
  selectedCurrency.value = ''
  amount.value = ''
  amountError.value = ''
  showAddMoneyModal.value = true
}

const closeAddMoneyModal = () => {
  showAddMoneyModal.value = false
  currentStep.value = 1
  selectedCurrency.value = ''
  amount.value = ''
  amountError.value = ''
  isProcessing.value = false
}

const goToAmountStep = () => {
  if (!selectedCurrency.value) return
  currentStep.value = 2
}

const goBackToCurrency = () => {
  currentStep.value = 1
  amount.value = ''
  amountError.value = ''
}

// Paystack Payment Function
const proceedToPayment = () => {
  if (!validateAmount() || isProcessing.value) return
  
  isProcessing.value = true
  
  try {
    // Generate unique reference
    const reference = generateReference('FVB_')
    
    // Use the exact amount user entered (no fees added)
    const userAmount = parseFloat(amount.value)
    const amountInMinorUnit = Math.round(userAmount * 100) // Convert to kobo/cents
    
    // Get customer email
    const customerEmail = user.value?.email || 'user@example.com'
    
    // Store transaction details in localStorage for verification
    localStorage.setItem('pending_transaction', JSON.stringify({
      reference,
      amount: amount.value,
      currency: selectedCurrency.value,
      total: userAmount,
      timestamp: Date.now()
    }))
    
    // Initialize Paystack payment using the correct method
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: customerEmail,
      amount: amountInMinorUnit,
      currency: selectedCurrency.value === 'naira' ? 'NGN' : 'USD',
      ref: reference,
      metadata: {
        wallet_topup: `${selectedCurrency.value.toUpperCase()} ${amount.value}`,
        user_id: user.value?.id || 'guest',
        tnx_target : 'wallet_topup',
        custom_fields: [
          {
            display_name: 'Wallet Top-up',
            value_name: 'wallet_topup',
            value: `${selectedCurrency.value.toUpperCase()} ${amount.value}`
          }
        ]
      },
      callback: function(response) {
        // Payment successful
        console.log('Payment successful:', response)
        isProcessing.value = false
        
        // Navigate to success page with reference
        navigateTo(`/dashboard/payment/success?reference=${response.reference}`)
      },
      onClose: function() {
        // Payment cancelled or window closed
        console.log('Payment cancelled')
        isProcessing.value = false
        
        // Navigate to cancel page
        navigateTo(`/dashboard/payment/cancel?reference=${reference}`)
      }
    })
    
    // Open the payment iframe
    handler.openIframe()
    
  } catch (error) {
    console.error('Payment initialization error:', error)
    isProcessing.value = false
    
    // Show user-friendly error message
    alert('Failed to initialize payment. Please ensure you have a stable internet connection and try again.')
  }
}

// Function to generate transaction reference
const generateReference = (prefix) => {
  const length = 10
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = prefix
  
  // Add timestamp for uniqueness
  result += Date.now().toString().slice(-6)
  
  // Generate random characters
  for (let i = 4; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  
  return result
}
const fetchWalletBalance = async () => {
  try {
    isLoadingWallet.value = true
    walletError.value = null
    
    const response = await $fetch('/api/wallet-balance')
    
    if (response.success) {
      walletData.value = response.data
    } else {
      walletError.value = 'Failed to load wallet balance'
    }
  } catch (error) {
    console.error('Wallet fetch error:', error)
    walletError.value = 'Failed to load wallet balance'
  } finally {
    isLoadingWallet.value = false
  }
}

// Add computed property for wallet display
const walletBalance = computed(() => {
  if (!walletData.value) return 0
  return walletData.value.availableBalance || 0
})

const walletCurrency = computed(() => {
  if (!walletData.value?.currency) return { symbol: '₦', position: 'before' }
  return walletData.value.currency
})



// Load Paystack script on component mount
onMounted(() => {
    // Fetch wallet balance
  fetchWalletBalance()

  // Load the correct Paystack inline script
  const script = document.createElement('script')
  script.setAttribute('src', 'https://js.paystack.co/v1/inline.js')
  script.onload = () => {
    console.log('Paystack script loaded successfully')
  }
  script.onerror = () => {
    console.error('Failed to load Paystack script')
  }
  document.head.appendChild(script)
})
</script>