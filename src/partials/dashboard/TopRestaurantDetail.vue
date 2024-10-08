<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <div class="px-5 pt-5">
      <header class="flex justify-between items-start mb-2">
        <!-- Icon -->
        <img :src="restaurant.logo ? restaurant.logo : '../../src/images/icon-01.svg'" width="38" height="38" :alt="restaurant.name" class="rounded-full" />
        <EditMenu align="right" class="relative inline-flex">
          <li>
            <router-link class="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" :to="{name: 'restaurant-details', params: {id: restaurant.uuid}}">View</router-link>
          </li>
          <li>
            <a class="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" href="#0">Disable</a>
          </li>
        </EditMenu>
      </header>
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">{{ restaurant.name }}</h2>
      <!-- <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">Sales</div> -->
      <div class="flex items-start">
        <div class="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">{{ formatValue(calculateTotalAmount(restaurant, restaurant.country)) }}</div>
        <!-- <div class="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div> -->
      </div>
    </div>
    <div class="ml-4 -mb-2">
      <span class="text-slate-600 dark:text-slate-400 text-sm">Earnings(Past 12 Months)</span>
    </div>
    <!-- Chart built with Chart.js 3 -->
    <div class="grow max-sm:max-h-[138px] xl:max-h-[138px]">
      <LineChart :data="chartData" width="389" height="128" />
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import LineChart from '../../charts/LineChart01.vue'
import EditMenu from '../../components/DropdownEditMenu.vue'
import { formatValue } from '../../utils/Utils'

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils'

export default {
  name: 'TopRestaurantDetail',
  components: {
    LineChart,
    EditMenu,
  },
  props: {
    restaurant: {
      type: Object
    },
    calculateTotalAmount: {
      type: Function
    }
  },
  setup(props) {
    const $http = inject('$http')
    const chartData = ref({
      labels: props.restaurant.payments.labels,
      datasets: [
        // Indigo line
        {
          data: props.restaurant.payments.amounts,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.indigo[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,          
          clip: 20,
        },
      ],
    })

    const restaurant = ref(props.restaurant)

    const calculateTotalAmount = props.calculateTotalAmount

    const getLogo = (logo) => {
      return $http.get('../../storage/'+logo)
    }

    return {
      formatValue,
      chartData,
      restaurant,
      calculateTotalAmount,
      getLogo
    } 
  }
}
</script>