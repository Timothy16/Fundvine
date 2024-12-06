// pages/dashboard/transactions.vue
<template>
  <NuxtLayout name="dashboard">
    <div class="p-4 md:p-6">
      <!-- Table Header -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-4">
          <div class="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 class="text-xl font-semibold mb-4 md:mb-0">All Transactions</h2>
            <div class="w-full md:w-auto flex space-x-4">
              <div class="relative w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search transactions..."
                  class="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3c6d]"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-y">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="transactions.length === 0">
                <td colspan="6" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center">
                    <span class="material-icons text-gray-400 text-5xl mb-4">receipt_long</span>
                    <p class="text-gray-500 text-lg">No transactions available</p>
                    <p class="text-gray-400">Your transaction history will appear here</p>
                  </div>
                </td>
              </tr>
              <tr v-for="transaction in transactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ transaction.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span :class="getTypeClass(transaction.type)">{{ transaction.type }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{{ transaction.amount }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(transaction.status)">{{ transaction.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden">
          <div v-if="transactions.length === 0" class="p-6 text-center">
            <span class="material-icons text-gray-400 text-4xl mb-2">receipt_long</span>
            <p class="text-gray-500">No transactions available</p>
          </div>
          
          <div v-else class="divide-y divide-gray-200">
            <div v-for="transaction in transactions" :key="transaction.id" class="p-4 space-y-3">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                  <p class="text-sm text-gray-500">{{ transaction.id }}</p>
                </div>
                <span :class="getTypeClass(transaction.type)">{{ transaction.type }}</span>
              </div>
              
              <div class="flex justify-between items-center text-sm">
                <div class="space-y-1">
                  <p class="text-gray-500">Amount</p>
                  <p class="font-medium">₦{{ transaction.amount }}</p>
                </div>
                <div class="space-y-1 text-right">
                  <p class="text-gray-500">Date</p>
                  <p class="font-medium">{{ transaction.date }}</p>
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span :class="getStatusClass(transaction.status)">{{ transaction.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const transactions = ref([
  {
    date: '2024-12-06',
    id: 'TRX-001',
    description: 'UBA Rights Issue Subscription',
    type: 'Debit',
    amount: '50,000.00',
    status: 'Completed'
  },
  {
    date: '2024-12-05',
    id: 'TRX-002',
    description: 'Wallet Funding',
    type: 'Credit',
    amount: '100,000.00',
    status: 'Completed'
  }
])

const getTypeClass = (type) => ({
  'px-2 py-1 rounded-full text-xs font-medium': true,
  'bg-green-100 text-green-800': type === 'Credit',
  'bg-red-100 text-red-800': type === 'Debit'
})

const getStatusClass = (status) => ({
  'px-2 py-1 rounded-full text-xs font-medium': true,
  'bg-green-100 text-green-800': status === 'Completed',
  'bg-yellow-100 text-yellow-800': status === 'Pending',
  'bg-red-100 text-red-800': status === 'Failed'
})
</script>