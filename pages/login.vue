<template>
    <div class="flex min-h-screen">
      <!-- Mobile Back Button -->
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
        <NuxtLink to="/" class="mt-4 z-20">
          <img src="/images/logo.png" alt="Logo" class="h-12" />
        </NuxtLink>
        <div class="absolute inset-0 opacity-20">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="M0 50 L50 0 L100 50 L50 100 Z" fill="none" stroke="#ffffff" stroke-width="0.5" />
          </svg>
        </div>
      </div>
  
      <!-- Right Side -->
      <div class="flex flex-1 bg-grey-50 items-center justify-center">
        <div class="w-full max-w-3xl px-6 md:px-12 py-8 rounded-lg mt-16 md:mt-0">
          <h2 class="text-3xl font-semibold text-gray-900">Welcome back</h2>
          <p class="text-lg text-gray-600 mt-2">Login to continue</p>
  
          <form class="mt-8 space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                class="mt-2 block w-full px-4 py-3 border focus:outline-none focus:ring-2 rounded-md focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-500 text-gray-900"
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="relative">
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="mt-2 block w-full px-4 py-3 border focus:outline-none focus:ring-2 rounded-md focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-500 text-gray-900"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.09.25-.198.492-.316.724" />
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="mb-4">
              <NuxtLink to="/forgot-password" class="text-sm text-blue-600 hover:text-blue-900">Forgot Password?</NuxtLink>
            </div>
            <NuxtLink to="/dashboard/offers">
              <button
                type="submit"
                class="w-full mt-3 bg-[#1a3c6d] text-white px-6 py-3 rounded-md hover:bg-[#1a3c6d] focus:ring-2 focus:ring-[#1a3c6d]-400"
              >
                Login →
              </button>
            </NuxtLink>
          </form>
  
          <p class="mt-8 text-center text-sm text-gray-600">
            New to Fundvine Money Market Fund? 
            <NuxtLink to="/register" class="text-blue-600 hover:text-blue-900">Create an account</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const showPassword = ref(false)
  </script>