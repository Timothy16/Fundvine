<template>
  <div>
    <p class="text-gray-600 mb-8">Please upload a valid government-issued ID to complete your KYC verification.</p>

    <!-- Enhanced Document Type Selection -->
    <div class="mb-6">
      <label class="block text-gray-700 mb-2">Choose document type</label>
      
      <!-- Loading state for document types -->
      <div v-if="isLoadingDocTypes" class="w-full md:w-1/2">
        <div class="flex items-center justify-center px-4 py-3 border rounded-lg bg-gray-50">
          <svg class="animate-spin h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-500">Loading document types...</span>
        </div>
      </div>

      <!-- Document type dropdown -->
      <div v-else class="w-full md:w-1/2 relative">
        <button 
          @click="isDropdownOpen = !isDropdownOpen"
          class="w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a3c6d]"
        >
          <div class="flex items-center gap-3">
            <span v-if="selectedDocType" class="material-icons text-[#1a3c6d]">
              {{ getDocumentIcon(selectedDocType.name) }}
            </span>
            <span v-if="!selectedDocType" class="text-gray-500">Select document type</span>
            <span v-else class="text-gray-900">{{ selectedDocType.name }}</span>
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
            :key="option.id"
            @click="selectDocument(option)"
            class="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
            :class="{ 'bg-blue-50': selectedDocType?.id === option.id }"
          >
            <span class="material-icons text-[#1a3c6d]">{{ getDocumentIcon(option.name) }}</span>
            <div class="text-left">
              <p class="font-medium text-gray-900">{{ option.name }}</p>
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
              <div class="flex-shrink-0 flex flex-col gap-2">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="material-icons text-green-600 text-xl">check</span>
                </div>
                <button 
                  @click="uploadDocument('front')"
                  :disabled="isUploading || !selectedDocType"
                  class="px-3 py-1 text-xs bg-[#1a3c6d] text-white rounded hover:bg-[#153154] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isUploading && uploadingSide === 'front' ? 'Uploading...' : 'Upload' }}
                </button>
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

        <!-- Back Side Upload -->
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
              <div class="flex-shrink-0 flex flex-col gap-2">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="material-icons text-green-600 text-xl">check</span>
                </div>
                <button 
                  @click="uploadDocument('back')"
                  :disabled="isUploading || !selectedDocType"
                  class="px-3 py-1 text-xs bg-[#1a3c6d] text-white rounded hover:bg-[#153154] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isUploading && uploadingSide === 'back' ? 'Uploading...' : 'Upload' }}
                </button>
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
  </div>
</template>
<script setup>
import { useToast } from 'vue-toastification'
// Document types state
const documentTypes = ref([])
const isLoadingDocTypes = ref(false)
const selectedDocType = ref(null)

// Upload state
const frontDocument = ref(null)
const backDocument = ref(null)
const isDropdownOpen = ref(false)
const isDraggingFront = ref(false)
const isDraggingBack = ref(false)
const isUploading = ref(false)
const uploadingSide = ref('')

// Toast (assuming you have this implemented)
const toast = useToast() // or however your toast is imported

// Computed property for form validation
const isFormValid = computed(() => {
  return selectedDocType.value && (frontDocument.value || backDocument.value)
})

// Fetch document types on mount
onMounted(() => {
  fetchDocumentTypes()
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      isDropdownOpen.value = false
    }
  })
})

const fetchDocumentTypes = async () => {
  isLoadingDocTypes.value = true
  
  try {
    const response = await $fetch('/api/get-means-of-ids', {
      method: 'GET'
    })
    
    documentTypes.value = response.data
  } catch (error) {
    console.error('Failed to fetch document types:', error)
    toast.error('Failed to load document types. Please refresh the page.')
  } finally {
    isLoadingDocTypes.value = false
  }
}

const getDocumentIcon = (name) => {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('passport')) return 'flight'
  if (lowerName.includes('license') || lowerName.includes('licence')) return 'directions_car'
  if (lowerName.includes('national') || lowerName.includes('identity')) return 'badge'
  if (lowerName.includes('voter')) return 'how_to_vote'
  return 'description'
}

const selectDocument = (option) => {
  selectedDocType.value = option
  isDropdownOpen.value = false
}

const handleFileUpload = (side, event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error('File size should not exceed 2MB')
      return
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, JPEG, PNG, and PDF files are allowed')
      return
    }
    
    if (side === 'front') {
      frontDocument.value = file
    } else {
      backDocument.value = file
    }
  }
}

const handleDrop = (side, event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    handleFileUpload(side, { target: { files: [file] } })
  }
  if (side === 'front') isDraggingFront.value = false
  else isDraggingBack.value = false
}

const removeDocument = (side) => {
  if (side === 'front') {
    frontDocument.value = null
  } else {
    backDocument.value = null
  }
}

const viewDocument = (side) => {
  const file = side === 'front' ? frontDocument.value : backDocument.value
  if (file) {
    // Create a temporary URL for the file and open it
    const url = URL.createObjectURL(file)
    window.open(url, '_blank')
    // Clean up the URL after a short delay
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
}

const getFileIcon = (type) => {
  if (type.includes('pdf')) return 'picture_as_pdf'
  if (type.includes('image')) return 'image'
  return 'insert_drive_file'
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i]
}

const uploadDocument = async (side) => {
  if (!selectedDocType.value) {
    toast.error('Please select a document type first')
    return
  }

  const file = side === 'front' ? frontDocument.value : backDocument.value
  if (!file) {
    toast.error('Please select a file to upload')
    return
  }

  isUploading.value = true
  uploadingSide.value = side

  try {
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('document', file)
    formData.append('target', side)
    formData.append('means_id', selectedDocType.value.id)

    const response = await $fetch('/api/upload-means-of-id', {
      method: 'POST',
      body: formData
    })

    // Success
    // toast.success(`${side === 'front' ? 'Front' : 'Back'} document uploaded successfully!`)
     const apiMessage = response.data?.message || response.message || 'Document uploaded successfully'
    toast.success(apiMessage)
    
    // Reset the uploaded document
    if (side === 'front') {
      frontDocument.value = null
    } else {
      backDocument.value = null
    }

  } catch (error) {
    console.error('Upload error:', error)
    toast.error(error.statusMessage || error.message || 'Failed to upload document. Please try again.')
  } finally {
    isUploading.value = false
    uploadingSide.value = ''
  }
}

// Legacy method (if needed for compatibility)
const submitKYC = async () => {
  // This method can be removed if not needed anymore
  // or kept for backward compatibility
  console.warn('submitKYC is deprecated, use individual upload buttons instead')
}
</script>