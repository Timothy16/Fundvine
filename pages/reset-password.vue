<template>
    <div class="flex min-h-screen">
      <div class="md:hidden fixed top-4 left-4 z-50">
        <NuxtLink to="/" class="flex items-center text-gray-700 hover:text-[#1a3c6d]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="ml-2">Back</span>
        </NuxtLink>
      </div>
      
      <!-- Left Side -->
      <div class="hidden md:flex w-2/5 sidebar-gradient flex-col justify-start items-start px-8 py-6 relative">
        <div class="mt-4 z-20">
          <img src="/images/logo.png" alt="Logo" class="h-12" />
        </div>
        <!-- Subtle pattern -->
        <div class="absolute inset-0 opacity-20">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="M0 50 L50 0 L100 50 L50 100 Z" fill="none" stroke="#ffffff" stroke-width="0.5" />
          </svg>
        </div>
      </div>
  
      <!-- Right Side -->
      <div class="flex flex-1 items-center justify-center bg-gray-50">
        <div class="w-full max-w-3xl px-6 md:px-12 py-8 rounded-lg mt-16 md:mt-0">
          <h2 class="text-3xl font-semibold text-gray-900">Verify Password</h2>
          <p class="text-sm text-gray-600 mt-2">
            Enter your email, set a new password, and confirm it to verify your account.
          </p>
  
          <!-- Form -->
          <form class="mt-6 space-y-6">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                class="mt-2 block w-full px-4 py-3 border rounded-md focus:ring-[#ffa500] focus:border-[#ffa500] text-gray-900"
                placeholder="Email Address"
                required
              />
            </div>
  
            <!-- New Password Field -->
            <div>
              <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
              <input
                id="new-password"
                type="password"
                class="mt-2 block w-full px-4 py-3 border rounded-md focus:ring-[#ffa500] focus:border-[#ffa500] text-gray-900"
                placeholder="New Password"
                required
              />
            </div>
  
            <!-- Confirm Password Field -->
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                class="mt-2 block w-full px-4 py-3 border rounded-md focus:ring-[#ffa500] focus:border-[#ffa500] text-gray-900"
                placeholder="Confirm Password"
                required
              />
            </div>
  
            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-[#1a3c6d] text-white px-6 py-3 rounded-md hover:bg-[#1a3c6d]-600 focus:ring-2 focus:ring-[#1a3c6d]-300"
            >
              Reset Password →
            </button>
          </form>
  
          <!-- Go Back Link -->
          <div class="mt-6">
            <NuxtLink to="/" class="text-sm text-[#1a3c6d] hover:text-blue-900">
              Go Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  