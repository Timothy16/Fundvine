<template>
  <NuxtLayout name="dashboard">
    <div class="p-4 md:p-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        {{ userProfile.is_kyc_complete }}
        <!-- Header -->
        <div class="flex items-center gap-3 mb-6">
          <h2 class="text-xl font-semibold">Profile</h2>
          <span 
            class="px-3 py-1 rounded-full text-sm"
            :class="userProfile.is_kyc_complete ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'"
          >
            {{ userProfile.is_kyc_complete ? 'KYC Completed' : 'KYC Pending' }}
          </span>
        </div>

        <!-- Tabs -->
        <div class="bg-white border-b border-gray-200 mb-6">
          <nav class="flex gap-4 p-2">
            <button 
              @click="activeTab = 'basic'"
              :class="[
                'px-4 py-2 focus:outline-none',
                activeTab === 'basic' ? 'text-white bg-[#1a3c6d] rounded-lg' : 'text-gray-600 hover:text-[#1a3c6d]'
              ]"
            >
              Basic Information
            </button>
            <button 
              @click="activeTab = 'upload'"
              :class="[
                'px-4 py-2 focus:outline-none',
                activeTab === 'upload' ? 'text-white bg-[#1a3c6d] rounded-lg' : 'text-gray-600 hover:text-[#1a3c6d]'
              ]"
            >
              Upload Documents
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="mt-6">
          <!-- Basic Information Tab -->
          <div v-if="activeTab === 'basic'">
            <KycBasicInformation />
          </div>

          <!-- Upload Documents Tab -->
          <div v-if="activeTab === 'upload'">
            <KycDocumentUpload />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
definePageMeta({
  middleware: ['auth']
})
const { data: authData, getSession } = useAuth()
// Import child components
import KycBasicInformation from '~/components/KycBasicInformation.vue'
import KycDocumentUpload from '~/components/KycDocumentUpload.vue'

// Tab state
const activeTab = ref('basic')

const userProfile = computed(() => authData.value?.user?.profile)
</script>