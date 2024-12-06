// pages/dashboard/kyc.vue
<template>
    <NuxtLayout name="dashboard">
      <div class="p-4 md:p-6">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-xl font-semibold">Profile</h2>
            <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">KYC Pending</span>
          </div>
  
          <p class="text-gray-600 mb-8">Please upload a valid government-issued ID to complete your KYC verification.</p>
  
          <!-- Enhanced Document Type Selection -->
          <div class="mb-6">
            <label class="block text-gray-700 mb-2">Choose document type</label>
            <div class="w-full md:w-1/2 relative">
              <button 
                @click="isDropdownOpen = !isDropdownOpen"
                class="w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a3c6d]"
              >
                <div class="flex items-center gap-3">
                  <span v-if="selectedDocType" class="material-icons text-[#1a3c6d]">
                    {{ getDocumentIcon(selectedDocType) }}
                  </span>
                  <span v-if="!selectedDocType" class="text-gray-500">Select document type</span>
                  <span v-else class="text-gray-900">{{ getDocumentName(selectedDocType) }}</span>
                </div>
                <span class="material-icons text-gray-400" :class="{ 'rotate-180': isDropdownOpen }">
                  expand_more
                </span>
              </button>
  
              <!-- Dropdown Menu -->
              <div 
                v-if="isDropdownOpen"
                class="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg py-2"
              >
                <button
                  v-for="option in documentTypes"
                  :key="option.value"
                  @click="selectDocument(option.value)"
                  class="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                  :class="{ 'bg-blue-50': selectedDocType === option.value }"
                >
                  <span class="material-icons text-[#1a3c6d]">{{ option.icon }}</span>
                  <div class="text-left">
                    <p class="font-medium text-gray-900">{{ option.label }}</p>
                    <p class="text-sm text-gray-500">{{ option.description }}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
  
          <!-- Enhanced Document Upload Section -->
          <div class="mb-8">
            <label class="block text-gray-700 mb-2">Upload document</label>
            <p class="text-sm text-gray-500 mb-4">*Upload the document file as image or pdf with high resolution. Max file size 2mb</p>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Front Side Upload -->
              <div 
                class="relative border-2 border-dashed rounded-lg overflow-hidden transition-all"
                :class="[
                  isDraggingFront ? 'border-[#1a3c6d] bg-blue-50' : 'border-gray-300',
                  frontDocument ? 'bg-white' : 'hover:bg-gray-50'
                ]"
                @dragover.prevent="isDraggingFront = true"
                @dragleave.prevent="isDraggingFront = false"
                @drop.prevent="handleDrop('front', $event)"
              >
                <div v-if="frontDocument" class="p-4">
                  <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                      <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span class="material-icons text-[#1a3c6d] text-2xl">
                          {{ getFileIcon(frontDocument.type) }}
                        </span>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900 truncate">{{ frontDocument.name }}</p>
                      <p class="text-sm text-gray-500">{{ formatFileSize(frontDocument.size) }}</p>
                      <div class="mt-2 flex items-center gap-4">
                        <button @click="viewDocument('front')" class="text-sm text-[#1a3c6d] hover:underline">
                          Preview
                        </button>
                        <button @click="removeDocument('front')" class="text-sm text-red-600 hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span class="material-icons text-green-600 text-xl">check</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="p-8">
                  <input
                    type="file"
                    ref="frontFileInput"
                    class="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    @change="handleFileUpload('front', $event)"
                  >
                  <div class="text-center">
                    <span class="material-icons text-[#1a3c6d] text-4xl mb-3">upload_file</span>
                    <h3 class="font-medium text-gray-900 mb-1">Front Side of Document</h3>
                    <p class="text-sm text-gray-500 mb-4">Drag & drop or click to upload</p>
                    <button 
                      @click="$refs.frontFileInput.click()"
                      class="inline-flex items-center px-4 py-2 border border-[#1a3c6d] text-[#1a3c6d] rounded-lg hover:bg-[#1a3c6d] hover:text-white transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                </div>
              </div>
  
              <!-- Back Side Upload - Similar to Front Side -->
              <div 
  class="relative border-2 border-dashed rounded-lg overflow-hidden transition-all"
  :class="[
    isDraggingBack ? 'border-[#1a3c6d] bg-blue-50' : 'border-gray-300',
    backDocument ? 'bg-white' : 'hover:bg-gray-50'
  ]"
  @dragover.prevent="isDraggingBack = true"
  @dragleave.prevent="isDraggingBack = false"
  @drop.prevent="handleDrop('back', $event)"
>
  <div v-if="backDocument" class="p-4">
    <div class="flex items-center gap-4">
      <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <span class="material-icons text-[#1a3c6d] text-2xl">
            {{ getFileIcon(backDocument.type) }}
          </span>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-medium text-gray-900 truncate">{{ backDocument.name }}</p>
        <p class="text-sm text-gray-500">{{ formatFileSize(backDocument.size) }}</p>
        <div class="mt-2 flex items-center gap-4">
          <button @click="viewDocument('back')" class="text-sm text-[#1a3c6d] hover:underline">
            Preview
          </button>
          <button @click="removeDocument('back')" class="text-sm text-red-600 hover:underline">
            Remove
          </button>
        </div>
      </div>
      <div class="flex-shrink-0">
        <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <span class="material-icons text-green-600 text-xl">check</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-8">
    <input
      type="file"
      ref="backFileInput"
      class="hidden"
      accept=".jpg,.jpeg,.png,.pdf"
      @change="handleFileUpload('back', $event)"
    >
    <div class="text-center">
      <span class="material-icons text-[#1a3c6d] text-4xl mb-3">upload_file</span>
      <h3 class="font-medium text-gray-900 mb-1">Back Side of Document</h3>
      <p class="text-sm text-gray-500 mb-4">Drag & drop or click to upload</p>
      <button 
        @click="$refs.backFileInput.click()"
        class="inline-flex items-center px-4 py-2 border border-[#1a3c6d] text-[#1a3c6d] rounded-lg hover:bg-[#1a3c6d] hover:text-white transition-colors"
      >
        Choose File
      </button>
    </div>
  </div>
</div>
            </div>
          </div>
  
          <!-- Submit Button -->
          <button 
            @click="submitKYC"
            :disabled="!isFormValid"
            class="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all"
            :class="[
              isFormValid ? 'bg-[#1a3c6d] text-white hover:bg-[#153154]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            ]"
          >
            <span class="material-icons" v-if="isFormValid">upload_file</span>
            Submit Documents
          </button>
        </div>
      </div>
    </NuxtLayout>
</template>
<script setup>
const selectedDocType = ref('')
const frontDocument = ref(null)
const backDocument = ref(null)
const confirmation = ref(false)
const isDropdownOpen = ref(false)
const isDraggingFront = ref(false)
const isDraggingBack = ref(false)

const isFormValid = computed(() => {
  return selectedDocType.value && frontDocument.value && backDocument.value && confirmation.value
})

const handleFileUpload = (side, event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert('File size should not exceed 2MB')
      return
    }
    if (side === 'front') {
      frontDocument.value = file
    } else {
      backDocument.value = file
    }
  }
}

const removeDocument = (side) => {
  if (side === 'front') {
    frontDocument.value = null
  } else {
    backDocument.value = null
  }
}

const documentTypes = [
  {
    value: 'drivingLicense',
    label: 'Driving License',
    icon: 'directions_car',
    description: 'Valid driver\'s license with photo ID'
  },
  {
    value: 'nationalId',
    label: 'National ID',
    icon: 'badge',
    description: 'Government-issued national identity card'
  },
  {
    value: 'passport',
    label: 'International Passport',
    icon: 'flight',
    description: 'Valid international passport'
  },
  {
    value: 'votersCard',
    label: 'Voter\'s Card',
    icon: 'how_to_vote',
    description: 'Valid voter\'s registration card'
  }
]

const getDocumentIcon = (type) => {
  const doc = documentTypes.find(d => d.value === type)
  return doc ? doc.icon : 'description'
}

const getDocumentName = (type) => {
  const doc = documentTypes.find(d => d.value === type)
  return doc ? doc.label : ''
}

const getFileIcon = (type) => {
  if (type.includes('pdf')) return 'picture_as_pdf'
  if (type.includes('image')) return 'image'
  return 'insert_drive_file'
}

const selectDocument = (value) => {
  selectedDocType.value = value
  isDropdownOpen.value = false
}

const handleDrop = (side, event) => {
  const file = event.dataTransfer.files[0]
  handleFileUpload(side, { target: { files: [file] } })
  if (side === 'front') isDraggingFront.value = false
  else isDraggingBack.value = false
}

const viewDocument = (side) => {
  const file = side === 'front' ? frontDocument.value : backDocument.value
  if (file) {
    // Handle document preview
    console.log(`Viewing ${side} document:`, file)
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i]
}

const submitKYC = () => {
  if (isFormValid.value) {
    // Handle KYC submission
    console.log('Submitting KYC', {
      documentType: selectedDocType.value,
      frontDocument: frontDocument.value,
      backDocument: backDocument.value
    })
  }
}
</script>