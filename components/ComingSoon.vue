<!-- components/ComingSoon.vue -->
<template>
  <div class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
    <!-- Animated Icon -->
    <div class="mb-8 relative">
      <div class="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
       <i 
            :class="getIconClass()"
            class="text-white text-5xl"
        ></i>
      </div>
      <!-- Features Preview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div class="text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              
              <i 
                :class="getFeatureIconClass(feature.icon)"
                class="w-6 h-6 text-blue-600"
            ></i>
            </div>
            <h3 class="font-semibold text-gray-800 mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>


      <!-- Back to Dashboard -->
      <div class="mt-6">
        <NuxtLink 
          to="/dashboard" 
          class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-300"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Dashboard
        </NuxtLink>
      </div>
    </div>

    <!-- Background decoration -->
    <div class="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
    <div class="absolute bottom-10 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-float" style="animation-delay: 1s"></div>
    <div class="absolute top-1/2 left-20 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-float" style="animation-delay: 2s"></div>
  </div>
</template>

<script setup>
// Props for customization
const props = defineProps({
  pageType: {
    type: String,
    required: true,
    validator: (value) => ['mutual-funds', 'loans', 'equity-market'].includes(value)
  }
})

// Configuration for different page types
const pageConfig = {
  'mutual-funds': {
    title: 'Savings Plan',
    description: 'Build your financial future with our comprehensive savings plans. Set goals, track progress, and watch your money grow with competitive interest rates.',
    icon: 'PiggyBankIcon',
    features: [
      {
        title: 'Goal Setting',
        description: 'Set and track multiple savings goals',
        icon: 'TargetIcon'
      },
      {
        title: 'Auto-Save',
        description: 'Automated savings transfers',
        icon: 'ClockIcon'
      },
      {
        title: 'High Interest',
        description: 'Competitive interest rates',
        icon: 'TrendingUpIcon'
      }
    ]
  },
  'loans': {
    title: 'Loans',
    description: 'Access flexible loan options tailored to your needs. Quick approval, competitive rates, and transparent terms for personal and business loans.',
    icon: 'CreditCardIcon',
    features: [
      {
        title: 'Quick Approval',
        description: 'Fast loan processing and approval',
        icon: 'CheckCircleIcon'
      },
      {
        title: 'Flexible Terms',
        description: 'Customizable repayment options',
        icon: 'AdjustmentsIcon'
      },
      {
        title: 'Low Rates',
        description: 'Competitive interest rates',
        icon: 'PercentIcon'
      }
    ]
  },
  'equity-market': {
    title: 'Equity Market',
    description: 'Dive into the world of stock trading and investments. Real-time market data, expert insights, and powerful trading tools at your fingertips.',
    icon: 'ChartBarIcon',
    features: [
      {
        title: 'Real-time Data',
        description: 'Live market prices and charts',
        icon: 'ChartLineIcon'
      },
      {
        title: 'Expert Analysis',
        description: 'Professional market insights',
        icon: 'AcademicCapIcon'
      },
      {
        title: 'Portfolio Tools',
        description: 'Advanced portfolio management',
        icon: 'BriefcaseIcon'
      }
    ]
  }
}

// Get current page configuration
const config = computed(() => pageConfig[props.pageType])
const title = computed(() => config.value.title)
const description = computed(() => config.value.description)
const features = computed(() => config.value.features)

const getIconClass = () => {
  switch (props.pageType) {
    case 'mutual-funds':
      return 'fa fa-piggy-bank'
    case 'loans':
      return 'fa fa-hand-holding-usd'
    case 'equity-market':
      return 'fa fa-chart-line'
    default:
      return 'fa fa-cog'
  }
}

const getFeatureIconClass = (iconName) => {
  const iconMap = {
    'TargetIcon': 'fas fa-bullseye',
    'ClockIcon': 'fas fa-clock',
    'TrendingUpIcon': 'fas fa-arrow-trend-up',
    'CheckCircleIcon': 'fas fa-check-circle',
    'AdjustmentsIcon': 'fas fa-sliders-h',
    'PercentIcon': 'fas fa-percentage',
    'ChartLineIcon': 'fas fa-chart-line',
    'AcademicCapIcon': 'fas fa-graduation-cap',
    'BriefcaseIcon': 'fas fa-briefcase'
  }
  return iconMap[iconName] || 'fas fa-circle'
}


</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style> 