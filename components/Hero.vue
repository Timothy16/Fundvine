<template>
  <div class="min-h-screen bg-[#1a3c6d] pt-32 pb-20 relative overflow-hidden">
    <!-- Background Pattern -->
    <!-- <div class="absolute inset-0 opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="ngx-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M0 0L100 100M100 0L0 100" stroke="currentColor" stroke-width="2" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#ngx-pattern)" />
      </svg>
    </div> -->

    <div class="px-4 mt-10 relative z-10 width-layout flex flex-col items-center justify-center">
      <!-- Pill Label -->
      <div class="mb-12 min-h-10 rounded-[100px] border border-[#FFFFFF40] bg-[#FFFFFF26] px-5 py-2 flex items-center text-[13px] gap-x-3">
        <img src="/images/logo.png" alt="Fundvine" class="h-6 mr-3" />
      
        <span class="text-white">Your No.1 Offer & Rights Issue Subscription Gateway</span>
      </div>

  <!-- Main Content -->
  <div class="text-center max-w-4xl mx-auto mt-10">
    <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
      Empower Your Investment Journey in Nigeria
    </h1>
    <p class="text-lg md:text-xl text-white/90 mb-12">
      Easily access public offers and rights issues on Nigeria's Premier Exchange
    </p>
    <NuxtLink to="/login" class="text-[#1a3c6d]  px-10 py-[12px] text-[14px] font-[500] rounded-[4px] inline-flex justify-center items-center gap-[8px] focus:outline-none mt-[60px] h-[60px] rounded-[10px] w-[240px] bg-[#ffa500]">
      Invest Now
      <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </NuxtLink>
  </div>
</div>
  </div>
</template>

