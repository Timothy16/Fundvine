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
          <h2 class="text-3xl font-semibold text-gray-900">Forgot Password</h2>
          <p class="text-sm text-gray-600 mt-2">
            Enter the email address linked to your account in order to reset your password.
          </p>
  
          <!-- Form -->
          <form class="mt-6 space-y-6 mb-3">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffa500] focus:border-[#ffa500] text-gray-900"
                placeholder="Email Address"
                required
              />
            </div>
  
            <!-- Submit Button -->
            <NuxtLink to="/reset-password">
            <button
              type="submit"
              class="w-full mmt-3 bg-[#1a3c6d] relative top-5 text-white px-6 py-3 rounded-md hover:bg-[#1a3c6d] focus:ring-2 focus:ring-[#1a3c6d]-500"
            >
              Reset Password →
            </button>
            </NuxtLink>
          </form>
  
          <!-- Go Back Link -->
          <div class="mt-6">
            <NuxtLink to="/login" class="text-sm text-[#1a3c6d] hover:text-blue-900">
              Go back
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
</template>

  <style>
.sidebar-gradient {
  background-image: linear-gradient(90deg, #1a3c6d, #102442);
  /* Alternative gradient options you might like: */
  /* background-image: linear-gradient(90deg, #1a3c6d, #0f2544); */
  /* background-image: linear-gradient(90deg, #1a3c6d, #15304f); */
 
}

/* Optional: Add a subtle pattern overlay to make it even more beautiful */
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
  