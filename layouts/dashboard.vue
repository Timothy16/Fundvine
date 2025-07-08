// layouts/dashboard.vue
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Desktop Sidebar -->
    <aside class="w-96 text-white hidden md:block sidebar-gradient relative">
      <div class="p-4">
        <img src="/images/logo.png" alt="NGX Logo" class="h-8" />
      </div>
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <NuxtLink 
            to="/dashboard" 
            class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
            :class="{ 'bg-[#ffa500]': route.path === '/dashboard' }"
          >
            <i class="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/offers" 
            class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
            :class="{ 'bg-[#ffa500]': route.path === '/dashboard/offers' }"
          >
            <i class="fas fa-tag mr-3"></i>
            Offers
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/savings-plan" 
            class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
            :class="{ 'bg-[#ffa500]': route.path === '/dashboard/savings-plan' }"
          >
            <i class="fas fa-piggy-bank mr-3"></i>
            Savings Plan
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/loans" 
            class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
            :class="{ 'bg-[#ffa500]': route.path === '/dashboard/loans' }"
          >
            <i class="fas fa-hand-holding-usd mr-3"></i>
            Loans
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/equity-market" 
            class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
            :class="{ 'bg-[#ffa500]': route.path === '/dashboard/equity-market' }"
          >
            <i class="fas fa-chart-line mr-3"></i>
            Equity Market
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/transactions" 
            class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
            :class="{ 'bg-[#ffa500]': route.path === '/dashboard/transactions' }"
          >
            <i class="fas fa-history mr-3"></i>
            Transaction History
          </NuxtLink>
          <!-- <NuxtLink 
            to="/dashboard/kyc" 
            class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
            :class="{ 'bg-[#ffa500]': route.path === '/dashboard/kyc' }"
          >
            <i class="fas fa-user-shield mr-3"></i>
            KYC
          </NuxtLink> -->
          <!-- <NuxtLink 
            to="/dashboard/settings" 
            class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
            :class="{ 'bg-[#ffa500]': route.path === '/dashboard/settings' }"
          >
            <i class="fas fa-cog mr-3"></i>
            Settings
          </NuxtLink> -->
        </div>
      </nav>
      <div class="absolute bottom-0 w-96 p-4">
        <button @click="handleLogout" class="flex items-center p-3 w-full hover:bg-[#ffa500] rounded-lg transition-colors">
          <span class="material-icons mr-3">logout</span>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <!-- Mobile Header -->
      <header class="bg-white md:hidden border-b flex items-center justify-between p-4">
        <button @click="isSidebarOpen = true" class="text-[#1a3c6d]">
          <span class="material-icons">menu</span>
        </button>
        <div class="flex items-center">
          <p class="mr-3">{{ currentPageTitle }}</p>
          <div class="relative" ref="profileDropdownRef">
            <button @click="isProfileDropdownOpen = !isProfileDropdownOpen" class="h-8 w-8 rounded-full overflow-hidden bg-green-700 text-white flex items-center justify-center focus:outline-none">
              <img 
                v-if="user?.profile?.profile_image" 
                :src="user.profile.profile_image" 
                :alt="user?.full_name || 'User'"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-sm font-medium">{{ userInitials }}</span>
            </button>
            
            <div v-if="isProfileDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <NuxtLink 
                to="/dashboard/kyc" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="closeProfileDropdown"
              >
                KYC
              </NuxtLink>
              <NuxtLink 
                to="/dashboard/settings" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="closeProfileDropdown"
              >
                Settings
              </NuxtLink>
            </div>
          </div>
        </div>
      </header>

      <!-- Desktop Header -->
      <header class="bg-white hidden md:block border-b">
        <div class="flex justify-between items-center p-6">
          <div>
            <h1 class="text-2xl font-semibold">{{ currentPageTitle }}</h1>
            <p class="text-gray-600">{{ currentPageDescription }}</p>
          </div>
          <div class="flex items-center">
            <div class="mr-4 text-right">
              <p class="font-medium">{{ user?.full_name || 'User' }}</p>
              <p class="text-sm text-gray-600">{{ user?.email || 'No email' }}</p>
            </div>
            <div class="relative" ref="desktopProfileDropdownRef">
              <button @click="isProfileDropdownOpen = !isProfileDropdownOpen" class="h-10 w-10 rounded-full overflow-hidden bg-green-700 text-white flex items-center justify-center focus:outline-none">
                <img 
                  v-if="user?.profile?.profile_image" 
                  :src="user.profile.profile_image" 
                  :alt="user?.full_name || 'User'"
                  class="w-full h-full object-cover"
                />
                <span v-else class="font-medium">{{ userInitials }}</span>
              </button>
              
              <div v-if="isProfileDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <NuxtLink 
                  to="/dashboard/kyc" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeProfileDropdown"
                >
                  KYC
                </NuxtLink>
                <NuxtLink 
                  to="/dashboard/settings" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="closeProfileDropdown"
                >
                  Settings
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>

    <!-- Mobile Sidebar -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div v-if="isSidebarOpen" class="fixed inset-0 z-50">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="isSidebarOpen = false"></div>
        
        <!-- Sidebar -->
        <div class="relative w-[280px] h-full sidebar-gradient text-white">
          <div class="flex justify-between items-center p-4 border-b border-gray-700">
            <img src="/images/logo.png" alt="NGX Logo" class="h-8" />
            <button @click="isSidebarOpen = false" class="text-white">
              <span class="material-icons">close</span>
            </button>
          </div>
          <nav class="mt-4">
            <div class="px-4 space-y-2">
              <NuxtLink 
                to="/dashboard/offers" 
                class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
                :class="{ 'bg-[#ffa500]': route.path === '/dashboard/offers' }"
                @click="isSidebarOpen = false"
              >
                <span class="material-icons mr-3">local_offer</span>
                Offers
              </NuxtLink>
              <!-- <NuxtLink 
                to="/dashboard/transactions" 
                class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
                :class="{ 'bg-[#ffa500]': route.path === '/dashboard/transactions' }"
                @click="isSidebarOpen = false"
              >
                <span class="material-icons mr-3">history</span>
                Transaction History
              </NuxtLink> -->
              <!-- <NuxtLink 
                to="/dashboard/kyc" 
                class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
                :class="{ 'bg-[#ffa500]': route.path === '/dashboard/kyc' }"
                @click="isSidebarOpen = false"
              >
                <span class="material-icons mr-3">verified_user</span>
                KYC
              </NuxtLink> -->
              <NuxtLink 
                to="/dashboard/settings" 
                class="flex items-center p-3 rounded-lg hover:bg-[#ffa500] transition-colors"
                :class="{ 'bg-[#ffa500]': route.path === '/dashboard/settings' }"
                @click="isSidebarOpen = false"
              >
                <span class="material-icons mr-3">settings</span>
                Settings
              </NuxtLink>
            </div>
          </nav>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'

useHead({
  script: [
    {
      src: 'https://js.paystack.co/v1/popup.js',
      defer: true
    }
  ]
})

const router = useRouter()
const route = useRoute()
const { signOut, data: authData } = useAuth()
const isProfileDropdownOpen = ref(false)
const isSidebarOpen = ref(false)

// Template refs for click outside functionality
const profileDropdownRef = ref(null)
const desktopProfileDropdownRef = ref(null)

// Get authenticated user data - make it reactive to auth changes
const user = computed(() => {
  return authData.value?.user || null
})

// Generate initials from full name - now reactive to user changes
const userInitials = computed(() => {
  if (!user.value?.full_name) return 'U'
  
  return user.value.full_name
    .split(' ')
    .map(name => name.charAt(0).toUpperCase())
    .slice(0, 2) // Take first 2 initials
    .join('')
})

// Reactive page title and description based on current route
const currentPageTitle = computed(() => {
  switch (route.path) {
    case '/dashboard':
      return 'Dashboard'
    case '/dashboard/offers':
      return 'Offers'
    case '/dashboard/savings-plan':
      return 'Savings Plan'
    case '/dashboard/loans':
      return 'Loans'
    case '/dashboard/equity-market':
      return 'Equity Market'
    case '/dashboard/transactions':
      return 'Transaction History'
    case '/dashboard/kyc':
      return 'KYC'
    case '/dashboard/settings':
      return 'Settings'
    default:
      return 'Dashboard'
  }
})

const currentPageDescription = computed(() => {
  switch (route.path) {
    case '/dashboard':
      return 'Welcome to your Investment Portfolio'
    case '/dashboard/offers':
      return 'Explore available investment opportunities'
    case '/dashboard/savings-plan':
      return 'Manage your savings goals and plans'
    case '/dashboard/loans':
      return 'View and manage your loan products'
    case '/dashboard/equity-market':
      return 'Track and analyze market investments'
    case '/dashboard/transactions':
      return 'View all your transaction records'
    case '/dashboard/kyc':
      return 'Manage your KYC information'
    case '/dashboard/settings':
      return 'Manage your account settings'
    default:
      return 'Welcome to your dashboard'
  }
})

// Function to close profile dropdown
const closeProfileDropdown = () => {
  isProfileDropdownOpen.value = false
}

// Setup click outside for both mobile and desktop dropdowns
onClickOutside(profileDropdownRef, closeProfileDropdown)
onClickOutside(desktopProfileDropdownRef, closeProfileDropdown)

// Watch for route changes to close dropdown
watch(route, () => {
  closeProfileDropdown()
})

const handleLogout = async () => {
  try {
    await signOut({ redirect: false })
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
    router.push('/login')
  }
}
</script>

<style scoped>
.sidebar-gradient {
  background-image: linear-gradient(90deg, #1a3c6d, #102442);
}

.sidebar-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
</style>