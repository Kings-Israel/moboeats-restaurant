<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div class="grid md:grid-cols-4 gap-4">
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
                        <h2 class="text-xl leading-snug justify-center font-semibold">Total Amount</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(total_amount, country) }}</span></div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
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
                        <h2 class="text-xl leading-snug justify-center font-semibold">Paid Out Amount</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(paid_amount, country) }}</span></div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
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
                        <h2 class="text-xl leading-snug justify-center font-semibold">Unpaid Amount</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-sm font-medium text-slate-400 -mt-0.5 mr-1"></span> <span>{{ formatValue(unpaid_amount, country) }}</span></div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Payments ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <button class="bg-emerald-600 py-1 col-span-1 text-slate-50 font-semibold rounded-full justify-end px-4" @click="exportPayments()">Export Payments</button>
          </div>

          <div class="grid md:grid-cols-5 gap-2 mb-2">
            <form class="relative w-full col-span-2">
              <label for="action-search" class="">Search</label>
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full" type="search" v-model="search" placeholder="Search Orders, Users, Restaurants" />
              <button class="absolute inset-0 top-6 right-auto group" type="submit" aria-label="Search">
                <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            <form class="relative w-full col-span-1">
              <label for="action-search" class="">From Date</label>
              <input type="date" id="action-search" class="form-input bg-white dark:bg-slate-800 w-full" v-model="from_created_at" />
            </form>
            <form class="relative w-full col-span-1">
              <label for="action-search" class="">To Date</label>
              <input type="date" id="action-search" class="form-input bg-white dark:bg-slate-800 w-full" v-model="to_created_at" />
            </form>
            <button class="bg-red-500 text-white rounded-full col-span-1 h-fit py-1 my-auto" @click="search = '', from_created_at = '', to_created_at = ''">Clear Fields</button>
          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <!-- <header class="px-5 py-4">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Payments <span class="text-slate-400 dark:text-slate-500 font-medium">{{ payments.length }}</span></h2>
            </header> -->
            <div>
              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                  <!-- Table header -->
                  <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Order ID</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Transaction ID</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">User</div>
                      </th>
                      <th v-if="role == 'restaurant'" class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Restaurant</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Amount</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Paid</div>
                      </th>
                      <!-- <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Actions</div>
                      </th> -->
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y bg-slate-50 divide-slate-200 dark:divide-slate-700">
                    <tr v-for="payment in payments" :key="payment.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <router-link :to="{ name: 'order-details', params: { id: payment.orderable.uuid }}" class="text-left text-slate-700 font-bold hover:text-slate-500">{{getOrderId(payment.orderable)}}</router-link>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left text-slate-800 font-bold">{{payment.transaction_id}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left text-slate-700 font-semibold">{{payment.orderable.user.name}}</div>
                      </td>
                      <td v-if="role == 'restaurant'" class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <router-link :to="{ name: 'restaurant-details', params: { id: payment.orderable.restaurant.uuid }}" class="text-left text-sky-700 font-semibold">{{payment.orderable.restaurant.name}}</router-link>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left text-emerald-700 font-semibold">{{formatValue(payment.orderable.total_amount - payment.orderable.delivery_fee, payment.orderable.country)}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left text-slate-700 font-semibold">{{moment(payment.created_at).format('Do MMMM Y')}}</div>
                      </td>
                      <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm" :to="{ name: 'order-details', params: { id: payment.uuid }}">View</router-link>
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="my-3 px-2">
            <PaginationClassic @change-page="changePage" :next_page="nextPageUrl" :prev_page="prevPageUrl" :from="from" :to="to" :total_items="totalItems" />
          </div>          
        </div>
      </main>
    </div> 
  </div>
</template>

<script>
import moment from 'moment';
import { ref, onMounted, inject, watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import CustomersTable from '../../partials/customers/CustomersTable.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import { formatValue } from '../../utils/Utils'

export default {
  name: 'Orders',
  components: {
    Sidebar,
    Header,
    CustomersTable,
    PaginationClassic,
  },
  setup() {
    const $http = inject("$http")
    const sidebarOpen = ref(false)
    const selectedItems = ref([])
    const nextPageUrl = ref('')
    const lastPageUrl = ref('')
    const prevPageUrl = ref('')
    const pagesLinks = ref([])
    const from = ref(0)
    const to = ref(0)
    const totalItems = ref(0)

    const paid_amount = ref(0)
    const unpaid_amount = ref(0)
    const total_amount = ref(0)

    let search = ref('')

    let from_created_at = ref('')
    let to_created_at = ref('')

    const role = ref('')

    const country = ref('')

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const payments = ref([])

    const getOrderId = (order) => {
      return order.uuid.split('-')[0].toUpperCase()
    }

    const exportPayments = () => {
      $http.get('/restaurant/payments/export/data?search='+search.value+'&from_created_at='+from_created_at.value+'&to_created_at='+to_created_at.value,
          {
            responseType: 'arraybuffer',
            method: 'GET'
          }
      )
        .then(response => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]))
          const fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute(
            'download',
            `Payments.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    onMounted(() => {
      role.value = localStorage.getItem("role")
      $http.get('/restaurant/payments')
        .then(response => {
          nextPageUrl.value = response.data.data.payments.next_page_url
          lastPageUrl.value = response.data.data.payments.last_page_url
          prevPageUrl.value = response.data.data.payments.prev_page_url
          totalItems.value = response.data.data.payments.total
          from.value = response.data.data.payments.from
          to.value = response.data.data.payments.to
          // response.data.meta.links.forEach(link => {
          //   pagesLinks.value.push(link)
          // })
          payments.value = response.data.data.payments.data
          paid_amount.value = response.data.data.paid_amount
          unpaid_amount.value = response.data.data.unpaid_amount
          total_amount.value = response.data.data.total_amount
        })
    })

    function changePage(page) {
      $http.get(page)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          payments.value = []
          pagesLinks.value = []
          // response.data.meta.links.forEach(link => {
          //   pagesLinks.value.push(link)
          // })
          payments.value = response.data.data.data
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/restaurant/payments?search='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          payments.value = []
          pagesLinks.value = []
          // response.data.meta.links.forEach(link => {
          //   pagesLinks.value.push(link)
          // })
          payments.value = response.data.data.data
          paid_amount.value = response.data.data.paid_amount
          unpaid_amount.value = response.data.data.unpaid_amount
          total_amount.value = response.data.data.total_amount
          country.value = response.data.data.country
        })
    })

    watch(from_created_at, async (newSearch, oldQuestion) => {
      $http.get('/restaurant/payments?from_created_at='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          payments.value = []
          pagesLinks.value = []
          // response.data.meta.links.forEach(link => {
          //   pagesLinks.value.push(link)
          // })
          payments.value = response.data.data.data
          paid_amount.value = response.data.data.paid_amount
          unpaid_amount.value = response.data.data.unpaid_amount
          total_amount.value = response.data.data.total_amount
        })
    })

    watch(to_created_at, async (newSearch, oldQuestion) => {
      $http.get('/restaurant/payments?to_created_at='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.data.next_page_url
          lastPageUrl.value = response.data.data.last_page_url
          prevPageUrl.value = response.data.data.prev_page_url
          totalItems.value = response.data.data.total
          from.value = response.data.data.from
          to.value = response.data.data.to
          payments.value = []
          pagesLinks.value = []
          // response.data.meta.links.forEach(link => {
          //   pagesLinks.value.push(link)
          // })
          payments.value = response.data.data.data
          paid_amount.value = response.data.data.paid_amount
          unpaid_amount.value = response.data.data.unpaid_amount
          total_amount.value = response.data.data.total_amount
        })
    })

    return {
      role,
      moment,
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      payments,
      nextPageUrl,
      prevPageUrl,
      lastPageUrl,
      totalItems,
      from,
      to,
      changePage,
      search,
      from_created_at,
      to_created_at,
      country,
      formatValue,
      getOrderId,
      exportPayments,
      paid_amount,
      unpaid_amount,
      total_amount,
    }  
  }
}
</script>