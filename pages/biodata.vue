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
          <img src="/images/logo.png" alt="NGX Logo" class="h-12" />
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
          <p class="text-sm text-gray-600">Personal Information</p>
          <h2 class="text-3xl font-semibold text-gray-900">Complete your profile</h2>
  
          <!-- Form -->
          <form class="mt-8 space-y-6">
            <!-- NIN and BVN Fields -->
            <div class="flex flex-col md:flex-row md:space-x-4">
              <div class="flex-1">
                <label for="nin" class="block text-sm font-medium text-gray-700">National Identification Number (NIN)</label>
                <input
                  id="nin"
                  type="text"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  placeholder="National Identification Number"
                  required
                />
              </div>
  
              <div class="flex-1 mt-4 md:mt-0">
                <label for="bvn" class="block text-sm font-medium text-gray-700">Bank Verification Number (BVN)</label>
                <input
                  id="bvn"
                  type="text"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  placeholder="Bank Verification Number"
                  required
                />
              </div>
            </div>

            <!-- Date of Birth and Gender -->
            <div class="flex flex-col md:flex-row md:space-x-4">
              <div class="flex-1">
                <label for="dob" class="block text-sm font-medium text-gray-700">Date of birth</label>
                <input
                  id="dob"
                  type="text"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  placeholder="DD-MM-YYYY"
                  required
                />
              </div>
  
              <div class="flex-1 mt-4 md:mt-0">
                <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <!-- Home Address -->
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">Home Address</label>
              <input
                id="address"
                type="text"
                class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                placeholder="Home Address"
                required
              />
            </div>

            <!-- Next of Kin Phone Number -->
            <div>
              <label for="next-of-kin-phone" class="block text-sm font-medium text-gray-700">Next of Kin Phone Number</label>
              <div class="flex items-center mt-2">
                <span class="flex items-center justify-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  <img src="/images/flag.svg" alt="Nigeria Flag" class="h-4 w-6" />
                  <span class="ml-2 text-gray-600">+234</span>
                </span>
                <input
                  id="next-of-kin-phone"
                  type="tel"
                  class="block w-full px-4 py-3 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  placeholder="Next of Kin Phone Number"
                  required
                />
              </div>
            </div>

            <!-- Next of Kin Name and Mother's Maiden Name -->
            <div class="flex flex-col md:flex-row md:space-x-4">
              <div class="flex-1">
                <label for="next-of-kin-name" class="block text-sm font-medium text-gray-700">Next of Kin Name</label>
                <input
                  id="next-of-kin-name"
                  type="text"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  placeholder="Next of Kin Name"
                  required
                />
              </div>
  
              <div class="flex-1 mt-4 md:mt-0">
                <label for="mothers-maiden-name" class="block text-sm font-medium text-gray-700">Mother's Maiden Name</label>
                <input
                  id="mothers-maiden-name"
                  type="text"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  placeholder="Mother's Maiden Name"
                  required
                />
              </div>
            </div>

            <!-- State and LGA -->
            <div class="flex flex-col md:flex-row md:space-x-4">
              <div class="flex-1">
                <label for="state" class="block text-sm font-medium text-gray-700">State Of Origin</label>
                <select
                  id="state"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  required
                >
                  <option value="">Select State</option>
                </select>
              </div>
  
              <div class="flex-1 mt-4 md:mt-0">
                <label for="lga" class="block text-sm font-medium text-gray-700">Local Government Area (LGA)</label>
                <select
                  id="lga"
                  class="mt-2 block w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a3c6d] focus:border-[#1a3c6d] text-gray-900"
                  required
                >
                  <option value="">Select LGA</option>
                </select>
              </div>
            </div>

            <!-- Authorization Checkbox -->
            <div class="flex items-start">
              <input id="authorization" type="checkbox" class="mt-1 mr-2 focus:ring-[#1a3c6d]" required />
              <label for="authorization" class="text-sm text-gray-600">
                I hereby give authorization to access my BVN information with NIBSS
              </label>
            </div>
  
            <!-- Submit Button -->
            <!-- <button
              type="submit"
              class="w-full bg-[#1a3c6d] text-white px-6 py-3 rounded-md hover:bg-[#006b3f] focus:ring-2 focus:ring-[#1a3c6d]"
            >
              Submit →
            </button> -->
            <div>
                <NuxtLink to="/verify-account" class="mt-4">
                    <button
                        type="submit"
                        class="w-full bg-[#1a3c6d] text-white px-6 py-3 rounded-md hover:bg-[#1a3c6d]-600 focus:ring-2 focus:ring-[#1a3c6d]-400"
                        >
                       Submit
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