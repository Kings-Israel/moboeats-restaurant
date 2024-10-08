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
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Promos ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-[#2E5945] p-2 col-span-1 text-slate-50 font-semibold rounded-full justify-end px-4" @click="exportPromocodes()">Export Promos</button>
              <button class="bg-[#F7C410] hover:bg-[#4f441e] p-2 text-white font-semibold rounded-full px-3 transition duration-150 ease-in-out" @click="addPromoCodeModal = true">Add Promo Codes</button>
              <modal-action :id="'addMenu'" :modal-open="addPromoCodeModal" @close-modal="addPromoCodeModal = false" :add-class="'max-w-4xl'">
                <span class="font-semibold px-4 text-xl text-slate-900">Add Promo Code to Branches</span>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around p-4" @submit.prevent="createPromoCode">
                  <div class="grid grid-cols-2 gap-2">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="title">Code</label>
                        <input id="title" class="form-input w-full rounded-lg border-2" type="text" v-model="addPromoCode" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="title">Start Date</label>
                        <input name="addPromoCodeStartDate" id="" type="date" class="form-input w-full min-h-full rounded-lg border-2" v-model="addPromoCodeStartDate" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="title">End Date</label>
                        <input name="addPromoCodeStartDate" id="" type="date" class="form-input w-full min-h-full rounded-lg border-2" v-model="addPromoCodeEndDate" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="type">Type</label>
                        <div class="flex-none flex my-auto">
                          <div class="m-3">
                            <!-- Start -->
                            <label class="flex items-center">
                              <input type="radio" name="promo-code-type" v-model="addPromoCodeType" value="amount" class="form-radio" />
                              <span class="text-sm ml-2">Amount</span>
                            </label>
                            <!-- End -->
                          </div>
    
                          <div class="m-3">
                            <!-- Start -->
                            <label class="flex items-center">
                              <input type="radio" name="promo-code-type" v-model="addPromoCodeType" value="percentage" class="form-radio" />
                              <span class="text-sm ml-2">Percentage</span>
                            </label>
                            <!-- End -->
                          </div>
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Value</label>
                        <input id="value" class="form-input w-full rounded-lg border-2" type="text" v-model="addPromoCodeValue" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="categories">
                          Branches
                          <i class="fas fa-info-circle" title="Select All Branches where the promo will apply. Press Ctrl (Command for MacOS) + Right Mouse Click to Select Multiple"></i>
                        </label>
                        <select name="categories" multiple size="8" v-model="addPromoCodeRestaurants" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">{{ restaurant.name }}</option>
                        </select>
                      </div>
                      <div class="flex-none flex my-auto">
                        <div class="m-3">
                          <!-- Start -->
                          <label class="flex items-center">
                            <input type="radio" name="menu-active" v-model="addPromoCodeStatus" value="active" class="form-radio" />
                            <span class="text-sm ml-2">Active</span>
                          </label>
                          <!-- End -->
                        </div>
  
                        <div class="m-3">
                          <!-- Start -->
                          <label class="flex items-center">
                            <input type="radio" name="menu-active" v-model="addPromoCodeStatus" value="inactive" class="form-radio" />
                            <span class="text-sm ml-2">Inactive</span>
                          </label>
                          <!-- End -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 ">
                    <button type="submit" class="btn bg-[#2E5945] hover:bg-[#1a2c23] transition duration-150 ease-in-out text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
            </div>
          </div>

          <div class="grid grid-cols-5 gap-2 mb-2">
            <form class="relative w-full col-span-2">
              <label for="action-search" class="">Search</label>
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full" type="search" v-model="promoCodeSearch" placeholder="Search Codes, Restaurants" />
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
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Promos <span class="text-slate-400 dark:text-slate-500 font-medium">{{ promo_codes.length }}</span></h2>
            </header> -->
            <div class="">
              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Code</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Branch</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Start Date</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">End Date</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Value</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Status</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Orders</div>
                        </th>
                        <th class="pr-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium bg-slate-50 divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="code in promo_codes" :key="code.id" :class="code.id === editPromoCodeId ? 'bg-slate-300 transition duration-200 ease-in-out' : 'transition duration-300 ease-in-out'">
                        <td class="p-2">
                          <div class="flex items-center">
                            <div class="text-slate-800 ml-2">{{ code.code }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <router-link :to="{name: 'restaurant-details', params: { id: code.restaurant.uuid}}" class="text-sky-800 hover:text-sky-500 font-bold">
                            {{ code.restaurant.name }}
                          </router-link>
                        </td>
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ moment(code.start_date).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2">
                          <div v-if="code.end_date" class="text-sky-700 font-semibold">{{ moment(code.end_date).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ code.type == 'amount' ? formatValue(code.value) : code.value+'%' }}</div>
                        </td>
                        <td class="p-2">
                          <div :class="code.status == 'active' ? 'text-green-700 font-semobold' : 'text-red-700 font-semibold'">{{ code.status == 'active' ? 'Active' : 'Inactive' }}</div>
                        </td>
                        <td class="p-2">
                          {{ code.orders_count }}
                        </td>
                        <td class="p-2 flex gap-2 justify-end">
                          <button class="btn btn-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" @click="editPromoCode(code)">Edit</button>
                          <button class="btn btn-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400" @click="deleteCode(code)">Delete</button>
                        </td>
                        <modal-action :id="'edit_'+code.id" :add-class="'max-w-4xl'" :modal-open="editPromoCodeModal" @close-modal="editPromoCodeModal = false">
                          <!-- Add/Edit Menu -->
                          <form class="flex flex-col justify-around" @submit.prevent="updatePromoCode">
                            <div class="grid grid-cols-2 gap-2">
                              <div class="space-y-4">
                                <div>
                                  <label class="block text-sm font-medium mb-1" for="title">Code</label>
                                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addPromoCode" />
                                </div>
                                <div>
                                  <label class="block text-sm font-medium mb-1" for="title">Start Date</label>
                                  <input name="addPromoCodeStartDate" id="" type="date" class="form-input w-full min-h-full rounded-lg" v-model="addPromoCodeStartDate" />
                                </div>
                                <div>
                                  <label class="block text-sm font-medium mb-1" for="title">End Date</label>
                                  <input name="addPromoCodeStartDate" id="" type="date" class="form-input w-full min-h-full rounded-lg" v-model="addPromoCodeEndDate" />
                                </div>
                                <div>
                                  <label class="block text-sm font-medium mb-1" for="type">Type</label>
                                  <div class="flex-none flex my-auto">
                                    <div class="m-3">
                                      <!-- Start -->
                                      <label class="flex items-center">
                                        <input type="radio" name="promo-code-type" v-model="addPromoCodeType" value="amount" class="form-radio" />
                                        <span class="text-sm ml-2">Amount</span>
                                      </label>
                                      <!-- End -->
                                    </div>
              
                                    <div class="m-3">
                                      <!-- Start -->
                                      <label class="flex items-center">
                                        <input type="radio" name="promo-code-type" v-model="addPromoCodeType" value="percentage" class="form-radio" />
                                        <span class="text-sm ml-2">Percentage</span>
                                      </label>
                                      <!-- End -->
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label class="block text-sm font-medium mb-1" for="price">Value</label>
                                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addPromoCodeValue" />
                                </div>
                              </div>
                              <div class="space-y-4">
                                <div class="flex-none flex my-auto">
                                  <div class="m-3">
                                    <!-- Start -->
                                    <label class="flex items-center">
                                      <input type="radio" name="menu-active" v-model="addPromoCodeStatus" value="active" class="form-radio" />
                                      <span class="text-sm ml-2">Active</span>
                                    </label>
                                    <!-- End -->
                                  </div>
            
                                  <div class="m-3">
                                    <!-- Start -->
                                    <label class="flex items-center">
                                      <input type="radio" name="menu-active" v-model="addPromoCodeStatus" value="inactive" class="form-radio" />
                                      <span class="text-sm ml-2">Inactive</span>
                                    </label>
                                    <!-- End -->
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="flex justify-end bottom-2 ">
                              <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                            </div>
                          </form>
                        </modal-action>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- Pagination -->
            <div class="my-4">
              <PaginationClassic @change-page="promoCodeChangePage" :next_page="nextPromoCodesPageUrl" :prev_page="prevPromoCodesPageUrl" :from="promoCodesFrom" :to="promoCodesTo" :total_items="promoCodesTotalItems" />
            </div>  
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject, watch } from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import PaginationClassic from '../../components/PaginationClassic.vue'
import PaginationNumeric from '../../components/PaginationNumeric.vue'
import { useRoute } from 'vue-router'
import moment from 'moment';
import { formatValue } from '../../utils/Utils'
import { useToast } from 'vue-toastification'
import ModalAction from '../../components/ModalAction.vue'

export default {
  name: 'PromoCodes',
  components: {
    Sidebar,
    Header,
    PaginationClassic,
    PaginationNumeric,
    ModalAction,
  },
  setup() {
    const $http = inject("$http")
    const toast = useToast()
    const router = useRoute()
    const sidebarOpen = ref(false)

    const promo_codes = ref([])
    const nextPromoCodesPageUrl = ref('')
    const prevPromoCodesPageUrl = ref('')
    const lastPromoCodesPageUrl = ref('')
    const promoCodesPagesLinks = ref([])
    const promoCodesFrom = ref(0)
    const promoCodesTo = ref(0)
    const promoCodesTotalItems = ref(0)

    let promoCodeSearch = ref('')

    let from_created_at = ref('')
    let to_created_at = ref('')

    const addPromoCode = ref('')
    const addPromoCodeStartDate = ref('')
    const addPromoCodeEndDate = ref('')
    const addPromoCodeStatus = ref('active')
    const addPromoCodeValue = ref('')
    const addPromoCodeType = ref('amount')
    const addPromoCodeRestaurants = ref([])

    const editPromoCodeId = ref('')

    const restaurants = ref([])

    const editPromoCodeModal = ref(false)

    const addPromoCodeModal = ref(false)

    const getPromoCodes = () => {
      $http.get(`/restaurant/promo-codes`)
        .then(response => {
          restaurants.value = response.data.data.restaurants
          promo_codes.value = []
          promo_codes.value = response.data.data.promo_codes.data
          nextPromoCodesPageUrl.value = response.data.data.promo_codes.next_page_url
          lastPromoCodesPageUrl.value = response.data.data.promo_codes.last_page_url
          prevPromoCodesPageUrl.value = response.data.data.promo_codes.prev_page_url
          promoCodesTotalItems.value = response.data.data.promo_codes.total
          promoCodesFrom.value = response.data.data.promo_codes.from
          promoCodesTo.value = response.data.data.promo_codes.to
          promoCodesPagesLinks.value = []
          response.data.data.promo_codes.links.forEach(link => {
            promoCodesPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    const editPromoCode = (code) => {
      editPromoCodeId.value = code.id
      addPromoCode.value = code.code
      addPromoCodeStartDate.value =  code.start_date
      addPromoCodeEndDate.value =  code.end_date ? code.end_date : null
      addPromoCodeStatus.value = code.status
      addPromoCodeType.value = code.type
      addPromoCodeValue.value = code.value
      editPromoCodeModal.value = true
    }

    const clearFields = () => {
      editPromoCodeId.value = ''

      addPromoCode.value = ''
      addPromoCodeStartDate.value = ''
      addPromoCodeStatus.value = 'active'

      addPromoCodeValue.value = ''
    }

    const createPromoCode = () => {
      const formData = new FormData()
      formData.append('code', addPromoCode.value)
      formData.append('start_date', addPromoCodeStartDate.value)
      formData.append('end_date', addPromoCodeEndDate.value)
      formData.append('status', addPromoCodeStatus.value)
      formData.append('type', addPromoCodeType.value)
      formData.append('value', addPromoCodeValue.value)
      formData.append('restaurant_ids', JSON.stringify(addPromoCodeRestaurants.value))

      $http.post(`/restaurant/promo-codes/store`, formData)
        .then(() => {
          toast.success('Promo added successfully')
          getPromoCodes()
          clearFields()
          addPromoCodeModal.value = false
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    }

    const updatePromoCode = () => {
      const formData = new FormData()
      formData.append('code', addPromoCode.value)
      formData.append('start_date', addPromoCodeStartDate.value)
      formData.append('end_date', addPromoCodeEndDate.value)
      formData.append('status', addPromoCodeStatus.value)
      formData.append('type', addPromoCodeType.value)
      formData.append('value', addPromoCodeValue.value)

      $http.post(`/restaurant/promo-codes/${editPromoCodeId.value}/update`, formData)
        .then(() => {
          toast.success('Promo updated successfully')
          getPromoCodes()
          clearFields()
          editPromoCodeModal.value = false
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    }

    const exportPromocodes = () => {
      $http.get('/restaurant/promo-codes/export/data?search='+promoCodeSearch.value+'&from_created_at='+from_created_at.value+'&to_created_at='+to_created_at.value,
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
            `Promo Codes.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    onMounted(() => {
      getPromoCodes()
    })

    watch(promoCodeSearch, async (newSearch, oldSearch) => {
      $http.get('/restaurant/promo-codes?search='+newSearch)
        .then(response => {
          promo_codes.value = []
          promo_codes.value = response.data.data.promo_codes.data
          nextPromoCodesPageUrl.value = response.data.data.promo_codes.next_page_url
          lastPromoCodesPageUrl.value = response.data.data.promo_codes.last_page_url
          prevPromoCodesPageUrl.value = response.data.data.promo_codes.prev_page_url
          promoCodesTotalItems.value = response.data.data.promo_codes.total
          promoCodesFrom.value = response.data.data.promo_codes.from
          promoCodesTo.value = response.data.data.promo_codes.to
          promoCodesPagesLinks.value = []
          response.data.data.promo_codes.links.forEach(link => {
            promoCodesPagesLinks.value.push(link)
          })
        })
    })

    
    watch(from_created_at, async (newSearch, oldQuestion) => {
      $http.get('/restaurant/promo-codes?from_created_at='+newSearch)
        .then(response => {
          promo_codes.value = []
          promo_codes.value = response.data.data.promo_codes.data
          nextPromoCodesPageUrl.value = response.data.data.promo_codes.next_page_url
          lastPromoCodesPageUrl.value = response.data.data.promo_codes.last_page_url
          prevPromoCodesPageUrl.value = response.data.data.promo_codes.prev_page_url
          promoCodesTotalItems.value = response.data.data.promo_codes.total
          promoCodesFrom.value = response.data.data.promo_codes.from
          promoCodesTo.value = response.data.data.promo_codes.to
          promoCodesPagesLinks.value = []
          response.data.data.promo_codes.links.forEach(link => {
            promoCodesPagesLinks.value.push(link)
          })
        })
    })

    watch(to_created_at, async (newSearch, oldQuestion) => {
      $http.get('/restaurant/promo-codes?to_created_at='+newSearch)
        .then(response => {
          promo_codes.value = []
          promo_codes.value = response.data.data.promo_codes.data
          nextPromoCodesPageUrl.value = response.data.data.promo_codes.next_page_url
          lastPromoCodesPageUrl.value = response.data.data.promo_codes.last_page_url
          prevPromoCodesPageUrl.value = response.data.data.promo_codes.prev_page_url
          promoCodesTotalItems.value = response.data.data.promo_codes.total
          promoCodesFrom.value = response.data.data.promo_codes.from
          promoCodesTo.value = response.data.data.promo_codes.to
          promoCodesPagesLinks.value = []
          response.data.data.promo_codes.links.forEach(link => {
            promoCodesPagesLinks.value.push(link)
          })
        })
    })

    function promoCodeChangePage(page) {
      $http.get(page)
        .then(response => {
          promo_codes.value = []
          promo_codes.value = response.data.data.promo_codes.data
          nextPromoCodesPageUrl.value = response.data.data.promo_codes.next_page_url
          lastPromoCodesPageUrl.value = response.data.data.promo_codes.last_page_url
          prevPromoCodesPageUrl.value = response.data.data.promo_codes.prev_page_url
          promoCodesTotalItems.value = response.data.data.promo_codes.total
          promoCodesFrom.value = response.data.data.promo_codes.from
          promoCodesTo.value = response.data.data.promo_codes.to
          promoCodesPagesLinks.value = []
          response.data.data.promo_codes.links.forEach(link => {
            promoCodesPagesLinks.value.push(link)
          })
        })
    }

    return {
      sidebarOpen,

      nextPromoCodesPageUrl,
      prevPromoCodesPageUrl,
      lastPromoCodesPageUrl,
      promoCodesPagesLinks,
      promoCodesFrom,
      promoCodesTo,
      promoCodesTotalItems,
      promoCodeSearch,

      promo_codes,

      restaurants,

      addPromoCode,
      addPromoCodeStartDate,
      addPromoCodeEndDate,
      addPromoCodeStatus,
      addPromoCodeValue,
      addPromoCodeType,
      addPromoCodeRestaurants,

      editPromoCodeId,

      editPromoCodeModal,
      addPromoCodeModal,

      promoCodeChangePage,
      // editMenu,

      createPromoCode,

      editPromoCode,

      updatePromoCode,

      moment,

      from_created_at,
      to_created_at,

      exportPromocodes,
      formatValue,
    }
  }
}
</script>