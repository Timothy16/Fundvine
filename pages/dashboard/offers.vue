// pages/dashboard/index.vue
<template>
    <NuxtLayout name="dashboard">
        <div class="p-6">
           

            <!-- Hero Section -->
            <div class="bg-[#1a3c6d] rounded-lg p-8 text-white mb-8">
            <h2 class="text-2xl font-semibold mb-4">Explore, Invest, and Own: A Smarter and More Efficient Subscription Experience</h2>
            <button class="bg-white text-[#1a3c6d] px-6 py-2 rounded-lg flex items-center">
                Explore our offers
                <span class="material-icons ml-2">arrow_forward</span>
            </button>
            </div>

            <!-- Available Offers -->
            <div>
            <h3 class="text-xl font-semibold mb-6">Available Offers</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <!-- UBA Offer Card -->
                <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex justify-between items-start mb-6">
                    <div class="flex items-center">
                    <img src="/images/flag.svg" alt="UBA" class="h-8 mr-3" />
                    <div>
                        <h4 class="font-medium">Fundvine Money Market Fund</h4>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Rights Issue
                        </span>
                    </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                    <p class="text-sm text-gray-600">DEAL SIZE</p>
                    <p class="font-medium">6,839,884,274</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">UNIT PRICE</p>
                    <p class="font-medium">₦35.00</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">RIGHTS LAUNCH DATE</p>
                    <p class="font-medium">Nov 15, 2024</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">RIGHTS CLOSING DATE</p>
                    <p class="font-medium">Dec 24, 2024</p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button class="flex-1 px-4 py-2 border border-[#1a3c6d] text-[#1a3c6d] rounded-lg">
                    View offer details
                    </button>
                    <button class="flex-1 px-4 py-2 bg-[#1a3c6d] text-white rounded-lg">
                    Buy Now →
                    </button>
                </div>
                </div>

                <!-- FBN Offer Card - Similar structure -->
                <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="flex justify-between items-start mb-6">
                    <div class="flex items-center">
                        <img src="/images/flag.svg" alt="UBA" class="h-8 mr-3" />
                    <div>
                        <h4 class="font-medium">FBN Holdings Rights Issue</h4>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Rights Issue
                        </span>
                    </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                    <p class="text-sm text-gray-600">DEAL SIZE</p>
                    <p class="font-medium">5,982,548,799</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">UNIT PRICE</p>
                    <p class="font-medium">₦25.00</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">RIGHTS LAUNCH DATE</p>
                    <p class="font-medium">Nov 04, 2024</p>
                    </div>
                    <div>
                    <p class="text-sm text-gray-600">RIGHTS CLOSING DATE</p>
                    <p class="font-medium">Dec 12, 2024</p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button class="flex-1 px-4 py-2 border border-[#1a3c6d] text-[#1a3c6d] rounded-lg">
                    View offer details
                    </button>
                    <button class="flex-1 px-4 py-2 bg-[#1a3c6d] text-white rounded-lg">
                    Buy Now →
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>

</script>
