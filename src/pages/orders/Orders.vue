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

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0 col-span-2">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Orders ✨</h1>
            </div>

            <!-- Action Buttons -->
            <button class="bg-emerald-600 px-4 py-1 col-span-1 text-slate-50 font-semibold rounded-full justify-end w-60" @click="exportOrders()">Export Orders</button>
          </div>
          <div class="md:grid md:grid-cols-5 gap-2 mb-2">
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
            <button class="bg-red-500 text-white rounded-full w-full mt-2 md:mt-0 md:col-span-1 h-fit py-1 my-auto" @click="search = '', from_created_at = '', to_created_at = ''">Clear Fields</button>
          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <!-- <header class="px-5 py-4 bg-slate-50">
              <h2 class="font-semibold text-slate-800">All Orders <span class="text-slate-400 dark:text-slate-500 font-medium">{{ orders.length }}</span></h2>
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
                        <div class="font-semibold text-left">User</div>
                      </th>
                      <th v-if="role == 'restaurant'" class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Restaurant</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Amount</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Status</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Stage</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Location</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">Ordered On</div>
                      </th>
                      <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left"></div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm divide-y bg-slate-50 divide-slate-200 dark:divide-slate-700">
                    <tr v-for="order in orders" :key="order.id">
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left text-slate-700 font-bold">{{order.orderId}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left text-slate-700 font-semibold">{{order.user.name}}</div>
                      </td>
                      <td v-if="role == 'restaurant'" class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <router-link class="text-left font-medium text-sky-700 hover:text-sky-500" :to="{ name: 'restaurant-details', params: { id: order.restaurant.uuid } }">{{ order.restaurant.attributes.name }}</router-link>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left font-medium text-emerald-500">{{formatValue(order.total_amount - order.delivery_fee, order.country)}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div :class="'text-center rounded-xl px-2 '+resolveOrderStatus(order.status)">{{order.status}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div :class="'text-center rounded-xl px-2 '+resolveOrderStageStyle(resolveOrderStage(order.status))">{{resolveOrderStage(order.status)}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left text-slate-700">{{order.location}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-left text-slate-700">{{moment(order.created_at).format('D MMM Y')}}</div>
                      </td>
                      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px space-x-2">
                        <button v-if="order.status == 'Pending'" class="btn bg-teal-300 hover:bg-teal-600 text-black btn-sm" @click="updateOrder(order, '2')">Accept</button>
                        <button v-if="order.status == 'Pending'" class="btn bg-red-300 hover:bg-red-600 text-black btn-sm" @click="updateOrder(order, '0')">Reject</button>
                        <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm" :to="{ name: 'order-details', params: { id: order.uuid }}">View</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-8">
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
import  { useToast } from 'vue-toastification'

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

    const role = ref('')

    const toast = useToast()

    let search = ref('')

    let from_created_at = ref('')
    let to_created_at = ref('')

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected
    }

    const orders = ref([])

    const getOrderId = (order) => {
      return order.uuid.split('-')[0].toUpperCase()
    }

    const exportOrders = () => {
      $http.get('/restaurant/orders/export/data?delivery=1&search='+search.value+'&from_created_at='+from_created_at.value+'&to_created_at='+to_created_at.value,
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
            `Orders.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    const getOrders = () => {
      $http.get('/restaurant/orders?delivery=1')
        .then(response => {
          orders.value = []
          pagesLinks.value = []
          nextPageUrl.value = response.data.links.next
          lastPageUrl.value = response.data.links.last
          prevPageUrl.value = response.data.links.prev
          totalItems.value = response.data.meta.total
          from.value = response.data.meta.from
          to.value = response.data.meta.to
          response.data.meta.links.forEach(link => {
            pagesLinks.value.push(link)
          })
          response.data.data.forEach(order => {
            orders.value.push({
              id: order.id,
              uuid: order.uuid,
              user: order.relationships.user,
              restaurant: order.relationships.restaurant,
              total_amount: order.attributes.totalAmount,
              delivery_fee: order.attributes.deliveryFee,
              delivery_status: order.attributes.deliveryStatus,
              status: order.attributes.status,
              orderId: getOrderId(order),
              location: order.attributes.deliveryAddress,
              created_at: order.attributes.createdAt,
            })
          })
        })
    }

    onMounted(() => {
      getOrders()
      role.value = localStorage.getItem('role')
    })

    const updateOrder = (order, status) => {
      $http.post('/restaurant/orders/' + order.uuid + '/update', {
        status: status
      })
      .then(() => {
        getOrders()
        toast.success('Order status updated successfully')
      })
    }

    const resolveOrderStatus = (status) => {
      switch (status) {
        case 'Pending':
          return 'text-gray-100 bg-gray-500'
          break;
        case 'In Progress':
          return 'text-blue-100 bg-blue-500'
          break;
        case 'Delivered':
          return 'text-green-100 bg-green-500'
          break;
        case 'Awating Pick Up':
          return 'text-emarald-100 bg-emarald-500'
          break;
        case 'On Delivery':
          return 'text-gray-900 bg-yellow-200'
          break;
        case 'Denied':
          return 'text-red-100 bg-red-500'
          break;
        default:
          return 'text-gray-100 bg-gray-500'
          break;
      }
    }

    const resolveOrderStage = (status) => {
      switch (status) {
        case 'Pending':
          return 'Processing'
          break;
        case 'In Progress':
          return 'Processing'
          break;
        case 'Awaiting Pick Up':
          return 'Driver Waiting Pick Up'
          break;
        case 'On Delivery':
          return 'Driver Confirmed'
        case 'Delivered':
          return 'Delivered'
          break;
        default:
          return 'Processing'
          break;
      }
    }

    const resolveOrderStageStyle = (status) => {
      switch (status) {
        case 'Processing':
          return 'text-gray-100 bg-blue-500'
          break;
        case 'Driver Confirmed':
          return 'text-green-100 bg-green-500'
          break;
        case 'Driver Waiting Pick Up':
          return 'text-emarald-100 bg-emarald-500'
          break;
        case 'Driver Confirmed':
          return 'text-gray-900 bg-yellow-200'
          break;
        case 'Delivered':
          return 'text-green-100 bg-green-500'
          break;
        default:
          return 'text-gray-100 bg-gray-500'
          break;
      }
    }

    function changePage(page) {
      $http.get(page)
        .then(response => {
          nextPageUrl.value = response.data.links.next
          lastPageUrl.value = response.data.links.last
          prevPageUrl.value = response.data.links.prev
          totalItems.value = response.data.meta.total
          from.value = response.data.meta.from
          to.value = response.data.meta.to
          orders.value = []
          pagesLinks.value = []
          response.data.meta.links.forEach(link => {
            pagesLinks.value.push(link)
          })
          response.data.data.forEach(order => {
            orders.value.push({
              id: order.id,
              uuid: order.uuid,
              user: order.relationships.user,
              restaurant: order.relationships.restaurant,
              total_amount: order.attributes.totalAmount,
              delivery_status: order.attributes.deliveryStatus,
              status: order.attributes.status,
              orderId: getOrderId(order),
              location: order.attributes.deliveryAddress,
              created_at: order.attributes.createdAt,
            })
          })
        })
    }

    watch(search, async (newSearch, oldQuestion) => {
      $http.get('/restaurant/orders?search='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.links.next
          lastPageUrl.value = response.data.links.last
          prevPageUrl.value = response.data.links.prev
          totalItems.value = response.data.meta.total
          from.value = response.data.meta.from
          to.value = response.data.meta.to
          orders.value = []
          pagesLinks.value = []
          response.data.meta.links.forEach(link => {
            pagesLinks.value.push(link)
          })
          response.data.data.forEach(order => {
            orders.value.push({
              id: order.id,
              uuid: order.uuid,
              user: order.relationships.user,
              restaurant: order.relationships.restaurant,
              total_amount: order.attributes.totalAmount,
              delivery_status: order.attributes.deliveryStatus,
              status: order.attributes.status,
              orderId: getOrderId(order),
              location: order.attributes.deliveryAddress,
              created_at: order.attributes.createdAt,
            })
          })
        })
    })

    watch(from_created_at, async (newSearch, oldQuestion) => {
      $http.get('/restaurant/orders?delivery=1&from_created_at='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.links.next
          lastPageUrl.value = response.data.links.last
          prevPageUrl.value = response.data.links.prev
          totalItems.value = response.data.meta.total
          from.value = response.data.meta.from
          to.value = response.data.meta.to
          orders.value = []
          pagesLinks.value = []
          response.data.meta.links.forEach(link => {
            pagesLinks.value.push(link)
          })
          response.data.data.forEach(order => {
            orders.value.push({
              id: order.id,
              uuid: order.uuid,
              user: order.relationships.user,
              restaurant: order.relationships.restaurant,
              total_amount: order.attributes.totalAmount,
              delivery_status: order.attributes.deliveryStatus,
              status: order.attributes.status,
              orderId: getOrderId(order),
              location: order.attributes.deliveryAddress,
              created_at: order.attributes.createdAt,
            })
          })
        })
    })

    watch(to_created_at, async (newSearch, oldQuestion) => {
      $http.get('/restaurant/orders?delivery=1&to_created_at='+newSearch)
        .then(response => {
          nextPageUrl.value = response.data.links.next
          lastPageUrl.value = response.data.links.last
          prevPageUrl.value = response.data.links.prev
          totalItems.value = response.data.meta.total
          from.value = response.data.meta.from
          to.value = response.data.meta.to
          orders.value = []
          pagesLinks.value = []
          response.data.meta.links.forEach(link => {
            pagesLinks.value.push(link)
          })
          response.data.data.forEach(order => {
            orders.value.push({
              id: order.id,
              uuid: order.uuid,
              user: order.relationships.user,
              restaurant: order.relationships.restaurant,
              total_amount: order.attributes.totalAmount,
              delivery_status: order.attributes.deliveryStatus,
              status: order.attributes.status,
              orderId: getOrderId(order),
              location: order.attributes.deliveryAddress,
              created_at: order.attributes.createdAt,
            })
          })
        })
    })

    return {
      role,
      moment,
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      orders,
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
      formatValue,

      updateOrder,

      resolveOrderStatus,
      resolveOrderStage,
      resolveOrderStageStyle,
      exportOrders,
    }  
  }
}
</script>