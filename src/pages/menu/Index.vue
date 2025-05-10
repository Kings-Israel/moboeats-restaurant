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
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Menus ✨</h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <button class="bg-emerald-600 hover:bg-indigo-500 py-2 px-4 col-span-1 text-slate-50 font-semibold rounded-full justify-end" @click="exportMenus()">Export Menus</button>
              <button class="bg-[#2E5945] hover:bg-indigo-500 py-2 text-white rounded-full px-4" @click="addMenuModal = true">Add Menu</button>
              <button class="bg-[#0b2e1e] hover:bg-indigo-500 py-2 text-white rounded-full px-4" @click="uploadMenuModal = true">Upload Menu</button>
              <modal-action :id="'addMenu'" :modal-open="addMenuModal" @close-modal="addMenuModal = false" :add-class="'max-w-4xl'">
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around p-2 px-4" @submit.prevent="createMenu">
                  <div class="md:grid md:grid-cols-2 gap-2">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="title">Title</label>
                        <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addMenuTitle" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="title">Description</label>
                        <textarea name="addCategoryDescription" id="" class="form-input w-full min-h-full rounded-lg" rows="2" v-model="addMenuDescription"></textarea>
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="categories">Categories</label>
                        <select name="categories" multiple size="4" v-model="addMenuCategories" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option v-for="category in categories" :key="category.id" :value="category.id" @click="getSelectedCategory(category)">{{ category.title }}</option>
                        </select>
                      </div>
                      <div v-show="showSubCategoriesInput">
                        <label class="block text-sm font-medium mb-1" for="categories">Sub categories</label>
                        <select name="categories" multiple size="4" v-model="addMenuSubcategories" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option v-for="category in subcategories" :key="category.id" :value="category.id">{{ category.title }}</option>
                        </select>
                      </div>
                      <div class="flex-none flex my-auto">
                        <div class="m-3">
                          <!-- Start -->
                          <label class="flex items-center">
                            <input type="radio" name="menu-active" v-model="addMenuStatus" value="2" class="form-radio" />
                            <span class="text-sm ml-2">Active</span>
                          </label>
                          <!-- End -->
                        </div>
  
                        <div class="m-3">
                          <!-- Start -->
                          <label class="flex items-center">
                            <input type="radio" name="menu-active" v-model="addMenuStatus" value="1" class="form-radio" />
                            <span class="text-sm ml-2">Inactive</span>
                          </label>
                          <!-- End -->
                        </div>
                      </div>
                    </div>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-1" for="price">Price</label>
                        <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addMenuPrice" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1" for="preparation_time">Preparation Time</label>
                        <input id="preparation_time" class="form-input w-full rounded-lg" type="number" min="0" v-model="addMenuPreparationTime" />
                      </div>
                      <label class="block text-sm font-medium" for="price">Menu Images</label>
                      <label for="dropzone-file" class="flex w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex">
                          <p v-if="addMenuImages.length == 0" class="mb-2 text-sm px-6 my-5 text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span> or drag and drop(Max 2 Files)
                          </p>
                          <div v-else class="flex flex-col flex-wrap">
                            <p v-for="image in addMenuImages" :key="image" class="text-sm ml-2 whitespace-pre-wrap text-gray-500 dark:text-gray-400"><span class="font-semibold">{{ image.name }}</span></p>
                          </div>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" multiple accept=".jpg,.png" v-on:change="selectImages" />
                      </label>

                      <div>
                        <label class="block text-sm font-medium mb-1" for="categories">Branches <i class="fas fa-question-circle text-sm hover:cursor-pointer" data-title="Specific Branches where the menu is offered"></i></label>
                        <select name="categories" multiple size="4" v-model="addMenuRestaurants" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">{{ restaurant.name }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-end bottom-2 ">
                    <button type="submit" class="btn bg-[#2E5945] hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
              <modal-action :id="'addMenu'" :modal-open="uploadMenuModal" @close-modal="uploadMenuModal = false" :add-class="'max-w-lg'">
                <!-- Add/Edit Menu -->
                <form class="flex flex-col justify-around p-2 px-4" @submit.prevent="uploadMenu">
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="profile_picture">Select File</label>
                    <input accept=".xlsx" v-on:change="onFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" autoComplete="on" />
                  </div>
                  <div class="flex justify-end bottom-2 space-x-2">
                    <a href="#" class="btn bg-[#324c40] hover:bg-indigo-600 text-white" @click="downloadTemplate">Download Template</a>
                    <button type="submit" class="btn bg-[#1c2420] hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </form>
              </modal-action>
            </div>
          </div>

          <div class="md:grid md:grid-cols-2 mb-2">
            <form class="relative">
              <label for="action-search" class="sr-only">Search</label>
              <input id="action-search" class="form-input pl-9 bg-white dark:bg-slate-800 w-96" type="search" v-model="menuSearch" placeholder="Search Menus and Resturants" />
              <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg class="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
            <button class="bg-red-500 text-white rounded-full col-span-1 h-fit py-1 my-auto justify-self-end w-72" @click="search = ''">Clear Field</button>
          </div>

          <!-- Table -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <!-- <header class="px-5 py-4">
              <h2 class="font-semibold text-slate-800 dark:text-slate-100">All Menus <span class="text-slate-400 dark:text-slate-500 font-medium">{{ menu.length }}</span></h2>
            </header> -->
            <div>
              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table-auto w-full dark:text-slate-300">
                    <!-- Table header -->
                    <thead class="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th class="p-2">
                          <div class="font-semibold text-left">Title</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Restaurant</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-left">Status</div>
                        </th>
                        <th class="hidden md:block p-2">
                          <div class="font-semibold text-left">Prep. Time</div>
                        </th>
                        <th class="p-2">
                          <div class="font-semibold text-center">Orders</div>
                        </th>
                        <th class="hidden md:block p-2">
                          <div class="font-semibold text-center">Added On</div>
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <!-- Table body -->
                    <tbody class="text-sm font-medium bg-slate-50 divide-y divide-slate-100 dark:divide-slate-700">
                      <!-- Row -->
                      <tr v-for="menu_item in menu" :key="menu_item.id" :class="menu_item.id === editMenuId ? 'bg-slate-200 transition duration-200 ease-in-out' : 'transition duration-300 ease-in-out'">
                        <td class="p-2">
                          <div class="flex items-center">
                            <!-- <img :src="menu_item.image" alt="" class="w-8 h-8 object-cover mx-2"> -->
                            <ul class="hidden md:flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
                              <li v-for="image in menu_item.images" :key="image.id">
                                <img class="w-9 h-9 rounded-full" :src="image.image_url" width="36" height="36" alt="menu" />
                              </li>
                            </ul>
                            <div class="text-slate-800 font-bold ml-2">{{ menu_item.title }}</div>
                          </div>
                        </td>
                        <td class="p-2">
                          <router-link :to="{name: 'restaurant-details', params: { id: menu_item.restaurant.uuid}}" class="text-sky-800 hover:text-sky-500 font-semibold">
                            {{ menu_item.restaurant.name }}
                          </router-link>
                        </td>
                        <td class="p-2">
                          <div :class="menu_item.status == 2 ? 'text-green-700 font-semobold' : 'text-red-700 font-semobold'">{{ menu_item.status == 2 ? 'Active' : 'Inactive' }}</div>
                        </td>
                        <td class="hidden md:block p-2">
                          <div class="text-sky-600 font-semibold">{{ menu_item.preparation_time }} mins</div>
                        </td>
                        <td class="p-2">
                          <div class="text-center text-sky-600 font-semibold">{{ menu_item.order_items_count }}</div>
                        </td>
                        <td class="hidden md:flex p-2">
                          <div v-if="menu_item.created_at" class="text-center text-sky-600 font-semibold">{{ moment(menu_item.created_at).format('Do MMM Y') }}</div>
                        </td>
                        <td class="p-2">
                          <router-link class="mx-auto" :to="{ name: 'menu-details', params: { id: menu_item.uuid }}">
                            <button class="mx-auto btn btn-sm font-medium bg-indigo-500 text-white dark:hover:text-indigo-400">View</button>
                          </router-link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <div class="my-4 px-2">
                    <PaginationClassic @change-page="menuChangePage" :next_page="nextMenuPageUrl" :prev_page="prevMenuPageUrl" :from="menuFrom" :to="menuTo" :total_items="menuTotalItems" />
                  </div>  
              </div>
            </div>
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
  name: 'Menus',
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

    const menu = ref([])
    const nextMenuPageUrl = ref('')
    const prevMenuPageUrl = ref('')
    const lastMenuPageUrl = ref('')
    const menuPagesLinks = ref([])
    const menuFrom = ref(0)
    const menuTo = ref(0)
    const menuTotalItems = ref(0)
    let menuSearch = ref('')

    const addMenuTitle = ref('')
    const addMenuDescription = ref('')
    const addMenuStatus = ref('2')
    const addMenuPreparationTime = ref(0)
    const addMenuCategories = ref([])
    const addMenuSubcategories = ref([])
    const addMenuRestaurants = ref([])
    const addMenuPrice = ref('')
    const addMenuImage = ref(null)

    const showSubCategoriesInput = ref(false)
    const subcategories = ref([])

    const addMenuImages = ref([])
    const currentMenuImages = ref([])

    const addPricesCount = ref(0)
    const addPrices = ref([])
    const addPriceStatus = ref([])
    const addPriceDescriptions = ref([])
    const currentPrices = ref([])

    const editMenuId = ref('')

    const categories = ref([])

    const restaurants = ref([])

    const editMenuModal = ref(false)

    const addMenuModal = ref(false)

    const uploadMenuModal = ref(false)

    const uploadMenuFile = ref(null)

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://moboeats.test/' : 'https://moboeats.com/'

    const getMenu = () => {
      $http.get(`/restaurant/menus`)
        .then(response => {
          menu.value = []
          menu.value = response.data.data.menu.data
          categories.value = response.data.data.categories
          restaurants.value = response.data.data.restaurants
          nextMenuPageUrl.value = response.data.data.menu.next_page_url
          lastMenuPageUrl.value = response.data.data.menu.last_page_url
          prevMenuPageUrl.value = response.data.data.menu.prev_page_url
          menuTotalItems.value = response.data.data.menu.total
          menuFrom.value = response.data.data.menu.from
          menuTo.value = response.data.data.menu.to
          menuPagesLinks.value = []
          response.data.data.menu.links.forEach(link => {
            menuPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

    const selectImages = (e) => {
      for (let index = 0; index < 2; index++) {
        if (e.target.files[index]) {
          addMenuImages.value.push(e.target.files[index])
        }
      }
    }

    const exportMenus = () => {
      $http.get('/restaurant/menus/export/data?search='+menuSearch.value,
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
            `Menus.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    // const editMenu = (menu) => {
    //   editMenuId.value = menu.id
    //   addMenuTitle.value = menu.title
    //   addMenuDescription.value =  menu.description
    //   addMenuStatus.value = menu.status
    //   addMenuSubcategories.value = []
    //   subcategories.value = []
    //   addMenuCategories.value = []
    //   if (menu.categories.length > 0) {
    //     menu.categories.forEach(category => {
    //       // Add Subcategories to list
    //       categories.value.forEach(main_category => {
    //         if (category.id == main_category.id) {
    //           main_category.subCategories.forEach(sub_category => {
    //             subcategories.value.push(sub_category)
    //           })
    //         }
    //       })
    //       addMenuCategories.value.push(category.id)
    //       let possible_groceries_names = ['groceries', 'grocery'];
    //       // Add Menu Subcategories to list
    //       if (possible_groceries_names.includes(category.title.toLowerCase())) {
    //         if (menu.sub_categories.length > 0) {
    //           menu.sub_categories.forEach(subcategory => {
    //             addMenuSubcategories.value.push(subcategory.id)
    //           })
    //         } else {
    //           addMenuSubcategories.value = []
    //           showSubCategoriesInput.value = false
    //         }
    //         showSubCategoriesInput.value = true
    //       }
    //     })
    //   } else {
    //     addMenuCategories.value = []
    //     addMenuSubcategories.value = []
    //     showSubCategoriesInput.value = false
    //   }
    //   editMenuModal.value = true
    // }

    const getSelectedCategory = (category) => {
      let category_id = ''
      let possible_names = ['groceries', 'grocery'];
      categories.value.forEach(main_category => {
        if (possible_names.includes(main_category.title.toLowerCase())) {
          category_id = main_category.id
        }
      })
      if (addMenuCategories.value.includes(category_id)) {
        if (subcategories.value.length <= 0) {
          subcategories.value = category.subCategories
          showSubCategoriesInput.value = true
        }
      } else {
        subcategories.value = []
        showSubCategoriesInput.value = false
      }
    }

    const clearFields = (section = '') => {
      switch (section) {
        case 'menu':
          editMenuId.value = ''
    
          addMenuTitle.value = ''
          addMenuDescription.value = ''
          addMenuCategories.value = []
          addMenuSubcategories.value = []
          subcategories.value = []
          showSubCategoriesInput.value = false
          addMenuStatus.value = '2'
          addMenuPreparationTime.value = 0
          addMenuPrice.value = ''
          addMenuRestaurants.value = []
    
          addMenuImages.value = []
          break;
        default:
          editMenuId.value = ''
    
          addMenuTitle.value = ''
          addMenuDescription.value = ''
          addMenuCategories.value = []
          addMenuStatus.value = '2'
          addMenuPreparationTime.value = 0
          addPrices.value = []
          addPriceDescriptions.value = []
          addPriceStatus.value = []
          addPricesCount.value = 0
          addMenuRestaurants.value = []
    
          addMenuImages.value = []
          break;
      }

    }

    const createMenu = () => {
      const formData = new FormData()
      formData.append('title', addMenuTitle.value)
      formData.append('description', addMenuDescription.value)
      formData.append('status', addMenuStatus.value)
      formData.append('preparation_time', addMenuPreparationTime.value)
      formData.append('standardPrice', addMenuPrice.value)
      formData.append('categoryIds', JSON.stringify(addMenuCategories.value))
      formData.append('subcategoryIds', JSON.stringify(addMenuSubcategories.value))
      formData.append('restaurant_ids', JSON.stringify(addMenuRestaurants.value))
      addMenuImages.value.forEach((image, index) => {
        formData.append('images['+index+']', image)
      })
      $http.post(`/restaurant/menu/create`, formData)
        .then(() => {
          toast.success('Menu added successfully')
          getMenu()
          clearFields('menu')
          addMenuModal.value = false
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    }

    onMounted(() => {
      getMenu()
    })

    watch(menuSearch, async (newSearch, oldSearch) => {
      $http.get('/restaurant/menus?search='+newSearch)
        .then(response => {
          menu.value = []
          menu.value = response.data.data.menu.data
          categories.value = response.data.data.categories
          nextMenuPageUrl.value = response.data.data.menu.next_page_url
          lastMenuPageUrl.value = response.data.data.menu.last_page_url
          prevMenuPageUrl.value = response.data.data.menu.prev_page_url
          menuTotalItems.value = response.data.data.menu.total
          menuFrom.value = response.data.data.menu.from
          menuTo.value = response.data.data.menu.to
          menuPagesLinks.value = []
          response.data.data.menu.links.forEach(link => {
            menuPagesLinks.value.push(link)
          })
        })
    })

    function menuChangePage(page) {
      $http.get(page)
        .then(response => {
          menu.value = []
          menu.value = response.data.data.menu.data
          categories.value = response.data.data.categories
          nextMenuPageUrl.value = response.data.data.menu.next_page_url
          lastMenuPageUrl.value = response.data.data.menu.last_page_url
          prevMenuPageUrl.value = response.data.data.menu.prev_page_url
          menuTotalItems.value = response.data.data.menu.total
          menuFrom.value = response.data.data.menu.from
          menuTo.value = response.data.data.menu.to
          menuPagesLinks.value = []
          response.data.data.menu.links.forEach(link => {
            menuPagesLinks.value.push(link)
          })
        })
    }

    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      uploadMenuFile.value = files[0];
    }

    const uploadMenu = () => {
      const formData = new FormData
      formData.append('file', uploadMenuFile.value)
      $http.post('/restaurant/menu/upload', formData)
      .then(response => {
        uploadMenuModal.value = false
        uploadMenuFile.value++
        toast.success(response.data.message)
        getMenu()
      })
      .catch(err => {
        // toast.success(err.response.data.message)
        // getMenu()
        if (err.response.status == 422 || err.response.status == 400) {
            uploadMenuFile.value++
            let responseMessage = ''
            Object.values(err.response.data).forEach(message => {
              responseMessage = `${responseMessage} ${message}, `
            })
            toast.error(responseMessage)
            return
          }

          if (err.response.data.uploaded > 0) {
            toast.success(err.response.data.uploaded + ' uploaded.');
          }

          if (err.response.data.total_rows - err.response.data.uploaded > 0) {
            toast.error(err.response.data.total_rows - err.response.data.uploaded + ' failed to upload.');
            getMenu()
            uploadMenuFile.value++
          } else {
            uploadMenuModal.value = false
            uploadMenuFile.value++
            getMenu()
          }
      })
    }

    const downloadTemplate = () => {
      $http.get('/restaurant/menu/template/download',
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
            `MenuTemplate.xlsx`,
          )
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch(err => {
          console.log(err)
        })
    }

    return {
      sidebarOpen,

      nextMenuPageUrl,
      lastMenuPageUrl,
      prevMenuPageUrl,
      menuPagesLinks,
      menuFrom,
      menuTo,
      menuTotalItems,
      menuSearch,

      menu,

      categories,
      subcategories,
      restaurants,
      showSubCategoriesInput,

      addMenuTitle,
      addMenuDescription,
      addMenuStatus,
      addMenuPreparationTime,
      addMenuCategories,
      addMenuSubcategories,
      addMenuRestaurants,
      addMenuPrice,
      addMenuImages,

      editMenuId,

      editMenuModal,
      addMenuModal,

      menuChangePage,
      selectImages,
      // editMenu,

      createMenu,

      getSelectedCategory,

      moment,

      exportMenus,

      onFileChange,

      uploadMenuModal,
      uploadMenu,
      downloadTemplate,
    }
  }
}
</script>
<style>
  [data-title]:hover:after {
    opacity: 1;
    transition: all 0.1s ease 0.5s;
    visibility: visible;
  }

  [data-title]:after {
    content: attr(data-title);
    background-color: #0b0b0b;
    color: #f9f9f9;
    font-size: 16px;
    position: absolute;
    padding: 1px 5px 2px 5px;
    bottom: -1.6em;
    left: 100%;
    box-shadow: 1px 1px 3px #222222;
    opacity: 0;
    border: 1px solid #111111;
    z-index: 99999;
    visibility: hidden;
    border-radius: 5px;
    min-width: 250px;
    max-width: 550px;
  }

  [data-title] {
    position: relative;
  }
</style>