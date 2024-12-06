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
          <h2 class="text-3xl font-semibold text-gray-900">Create new account</h2>
          <p class="text-sm text-gray-600 mt-2">
            Already an investor?
            <NuxtLink to="login" class="text-[#1a3c6d] hover:text-[#1a3c6d]-900 font-medium">Login</NuxtLink>
          </p>
  
          <!-- Form -->
          <form class="mt-8 space-y-6">
            <!-- Name Fields in Two Columns -->
            <div class="flex flex-col md:flex-row md:space-x-4">
              <!-- First Name -->
              <div class="flex-1">
                <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900"
                  placeholder="First Name"
                  required
                />
              </div>
  
              <!-- Last Name -->
              <div class="flex-1 mt-4 md:mt-0">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
  
            <!-- Contact Fields in Two Columns -->
            <div class="flex flex-col md:flex-row md:space-x-4">
              <!-- Phone Number -->
              <div class="flex-1">
                <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <div class="flex items-center mt-2">
                    <span class="flex items-center justify-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    <img src="/images/flag.svg" alt="Nigeria Flag" class="h-4 w-6" />
                    <span class="ml-2 text-gray-600">+234</span>
                    </span>
                  <input
                    id="phone-number"
                    type="tel"
                    class="block w-full px-4 py-3 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>
  
              <!-- Email -->
              <div class="flex-1 mt-4 md:mt-0">
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  type="email"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
  
            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2  focus:ring-[#1a3c6d] focus:border-[#1a3c6d]-400 text-gray-900"
                placeholder="Minimum of 8 characters"
                required
              />
              <ul class="text-xs text-gray-500 mt-2 space-y-1">
                <li>✔️ One lowercase character</li>
                <li>✔️ One uppercase character</li>
                <li>✔️ One special character</li>
                <li>✔️ One number</li>
                <li>✔️ Minimum 8 characters</li>
              </ul>
            </div>
  
            <!-- Checkbox -->
            <div class="flex items-start">
              <input id="terms" type="checkbox" class="mt-1 mr-2 focus:ring-[#1a3c6d]-400" required />
              <label for="terms" class="text-sm text-gray-600">
                I acknowledge that I have read and agree to
                <a href="#" class="text-[#1a3c6d]-600 hover:text-[#1a3c6d]-900"> Terms and Conditions </a>
                and
                <a href="#" class="text-[#1a3c6d]-600 hover:text-[#1a3c6d]-900"> Privacy Policy </a>.
              </label>
            </div>
  
            <!-- Submit Button -->
            <div>
                <NuxtLink to="/verify-account" class="mt-4">
                    <button
                        type="submit"
                        class="w-full bg-[#1a3c6d] text-white px-6 py-3 rounded-md hover:bg-[#1a3c6d]-600 focus:ring-2 focus:ring-[#1a3c6d]-400"
                        >
                        Get Started →
                    </button>
                </NuxtLink>
            </div>
            
          </form>
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
  