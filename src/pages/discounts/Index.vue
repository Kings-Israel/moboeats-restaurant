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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Discounts ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-indigo-700 hover:bg-indigo-500 p-2 text-white font-semibold rounded-full px-3" @click="addDiscountModal = true">Add Discount</button>
              <modal-action :id="'addMenu'" :modal-open="addDiscountModal" @close-modal="addDiscountModal = false" :add-class="'max-w-4xl'">
                <span class="text-xl font-bold px-4">Add Discount on Menus</span>
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around p-4" @submit.prevent="createDiscount">
                  <div class="grid grid-cols-2 gap-2">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="type">Type</label>
                        <div class="flex-none flex my-auto">
                          <div class="m-3">
                            <!-- Start -->
                            <label class="flex items-center">
                              <input type="radio" name="promo-code-type" v-model="addDiscountType" value="amount" class="form-radio" />
                              <span class="text-sm ml-2">Amount</span>
                            </label>
                            <!-- End -->
                          </div>
    
                          <div class="m-3">
                            <!-- Start -->
                            <label class="flex items-center">
                              <input type="radio" name="promo-code-type" v-model="addDiscountType" value="percentage" class="form-radio" />
                              <span class="text-sm ml-2">Percentage</span>
                            </label>
                            <!-- End -->
                          </div>
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Value</label>
                        <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addDiscountValue" />
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="categories">Menus</label>
                        <select name="categories" multiple size="10" v-model="addDiscountMenus" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option v-for="menu in menus" :key="menu.id" :value="menu.id">{{ menu.title }} - {{ menu.restaurant.name }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 mt-2">
                    <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
            </div>
          </div>

          <div class="md:flex md:justify-between gap-2 mb-2">
            <form class="relative w-full md:w-[40%]">
              <label for="action-search" class="">Search</label>
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-full" type="search" v-model="discountSearch" placeholder="Search Menus" />
              <button class="absolute inset-0 top-6 right-auto group" type="submit" aria-label="Search">
                <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            <button class="bg-red-500 text-white rounded-full h-fit w-[30%] py-1 my-auto" @click="search = ''">Clear Fields</button>
          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <!-- <header class="px-5 py-4">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Promos <span class="text-slate-400 dark:text-slate-500 font-medium">{{ discounts.length }}</span></h2>
            </header> -->
            <div class="">
              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Menu</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Value</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Type</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Created On</div>
                        </th>
                        <th class="pr-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium bg-slate-50 divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="discount in discounts" :key="discount.id" :class="discount.id === editDiscountId ? 'bg-slate-300 transition duration-200 ease-in-out' : 'transition duration-300 ease-in-out'">
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ discount.title }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold'>{{ discount.discount.type == 'amount' ? formatValue(discount.discount.value) : discount.discount.value+'%' }}</div>
                        </td>
                        <td class="p-2">
                          <div class='text-green-700 font-semobold m_title'>{{ discount.discount.type }}</div>
                        </td>
                        <td class="p-2">
                          <div class="text-sky-700 font-semibold">{{ moment(discount.discount.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2 flex gap-2 justify-end">
                          <button class="btn btn-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" @click="editDiscount(discount.discount)">Edit</button>
                          <button class="btn btn-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400" @click="deleteDiscount(discount.discount)">Delete</button>
                        </td>
                        <modal-action :id="'edit_'+discount.discount.id" :add-class="'max-w-xl'" :modal-open="editDiscountModal" @close-modal="editDiscountModal = false">
                          <!-- Add/Edit Menu -->
                          <form class="flex flex-col justify-around" @submit.prevent="updateDiscount">
                            <div class="grid grid-cols-1 gap-2">
                              <div class="space-y-4">
                                <div>
                                  <label class="block text-sm font-medium mb-1" for="type">Type</label>
                                  <div class="flex-none flex my-auto">
                                    <div class="m-3">
                                      <!-- Start -->
                                      <label class="flex items-center">
                                        <input type="radio" name="promo-code-type" v-model="addDiscountType" value="amount" class="form-radio" />
                                        <span class="text-sm ml-2">Amount</span>
                                      </label>
                                      <!-- End -->
                                    </div>
              
                                    <div class="m-3">
                                      <!-- Start -->
                                      <label class="flex items-center">
                                        <input type="radio" name="promo-code-type" v-model="addDiscountType" value="percentage" class="form-radio" />
                                        <span class="text-sm ml-2">Percentage</span>
                                      </label>
                                      <!-- End -->
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label class="block text-sm font-medium mb-1" for="price">Value</label>
                                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addDiscountValue" />
                                </div>
                              </div>
                            </div>
                            <div class="flex justify-end bottom-2 mt-2">
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
              <PaginationClassic @change-page="discountChangePage" :next_page="nextDiscountPage" :prev_page="prevDiscountPage" :from="discountsFrom" :to="discountsTo" :total_items="discountsTotalItems" />
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
  name: 'Discounts',
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

    const discounts = ref([])
    const nextDiscountPage = ref('')
    const prevDiscountPage = ref('')
    const lastDiscountsPage = ref('')
    const discountsPagesLinks = ref([])
    const discountsFrom = ref(0)
    const discountsTo = ref(0)
    const discountsTotalItems = ref(0)

    let discountSearch = ref('')

    const addDiscountValue = ref('')
    const addDiscountType = ref('amount')
    const addDiscountMenus = ref([])

    const editDiscountId = ref('')

    const menus = ref([])

    const editDiscountModal = ref(false)

    const addDiscountModal = ref(false)

    const getDiscounts = () => {
      $http.get(`/restaurant/discounts`)
        .then(response => {
          menus.value = response.data.data.menus
          discounts.value = []
          discounts.value = response.data.data.discounts.data
          nextDiscountPage.value = response.data.data.discounts.next_page_url
          lastDiscountsPage.value = response.data.data.discounts.last_page_url
          prevDiscountPage.value = response.data.data.discounts.prev_page_url
          discountsTotalItems.value = response.data.data.discounts.total
          discountsFrom.value = response.data.data.discounts.from
          discountsTo.value = response.data.data.discounts.to
          discountsPagesLinks.value = []
          response.data.data.discounts.links.forEach(link => {
            discountsPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    const editDiscount = (discount) => {
      editDiscountId.value = discount.id
      addDiscountType.value = discount.type
      addDiscountValue.value = discount.value
      editDiscountModal.value = true
    }

    const clearFields = () => {
      editDiscountId.value = ''
      addDiscountValue.value = ''
      addDiscountType.value = 'amount'
    }

    const createDiscount = () => {
      const formData = new FormData()
      formData.append('type', addDiscountType.value)
      formData.append('value', addDiscountValue.value)
      formData.append('menu_ids', JSON.stringify(addDiscountMenus.value))

      $http.post(`/restaurant/discounts/store`, formData)
        .then(() => {
          toast.success('Discount added successfully')
          getDiscounts()
          clearFields()
          addDiscountModal.value = false
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    }

    const deleteDiscount = (discount) => {
      $http.get('/restaurant/discounts/' + discount.id + '/delete')
        .then(response => {
          toast.success('Discount deleted successfully')
          getDiscounts()
        })
        .catch(err => {
          toast.error('Error while deleting discount')
          console.error(err)
        })
    }

    const updateDiscount = () => {
      const formData = new FormData()
      formData.append('type', addDiscountType.value)
      formData.append('value', addDiscountValue.value)

      $http.post(`/restaurant/discounts/${editDiscountId.value}/update`, formData)
        .then(() => {
          toast.success('Discount updated successfully')
          getDiscounts()
          clearFields()
          editDiscountModal.value = false
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    }

    const exportPromocodes = () => {
      $http.get('/restaurant/promo-codes/export/data?search='+discountSearch.value+'&from_created_at='+from_created_at.value+'&to_created_at='+to_created_at.value,
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
      getDiscounts()
    })

    watch(discountSearch, async (newSearch, oldSearch) => {
      $http.get('/restaurant/discounts?search='+newSearch)
        .then(response => {
          discounts.value = []
          discounts.value = response.data.data.discounts.data
          nextDiscountPage.value = response.data.data.discounts.next_page_url
          lastDiscountsPage.value = response.data.data.discounts.last_page_url
          prevDiscountPage.value = response.data.data.discounts.prev_page_url
          discountsTotalItems.value = response.data.data.discounts.total
          discountsFrom.value = response.data.data.discounts.from
          discountsTo.value = response.data.data.discounts.to
          discountsPagesLinks.value = []
          response.data.data.discounts.links.forEach(link => {
            discountsPagesLinks.value.push(link)
          })
        })
    })

    function discountChangePage(page) {
      $http.get(page)
        .then(response => {
          discounts.value = []
          discounts.value = response.data.data.discounts.data
          nextDiscountPage.value = response.data.data.discounts.next_page_url
          lastDiscountsPage.value = response.data.data.discounts.last_page_url
          prevDiscountPage.value = response.data.data.discounts.prev_page_url
          discountsTotalItems.value = response.data.data.discounts.total
          discountsFrom.value = response.data.data.discounts.from
          discountsTo.value = response.data.data.discounts.to
          discountsPagesLinks.value = []
          response.data.data.discounts.links.forEach(link => {
            discountsPagesLinks.value.push(link)
          })
        })
    }

    return {
      sidebarOpen,

      nextDiscountPage,
      prevDiscountPage,
      lastDiscountsPage,
      discountsPagesLinks,
      discountsFrom,
      discountsTo,
      discountsTotalItems,
      discountSearch,

      discounts,

      menus,

      addDiscountValue,
      addDiscountType,
      addDiscountMenus,

      editDiscountId,

      editDiscountModal,
      addDiscountModal,

      discountChangePage,
      // editMenu,

      createDiscount,

      editDiscount,

      updateDiscount,

      moment,
      deleteDiscount,

      exportPromocodes,
      formatValue,
    }
  }
}
</script>
<style>
.m_title:first-letter {text-transform: uppercase}
</style>