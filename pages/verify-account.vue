<template>
    <div class="flex flex-col min-h-screen p-2 bg-[#1a3c6d] items-center justify-center">
      <!-- Logo at the Top -->
      <div class="mb-6">
        <img
          src="/images/logo.png" 
          alt="Logo"
          class="h-10"
        />
      </div>
  
      <!-- White Box Centered -->
      <div class="bg-white rounded-lg shadow-lg px-10  py-12 text-center max-w-md w-full">
        <svg
          class="w-16 h-16 mx-auto text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4M7 12a5 5 0 11-2 0m2-5a5 5 0 01.883-2.872A5 5 0 0121 12m-7 7a5 5 0 10-4-9.874"
          />
        </svg>
        <h2 class="mt-6 text-2xl font-semibold text-gray-900">Account Successfully Verified!</h2>
        <p class="mt-4 text-gray-600">
          Your account has been verified. You can now log in and access your dashboard.
        </p>
        <button
          @click="$router.push('/login')"
          class="mt-6 w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-300"
        >
          Login →
        </button>
      </div>
    </div>
  </template>
  