<template>
  <nav class="fixed top-0 w-full z-50 px-4 py-3">
    <div class="max-w-7xl mx-auto bg-[#1a3c6d] rounded-full  px-4 md:px-6 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img src="/images/logo.png" alt="Logo" class="h-8" />
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-white hover:text-[#ffa500] transition-colors">About Us</a>
          <a href="#" class="text-white hover:text-[#ffa500] transition-colors">FAQs</a>
          <a href="#" class="text-white hover:text-[#ffa500] transition-colors">Contact Us</a>
        </div>

        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink to="/login" class="text-white hover:text-[#ffa500] transition-colors">Log in</NuxtLink>
          <NuxtLink to="/register" class="bg-[#ffa500] text-[#1a3c6d] px-6 py-2 rounded-full hover:bg-[#e59200] transition-colors flex items-center">
            Sign up
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-white focus:outline-none p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95"
    >
      <div v-if="isMenuOpen" class="md:hidden fixed inset-x-0 top-20 mx-4">
        <div class="bg-[#1a3c6d] rounded-2xl shadow-xl border border-white/10 overflow-hidden">
          <div class="px-6 py-4 space-y-1">
            <!-- Menu Links -->
            <a href="#" @click="closeMenu" class="block px-4 py-3 text-white hover:bg-white/10 hover:text-[#ffa500] rounded-lg transition-colors">
              About Us
            </a>
            <a href="#" @click="closeMenu" class="block px-4 py-3 text-white hover:bg-white/10 hover:text-[#ffa500] rounded-lg transition-colors">
              FAQs
            </a>
            <a href="#" @click="closeMenu" class="block px-4 py-3 text-white hover:bg-white/10 hover:text-[#ffa500] rounded-lg transition-colors">
              Contact Us
            </a>
            
            <!-- Divider -->
            <div class="h-px bg-white/20 my-4"></div>
            
            <!-- Auth Links -->
            <NuxtLink to="/login" @click="closeMenu" class="block px-4 py-3 text-white hover:bg-white/10 hover:text-[#ffa500] rounded-lg transition-colors">
              Log in
            </NuxtLink>
            <NuxtLink to="/register" @click="closeMenu" class="block mx-4 mt-2 mb-2 bg-[#ffa500] text-[#1a3c6d] px-6 py-3 rounded-xl hover:bg-[#e59200] text-center font-medium transition-colors">
              Sign up
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile Menu Backdrop -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMenuOpen" @click="closeMenu" class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"></div>
    </transition>
  </nav>
</template>

<script setup>
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Close menu when clicking outside or pressing escape
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeMenu()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>