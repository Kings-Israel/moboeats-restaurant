<template>
  <div class="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
      <h2 class="font-semibold text-2xl text-slate-800 dark:text-slate-100">Payments</h2>
    </header>
    <!-- Chart built with Chart.js 3 -->
    <div class="grow">
      <!-- Change the height attribute to adjust the chart height -->
      <LineChart :data="chartData" width="800" height="300" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import LineChart from '../../charts/LineChart03.vue'

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils'

export default {
  name: 'Payments',
  components: {
    LineChart,
  },
  props: {
    data: {
      type: Object,
      default: (() => {})
    },
    deliveries: {
      type: Object,
      default: (() => {})
    },
    dineins: {
      type: Object,
      default: (() => {})
    }
  },
  setup(props) {
    const chartData = ref({
      labels: props.data.labels,
      datasets: [
        // Indigo line
        {
          label: 'Payments',
          data: props.data.data,
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
        {
          label: 'Delivery Payments',
          data: props.deliveries.data,
          fill: false,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.slate[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.slate[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.slate[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.slate[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,          
          clip: 20,
        },
        {
          label: 'Dinein Payments',
          data: props.dineins.data,
          fill: false,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.red[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.blue[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,          
          clip: 20,
        },
      ],
    })

    return {
      chartData,
    } 
  }
}
</script>