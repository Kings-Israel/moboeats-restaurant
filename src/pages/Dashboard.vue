<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-if="role == 'restaurant'">
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/users">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Partner Branches</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ stats.restaurants_count }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/">
                    <div class="flex items-center justify-center">
                      <span>View Branches</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="role == 'restaurant employee'">
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Partner Info</h2>
                </header>
                <div class="flex gap-2 p-3">
                  <img :src="restaurant.logo ? restaurant.logo : '../../src/images/icon-01.svg'" :alt="restaurant.name" class="rounded-full w-14 h-14 object-contain" />
                  <div class="flex flex-col space-y-2">
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100 w-[96%]"><span>Name:</span><strong class="text-ellipsis overflow-hidden">{{ restaurant.name }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100 w-[96%]"><span>Email:</span><strong class="text-ellipsis overflow-hidden">{{ restaurant.email }}</strong></h1>
                    <h1 class="flex gap-2 font-bold text-slate-800 dark:text-slate-100 w-[96%]"><span>Phone No.:</span><strong class="text-ellipsis overflow-hidden">{{ restaurant.phone_no }}</strong></h1>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div>
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Orders</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ stats.orders_count }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/">
                    <div class="flex items-center justify-center">
                      <span>View Orders</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Delivered Orders</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ stats.delivered_orders_count }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/orders">
                    <div class="flex items-center justify-center">
                      <span>View Orders</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex flex-col h-full">
                <div class="grow p-5">
                  <header>
                    <div class="flex justify-center mb-2">
                      <div class="absolute top-0 right-0 -mr-2 bg-white dark:bg-slate-700 rounded-full shadow" aria-hidden="true" to="/">
                        <svg class="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                          <path d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center">
                      <h2 class="text-xl leading-snug justify-center font-semibold">Revenue</h2>
                    </div>
                    <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(stats.revenue) }}</span></div>
                  </header>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700">
                  <router-link class="block text-center text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-3 py-4" to="/">
                    <div class="flex items-center justify-center">
                      <span>View Payments</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full lg:max-w-9xl mx-auto">
          <Payments v-if="paymentsData.labels.length > 0" :data="paymentsData" :deliveries="deliveriesPaymentsData" :dineins="dineinPaymentsData" />
          <br>
          <Orders v-if="ordersData.labels.length > 0" :data="ordersData" />
          <br>
          <!-- Cards -->
          <span class="font-bold text-xl">Top 3 Performing Branches</span>
          <div v-if="role == 'restaurant' && top_restaurants.length" class="grid grid-cols-12 gap-6 mb-4">
            <TopRestaurantDetail v-for="restaurant in top_restaurants" :key="restaurant.id" :restaurant="restaurant" :calculate-total-amount="calculateTotalPaymentPerRestaurant" />
          </div>
          <div class="md:grid md:grid-cols-12 gap-6 space-y-3">
            <!-- Top Menu Items -->
            <PopularMenus v-if="popular_menus.length" :top-menu-items="popular_menus" />
            <div class="col-span-full lg:col-span-4 ">
              <span class="font-bold text-xl">Latest Promo Codes</span>
              <table class="table-auto w-full dark:text-slate-300 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <!-- Table header -->
                <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th class="p-2">
                      <div class="font-semibold text-left">Code</div>
                    </th>
                    <th class="p-2">
                      <div class="font-semibold text-left">Orders</div>
                    </th>
                    <th class="p-2">
                      <div class="font-semibold text-left">Added On</div>
                    </th>
                  </tr>
                </thead>
                <!-- Table body -->
                <tbody class="text-sm font-medium divide-slate-100 dark:divide-slate-700">
                  <!-- Row -->
                  <tr v-for="item in discounts" :key="item.id">
                    <td class="p-2">
                      <div class="">
                        <div class="text-slate-800 dark:text-slate-100">{{ item.code }}</div>
                      </div>
                    </td>
                    <td class="p-2">
                      <div class="">
                        <div class="text-slate-800 dark:text-slate-100">{{ item.orders_count }}</div>
                      </div>
                    </td>
                    <td class="p-2">
                      <div class="">
                        <div class="text-slate-800 dark:text-slate-100">{{ moment(item.created_at).format('DD MMM YYYY') }}</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="stats" class="border border-slate-800 rounded-lg col-span-full lg:col-span-8 bg-slate-700 p-3 lg:flex lg:justify-between h-fit">
              <h3 class="text-xl font-semibold text-slate-300 border-b-2">Branches Status</h3>
              <div class="lg:flex lg:justify-between gap-3 my-auto">
                <span class="text-slate-300 font-bold">Approved Branches: </span>
                <span class="text-emerald-400 font-extrabold">{{ stats.approved_restaurants }}</span>
              </div>

              <div class="lg:flex lg:justify-between gap-3 my-auto">
                <span class="text-indigo-300 font-bold">Pending Branches: </span>
                <span class="text-yellow-400 font-extrabold">{{ stats.pending_approvals }}</span>
              </div>

              <div class="lg:flex lg:justify-between gap-3 my-auto">
                <span class="text-red-200 font-bold">Denied Branches: </span>
                <span class="text-red-500 font-extrabold">{{ stats.denied_restaurants }}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import { ref, inject, onMounted } from 'vue'
import { formatValue } from '../utils/Utils'
import { useToast } from 'vue-toastification'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import DashboardAvatars from '../partials/dashboard/DashboardAvatars.vue'
import FilterButton from '../components/DropdownFilter.vue'
import Datepicker from '../components/Datepicker.vue'

import PopularMenus from '../partials/dashboard/PopularMenus.vue'
import TopRestaurantDetail from '../partials/dashboard/TopRestaurantDetail.vue'
import Payments from '../partials/dashboard/Payments.vue'
import Orders from '../partials/dashboard/Orders.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Header,
    DashboardAvatars,
    FilterButton,
    Datepicker,
    
    TopRestaurantDetail,
    PopularMenus,
    Payments,
    Orders,
  },
  setup() {
    const $http = inject('$http')
    const toast = useToast()
    const sidebarOpen = ref(false)
    const stats = ref({})
    const popular_menus = ref([])
    const top_restaurants = ref([])

    const discounts = ref([])

    const role = ref('')
    const restaurant = ref({})

    let paymentsData = { labels: [], data: []}
    let deliveriesPaymentsData = { labels: [], data: []}
    let dineinPaymentsData = { labels: [], data: []}
    let ordersData = { labels: [], data: []}

    onMounted(() => {
      role.value = localStorage.getItem('role')
      if (role.value == 'restaurant employee') {
        restaurant.value = JSON.parse(localStorage.getItem('restaurant'))
      }
      $http.get('/restaurant/dashboard')
        .then(response => {
          stats.value = {
            'restaurants_count': response.data.data.restaurants_count,
            'orders_count': response.data.data.orders_count,
            'delivered_orders_count': response.data.data.delivered_orders_count,
            'revenue': response.data.data.revenue,
            'pending_approvals': response.data.data.pending_approval,
            'approved_restaurants': response.data.data.approved_restaurants,
            'denied_restaurants': response.data.data.rejected_restaurants
          }
          paymentsData.labels = response.data.data.months
          ordersData.labels = response.data.data.months
          paymentsData.data = response.data.data.payments_series
          deliveriesPaymentsData.data = response.data.data.delivery_payment_series
          dineinPaymentsData.data = response.data.data.booking_payment_series
          paymentsData.data = response.data.data.payments_series
          ordersData.data = response.data.data.orders_series
          popular_menus.value = response.data.data.popular_menus
          top_restaurants.value = response.data.data.top_restaurants
          discounts.value = response.data.data.latest_discounts
        })
        .catch(error => {
          console.log(error.message)
        })
    })

    const calculateTotalPaymentPerRestaurant = (restaurant) => {
      let total = 0
      let delivery_fee = 0
      restaurant.orders.forEach(order => {
        if (order.status == 'Delivered') {
          if (order.payment) {
            total += Number(order.payment.amount)
          }
          if (order.delivery_fee) {
            delivery_fee += Number(order.delivery_fee)
          }
        }
      })
      return total - delivery_fee
    }

    return {
      moment,
      sidebarOpen,
      role,
      restaurant,
      formatValue,
      stats,
      top_restaurants,
      popular_menus,
      paymentsData,
      deliveriesPaymentsData,
      dineinPaymentsData,
      ordersData,
      discounts,
      calculateTotalPaymentPerRestaurant,
    }  
  }
}
</script>