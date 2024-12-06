<template>
  <nav class="fixed top-0 w-full z-50 px-4 py-2">
    <div class="max-w-7xl mx-auto bg-[#1a3c6d] rounded-full shadow-sm px-6 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img src="/images/logo.png" alt="Logo" class="h-8" />
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-white hover:text-[#ffa500]">About Us</a>
          <a href="#" class="text-white hover:text-[#ffa500]">FAQs</a>
          <a href="#" class="text-white hover:text-[#ffa500]">Contact Us</a>
        </div>

        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink to="/login" class="text-white hover:text-[#ffa500]">Log in</NuxtLink>
          <NuxtLink to="/register" class="bg-[#ffa500] text-[#1a3c6d] px-6 py-2 rounded-full hover:bg-[#e59200] flex items-center">
            Sign up
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white focus:outline-none">
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden mt-4">
        <div class="flex flex-col space-y-4">
          <a href="#" class="text-white hover:text-[#ffa500]">About Us</a>
          <a href="#" class="text-white hover:text-[#ffa500]">FAQs</a>
          <a href="#" class="text-white hover:text-[#ffa500]">Contact Us</a>
          <NuxtLink to="/login" class="text-white hover:text-[#ffa500]">Log in</NuxtLink>
          <NuxtLink to="/register" class="bg-[#ffa500] text-[#1a3c6d] px-6 py-2 rounded-full hover:bg-[#e59200] text-center">
            Sign up
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isMenuOpen = ref(false)
</script>