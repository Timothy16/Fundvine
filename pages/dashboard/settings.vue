// pages/dashboard/settings.vue
<template>
  <NuxtLayout name="dashboard">
    <div class="h-full">
      <!-- Tabs -->
      <div class="bg-white border-b border-gray-200">
        <nav class="flex gap-4 p-2 px-6">
          <button 
            @click="activeTab = 'profile'"
            :class="[
              'px-4 py-2 focus:outline-none',
              activeTab === 'profile' ? 'text-white bg-green-600 rounded-lg' : 'text-gray-600'
            ]"
          >
            Profile
          </button>
          <button 
            @click="activeTab = 'password'"
            :class="[
              'px-4 py-2 focus:outline-none',
              activeTab === 'password' ? 'text-white bg-green-600 rounded-lg' : 'text-gray-600'
            ]"
          >
            Change Password
          </button>
        </nav>
      </div>

      <!-- Profile Tab Content -->
      <div v-if="activeTab === 'profile'" class="mt-6">
        <div class="bg-green-50">
          <div class="px-6 py-4">
            <h2 class="text-gray-700">Personal Information</h2>
          </div>
        </div>

        <div class="bg-white px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="space-y-1">
              <label class="text-sm text-gray-500">FIRST NAME</label>
              <p class="text-gray-900">Bekee</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">MIDDLE NAME</label>
              <p class="text-gray-900">N/A</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">LAST NAME</label>
              <p class="text-gray-900">Franklin</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">EMAIL ADDRESS</label>
              <p class="text-gray-900">frank4up@yahoo.com</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">PHONE NUMBER</label>
              <p class="text-gray-900 flex items-center">
                <img src="/images/flag.svg" alt="NG" class="h-4 w-6 mr-2" />
                2348067937292
              </p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">BVN</label>
              <p class="text-gray-900">2224*******</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">ADDRESS</label>
              <p class="text-gray-900">273b Ajose Adeogun Street</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">NEXT OF KIN NAME</label>
              <p class="text-gray-900">Bekee Jayden Chimebuka</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">NEXT OF KIN PHONE NUMBER</label>
              <p class="text-gray-900 flex items-center">
                <img src="/images/flag.svg" alt="NG" class="h-4 w-6 mr-2" />
                8067937292
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Change Password Tab Content -->
      <div v-if="activeTab === 'password'" class="mt-6">
        <div class="bg-green-50">
          <div class="px-6 py-4">
            <h2 class="text-gray-700">Change Password</h2>
          </div>
        </div>

        <div class="bg-white px-6 py-4">
          <div class="max-w-2xl">
            <form @submit.prevent="handlePasswordChange">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm mb-2">Current Password</label>
                  <div class="relative">
                    <input 
                      :type="showCurrentPassword ? 'text' : 'password'"
                      v-model="currentPassword"
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Current Password"
                    />
                    <button 
                      type="button"
                      @click="showCurrentPassword = !showCurrentPassword"
                      class="absolute right-3 top-2.5"
                    >
                      <span class="material-icons text-gray-400">
                        {{ showCurrentPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-sm mb-2">New Password</label>
                  <div class="relative">
                    <input 
                      :type="showNewPassword ? 'text' : 'password'"
                      v-model="newPassword"
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="New Password"
                    />
                    <button 
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="absolute right-3 top-2.5"
                    >
                      <span class="material-icons text-gray-400">
                        {{ showNewPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-sm mb-2">Confirm Password</label>
                  <div class="relative">
                    <input 
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-model="confirmPassword"
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Confirm Password"
                    />
                    <button 
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute right-3 top-2.5"
                    >
                      <span class="material-icons text-gray-400">
                        {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                </div>

                <!-- Password Policy -->
                <div class="bg-green-50 p-4 rounded-lg">
                  <h3 class="font-medium mb-2">Password Policy</h3>
                  <ul class="space-y-1 text-sm">
                    <li>• one upper case letter [A-Z]</li>
                    <li>• one lower case letter [a-z]</li>
                    <li>• one digit [0-9]</li>
                    <li>• one special character [!@#$%*&_-+/]</li>
                    <li>• minimum length of eight characters</li>
                  </ul>
                </div>

                <button 
                  type="submit"
                  class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const activeTab = ref('profile')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const handlePasswordChange = () => {
  // Handle password change logic here
  console.log('Password change submitted')
}
</script>