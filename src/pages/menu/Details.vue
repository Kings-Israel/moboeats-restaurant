<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow" v-if="menu != null">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0 flex gap-2">
              <div class="flex">
                <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                  {{ menu.attributes.title }}
                </h1>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full xl:col-span-3">
              <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <div class="flex flex-col h-full">
                  <div class="grow p-5">
                    <header class="space-y-6">
                      <div class="">
                        <h2 class="text-lg font-semibold">Restaurant</h2>
                      </div>
                    </header>
                    <router-link :to="{name: 'restaurant-details', params: {id:menu.relationships.restaurant.uuid}}">
                      <div class="flex gap-2 py-3"><span class="text-xl font-medium text-slate-800 -mt-0.5 mr-1 underline">{{ menu.relationships.restaurant.attributes.name }}</span></div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full xl:col-span-2">
              <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <div class="flex flex-col h-full">
                  <div class="grow p-5">
                    <header class="space-y-6">
                      <div class="text-center">
                        <h2 class="text-lg leading-snug justify-center font-semibold">Orders</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-xl font-medium text-slate-400 -mt-0.5 mr-1">{{ menu.relationships.orders_count }}</span></div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full xl:col-span-3">
              <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <div class="flex flex-col h-full">
                  <div class="grow p-5">
                    <header class="space-y-6">
                      <div class="text-center">
                        <h2 class="text-lg leading-snug justify-center font-semibold">Total Orders Value</h2>
                      </div>
                      <div class="flex justify-center items-center"><span class="text-xl font-medium text-slate-400 -mt-0.5 mr-1">{{ menu.relationships.total_orders_value }}</span></div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="menu.relationships.discount" class="col-span-full xl:col-span-3">
              <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <div class="flex flex-col h-full">
                  <div class="grow p-5">
                    <header class="space-y-6">
                      <div class="">
                        <h2 class="text-lg font-semibold">Discount</h2>
                      </div>
                    </header>
                    <div class="flex gap-2" v-if="menu.relationships.discount.type == 'perenctage'">Value: <span class="font-medium text-slate-800 mr-1 underline">{{ menu.relationships.discount.value }}%</span></div>
                    <div class="flex gap-2" v-if="menu.relationships.discount.type == 'amount'">Value: <span class="font-medium text-slate-800 mr-1 underline">{{ formatValue(menu.relationships.discount.value) }}</span></div>
                    <div class="flex gap-2">Added On: <span class="font-medium text-slate-800 mr-1 underline">{{ moment(menu.relationships.discount.created_at).fromNow() }}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full xl:col-span-3">
              <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <div class="flex flex-col h-full">
                  <div class="grow p-6">
                    <header class="space-y-2">
                      <div class="text-center">
                        <h2 class="text-lg leading-snug justify-center font-semibold">Rating</h2>
                      </div>
                      <div class="font-bold text-amber-600 text-xl text-center">{{ menu.attributes.average_rating }}</div>
                      <div class="flex items-center ml-10 space-x-2">
                        <div class="flex space-x-1">
                          <button>
                            <span class="sr-only">1 star</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(menu.attributes.average_rating) >= 1 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                          <button>
                            <span class="sr-only">2 stars</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(menu.attributes.average_rating) >= 2 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                          <button>
                            <span class="sr-only">3 stars</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(menu.attributes.average_rating) >= 3 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                          <button>
                            <span class="sr-only">4 stars</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(menu.attributes.average_rating) >= 4 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                          <button>
                            <span class="sr-only">5 stars</span>
                            <svg class="w-5 h-5 fill-current" :class="Math.round(menu.attributes.average_rating) == 5 ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'" viewBox="0 0 16 16">
                              <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                            </svg>
                          </button>
                        </div>
                        
                      </div>
                    </header>
                  </div>
                </div>
              </div>
            </div>
            <!-- Orders & Payments -->
            <div class="col-span-full md:col-span-12 gap-6">
              <div class="col-span-full xl:col-span-2">
                <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                  <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                    <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Orders</h2>
                  </header>
                  <div class="flex flex-col space-y-2 p-3">
                    <div class="overflow-x-auto">
                      <table class="table-auto w-full dark:text-slate-300">
                        <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                          <tr>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="font-semibold text-left">Order ID</div>
                            </th>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="font-semibold text-left">User</div>
                            </th>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="font-semibold text-left">Amount</div>
                            </th>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="font-semibold text-left">Delivery Status</div>
                            </th>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="font-semibold text-left">Ordered On</div>
                            </th>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="font-semibold text-left">Actions</div>
                            </th>
                          </tr>
                        </thead>
                        
                        <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                          <tr v-for="order in orders" :key="order.id">
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="text-left">{{getOrderId(order)}}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="text-left">{{order.user.name}}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="text-left font-medium text-emerald-500">{{formatValue(order.total_amount)}}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3">
                              <div :class="'text-center rounded-xl w-44 '+resolveOrderStatus(order.status)">{{order.status}}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                              <div class="text-left">{{moment(order.created_at).fromNow()}}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                              <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white btn-sm" :to="{ name: 'order-details', params: { id: order.uuid }}">View</router-link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div class="mt-8">
                        <PaginationClassic @change-page="ordersChangePage" :next_page="nextOrdersPageUrl" :prev_page="prevOrdersPageUrl" :from="ordersFrom" :to="ordersTo" :total_items="ordersTotalItems" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-full md:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <ul v-if="menu.relationships.images.length" class="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px p-2">
                <li v-for="image in menu.relationships.images" :key="image.id">
                  <img class="w-52 h-44 rounded-xl object-cover" :src="image.attributes.imageUrl" alt="menu" />
                </li>
              </ul>
            </div>
            <div class="p-3 col-span-full md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex justify-between mb-6">
                <h1 class="text-xl text-slate-800 dark:text-slate-100 font-bold"> Update Images</h1>
              </div>
              <form class="relative flex flex-col justify-between h-full" @submit.prevent="createImages">
                <div class="w-full">
                  <label for="dropzone-file" class="flex w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                  <div class="flex justify-end mt-2">
                    <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="p-3 col-span-full md:col-span-8 bg-white rounded-sm border border-slate-200">
              <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Prices</h2>
              </header>
              <div class="flex flex-col space-y-2 p-3">
                <div class="overflow-x-auto">
                  <table class="table-auto w-full dark:text-slate-300">
                    <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Price</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Description</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Status</div>
                        </th>
                        <th class="hidden md:block px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Added On</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Actions</div>
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                      <tr v-for="price in menu.relationships.menuPrices" :key="price.id">
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="text-left">{{formatValue(price.attributes.price)}}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="text-left">{{price.attributes.description}}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="text-left">{{resolvePriceStatus(price.attributes.status)}}</div>
                        </td>
                        <td class="hidden md:block px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="text-left">{{moment(price.attributes.created_at).fromNow()}}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="">
                            <button type="button" class="bg-red-500 text-white rounded-md p-2" @click="deletePrice(price.id)">Delete</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> 
            </div>
            <div class="p-3 col-span-full md:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div class="flex justify-between mb-6">
                <h1 class="text-xl text-slate-800 dark:text-slate-100 font-bold"> Update Prices</h1>
              </div>
              <form class="relative md:flex flex-col justify-evenly" @submit.prevent="createMenu('add price')">
                <div class="flex gap-2 w-full max-h-[26rem] overflow-auto flex-wrap">
                  <div class="md:flex md:justify-between w-full">
                    <div class="w-full">
                      <label class="block text-sm font-medium mb-1" for="price">Price</label>
                      <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addPrice" />
                    </div>
                    <div class="flex-none flex my-auto">
                      <div class="m-3">
                        <label class="flex items-center">
                          <input type="radio" :name="index" v-model="addPriceStatus" value="2" class="form-radio" />
                          <span class="text-sm ml-2">Active</span>
                        </label>
                      </div>

                      <div class="m-3">
                        <label class="flex items-center">
                          <input type="radio" :name="index" v-model="addPriceStatus" value="1" class="form-radio" />
                          <span class="text-sm ml-2">Inactive</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="w-full">
                    <label class="block text-sm font-medium mb-1" for="title">Description</label>
                    <textarea name="addCategoryDescription" id="" class="form-input w-full min-h-full rounded-lg" rows="2" v-model="addPriceDescription"></textarea>
                  </div>
                </div>
                <div class="flex justify-end mt-2">
                  <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <br>
          <!-- Menu & Categories -->
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-slate-200 dark:border-slate-700 relative h-full p-3">
              <div class="flex justify-between mb-6">
                <h1 class="text-xl text-slate-800 dark:text-slate-100 font-bold"> Update Menu</h1>
              </div>
              <!-- Add/Edit Menu -->
              <form class="flex flex-col justify-around" @submit.prevent="createMenu('edit menu')">
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
                      <label class="block text-sm font-medium mb-1" for="preparation_time">Preparation Time (in minutes)</label>
                      <input id="preparation_time" class="form-input w-full rounded-lg" type="number" min="0" v-model="addMenuPreparationTime" />
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
                      <label class="flex items-center">
                        <input type="radio" name="menu-active" v-model="addMenuStatus" value="2" class="form-radio" />
                        <span class="text-sm ml-2">Active</span>
                      </label>
                    </div>

                    <div class="m-3">
                      <label class="flex items-center">
                        <input type="radio" name="menu-active" v-model="addMenuStatus" value="1" class="form-radio" />
                        <span class="text-sm ml-2">Inactive</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end mt-6 absolute bottom-4 right-4">
                  <button type="submit" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Submit</button>
                </div>
              </form>
              <!-- Add/Edit Price -->
            </div>
          </div>
          <br>
          <!-- Reviews -->
          <br>
          <div class="grid grid-cols-2 gap-6" v-if="menu.relationships.reviews.length > 0">
            <div class="col-span-full xl:col-span-1">
              <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
                <header class="px-5 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 class="font-semibold text-slate-800 dark:text-slate-100 underline">Latest Reviews</h2>
                </header>
                <div class="flex flex-col space-y-2 p-3">
                  <div class="grid grid-cols-3">
                      <span class="font-bold col-span-2">Review</span>
                      <span class="font-bold">Created On</span>
                    </div>
                  <div v-for="review in menu.relationships.reviews" :key="review.id">
                    <div class="grid grid-cols-3" v-if="review.review">
                      <span class="col-span-2">{{ review.review }}</span>
                      <span>{{ moment(review.created_at).format('Do MMM YYYY') }}</span>
                    </div>
                  </div>
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

export default {
  name: 'MenuDetails',
  components: {
    Sidebar,
    Header,
    PaginationClassic,
    PaginationNumeric,
  },
  setup() {
    const $http = inject("$http")
    const toast = useToast()
    const router = useRoute()
    const sidebarOpen = ref(false)

    const nextOrdersPageUrl = ref('')
    const lastOrdersPageUrl = ref('')
    const prevOrdersPageUrl = ref('')
    const ordersPagesLinks = ref([])
    const ordersFrom = ref(0)
    const ordersTo = ref(0)
    const ordersTotalItems = ref(0)
    let ordersSearch = ref('')

    const editTableId = ref('')

    const addTableName = ref('')
    const addTableSeatingArea = ref('')
    const addTableSeatsNumber = ref(1)

    const addCategoryTitle = ref('')
    const addCategoryDescription = ref('')
    const addCategoryImage = ref(null)

    const addEmployeeFirstName = ref('')
    const addEmployeeLastName = ref('')
    const addEmployeeAvatar = ref(null)
    const addEmployeeEmail = ref('')
    const addEmployeePhoneNumber = ref('')
    const addEmployeeStatus = ref('2')

    const addMenuTitle = ref('')
    const addMenuDescription = ref('')
    const addMenuStatus = ref('2')
    const addMenuPreparationTime = ref(0)
    const addMenuCategories = ref([])
    const addMenuSubcategories = ref([])

    const showSubCategoriesInput = ref(false)
    const subcategories = ref([])

    const addMenuImages = ref([])
    const currentMenuImages = ref([])

    const addPricesCount = ref(0)
    const addPrice = ref([])
    const addPriceStatus = ref([])
    const addPriceDescription = ref([])

    const editMenuId = ref('')

    const action = ref('edit menu')
    const category_action = ref('create')
    const employee_action = ref('create')
    const table_action = ref('create')

    const orders = ref([])
    const menu = ref(null)

    const categories = ref([])

    const reviews = ref([])

    const getMenu = () => {
      $http.get(`/restaurant/menu/${router.params.id}`)
        .then(response => {
          menu.value = response.data.menu
          categories.value = response.data.categories
          editMenuId.value = menu.value.id
          addMenuTitle.value = menu.value.attributes.title
          addMenuDescription.value = menu.value.attributes.description
          addMenuStatus.value = menu.value.attributes.status
          addMenuPreparationTime.value = menu.value.attributes.preparation_time
          addMenuCategories.value = []
          if (menu.value.relationships.categories.length > 0) {
            menu.value.relationships.categories.forEach(category => {
              // Add Subcategories to list
              categories.value.forEach(main_category => {
                if (category.id == main_category.id) {
                  main_category.subCategories.forEach(sub_category => {
                    subcategories.value.push(sub_category)
                  })
                }
              })
              addMenuCategories.value.push(category.id)
              let possible_groceries_names = ['groceries', 'grocery'];
              // Add Menu Subcategories to list
              if (possible_groceries_names.includes(category.title.toLowerCase())) {
                if (menu.value.relationships.subCategories.length > 0) {
                  menu.value.relationships.subCategories.forEach(subcategory => {
                    addMenuSubcategories.value.push(subcategory.id)
                  })
                } else {
                  addMenuSubcategories.value = []
                  showSubCategoriesInput.value = false
                }
                showSubCategoriesInput.value = true
              }
            })
          } else {
            addMenuCategories.value = []
          }
        })
        .catch(error => {
          console.log(error)
        })
    }

    const getReviews = () => {
      $http.get('/restaurant/menu/'+router.params.id +'/reviews')
        .then(response => {
          reviews.value = response.data.data.reverse().splice(0, 5)
        })
    }

    onMounted(() => {
      getMenu()
      getReviews()
      // getPayments()
      getOrders()
      // getRestaurantCategories()
    })

    // const getReviews = () => {
    //   $http.get('/restaurant/restaurants/'+router.params.id +'/reviews')
    //     .then(response => {
    //       reviews.value = response.data.data.reverse().splice(0, 5)
    //     })
    // }

    const getOrders = () => {
      $http.get('/restaurant/menus/'+router.params.id+'/orders')
        .then(response => {
          orders.value = []
          orders.value = response.data.data.data
          nextOrdersPageUrl.value = response.data.data.next_page_url
          lastOrdersPageUrl.value = response.data.data.last_page_url
          prevOrdersPageUrl.value = response.data.data.prev_page_url
          ordersTotalItems.value = response.data.data.total
          ordersFrom.value = response.data.data.from
          ordersTo.value = response.data.data.to
          ordersPagesLinks.value = []
          response.data.data.links.forEach(link => {
            ordersPagesLinks.value.push(link)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }

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

    const getOrderId = (order) => {
      return order.uuid.split('-')[0].toUpperCase()
    }

    const clearFields = (section = '') => {
      switch (section) {
        case 'menu':
          action.value = 'create menu'
          editMenuId.value = ''
    
          addMenuTitle.value = ''
          addMenuDescription.value = ''
          addMenuCategories.value = []
          addMenuSubcategories.value = []
          subcategories.value = []
          showSubCategoriesInput.value = false
          addMenuStatus.value = '2'
          addPriceStatus.value = []
          addPricesCount.value = 0
    
          addMenuImages.value = []
          break;
        case 'category':
          addCategoryTitle.value = ''
          addCategoryDescription.value = ''
          addCategoryImage.value = null
          category_action.value = 'create'
          break;
        case 'table':
          addTableName.value = ''
          addTableSeatingArea.value = ''
          addTableSeatsNumber.value = ''
          table_action.value = 'create'
          editTableId.value = ''
          break;
        case 'employee':
          addEmployeeFirstName.value = ''
          addEmployeeLastName.value = ''
          addEmployeeAvatar.value = null
          addEmployeeEmail.value = ''
          addEmployeePhoneNumber.value = ''
          addEmployeeStatus.value = '2'
          employee_action.value = 'create'
          break;
        default:
          action.value = 'create menu'
          editMenuId.value = ''
    
          addMenuTitle.value = ''
          addMenuDescription.value = ''
          addMenuCategories.value = []
          addMenuStatus.value = ''
          addPrices.value = []
          addPriceDescriptions.value = []
          addPriceStatus.value = []
          addPricesCount.value = 0
    
          addMenuImages.value = []

          addCategoryTitle.value = ''
          addCategoryDescription.value = ''
          addCategoryImage.value = null

          addEmployeeFirstName.value = ''
          addEmployeeLastName.value = ''
          addEmployeeAvatar.value = null
          addEmployeeEmail.value = ''
          addEmployeePhoneNumber.value = ''
          addEmployeeStatus.value = '2'
          break;
      }

    }

    const createMenu = (type) => {
      switch (type) {
        case 'edit menu':
          $http.post(`/restaurant/menu/${menu.value.id}/update`, {
            'title': addMenuTitle.value,
            'description': addMenuDescription.value,
            'categoryIds': addMenuCategories.value,
            'subcategoryIds': addMenuSubcategories.value,
            'status': addMenuStatus.value,
            'preparation_time': addMenuPreparationTime.value,
          })
          .then(() => {
            getMenu()
            toast.success('Menu updated successfully')
            clearFields('menu')
          })
          .catch(error => {
            console.error(error)
          })
          break
        case 'add price':
          const formData = new FormData()
          formData.append('menu_id', menu.value.id)
          formData.append('price', addPrice.value)
          formData.append('description', addPriceDescription.value)
          formData.append('status', addPriceStatus.value)
          $http.post('/restaurant/menu-prices', formData)
            .then(() => {
              getMenu()
              toast.success('Menu Price added successfully')
              clearFields('menu')
            })
            .catch(error => {
              toast.error(error.response.message.data)
            })
          break
        default:
          toast.error('Select action')
      }
    }

    const deletePrice = (price) => {
      $http.delete(`/restaurant/menu-prices/${price}/delete`)
        .then(() => {
          getMenu()
          toast.success('Deleted price')
        })
        .catch(err => {
          toast.error(err.response.data.message)
        })
    }

    const createImages = () => {
      const formData = new FormData()
      addMenuImages.value.forEach((image, index) => {
        formData.append('images['+index+']', image)
      })
      $http.post(`/restaurant/menu/${menu.value.id}/images/update`, formData)
        .then(() => {
          getMenu()
          toast.success('Menu images updated successfully')
          clearFields('menu')
        })
        .catch(error => {
          toast.error(error.response.message)
          console.error(error)
        })
    }

    const selectImages = (e) => {
      for (let index = 0; index < 2; index++) {
        if (e.target.files[index]) {
          addMenuImages.value.push(e.target.files[index])
        }
      }
    }

    function ordersChangePage(page) {
      $http.get(page)
        .then(response => {
          orders.value = response.data.data.data
          nextOrdersPageUrl.value = response.data.data.next_page_url
          lastOrdersPageUrl.value = response.data.data.last_page_url
          prevOrdersPageUrl.value = response.data.data.prev_page_url
          ordersTotalItems.value = response.data.data.total
          ordersFrom.value = response.data.data.from
          ordersTo.value = response.data.data.to
          response.data.data.links.forEach(link => {
            ordersPagesLinks.value.push(link)
          })
        })
    }

    // watch(ordersSearch, async (newSearch, oldSearch) => {
    //   $http.get('/restaurant/restaurant/'+router.params.id+'/orders?search='+newSearch)
    //     .then(response => {
    //       orders.value = response.data.data.data
    //       nextOrdersPageUrl.value = response.data.data.next_page_url
    //       lastOrdersPageUrl.value = response.data.data.last_page_url
    //       prevOrdersPageUrl.value = response.data.data.prev_page_url
    //       ordersTotalItems.value = response.data.data.total
    //       ordersFrom.value = response.data.data.from
    //       ordersTo.value = response.data.data.to
    //       response.data.data.links.forEach(link => {
    //         ordersPagesLinks.value.push(link)
    //       })
    //     })
    // })

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
          return 'text-slate-100 bg-slate-500'
          break;
        case 'Denied':
          return 'text-red-100 bg-red-500'
          break;
        default:
          return 'text-gray-100 bg-gray-500'
          break;
      }
    }

    const resolvePriceStatus = (status) => {
      switch (status) {
        case '2':
          return 'Active'
          break;
        case '1':
          return 'Inactive'
        default:
          return 'Inactive'
          break;
      }
    }

    return {
      moment,
      sidebarOpen,
      menu,
      
      getOrderId,
      resolveOrderStatus,
      resolvePriceStatus,
      formatValue,

      nextOrdersPageUrl,
      lastOrdersPageUrl,
      prevOrdersPageUrl,
      ordersPagesLinks,
      ordersFrom,
      ordersTo,
      ordersTotalItems,
      ordersSearch,
      orders,

      // nextMenuPageUrl,
      // lastMenuPageUrl,
      // prevMenuPageUrl,
      // menuPagesLinks,
      // menuFrom,
      // menuTo,
      // menuTotalItems,
      // menuSearch,

      categories,

      reviews,

      addMenuTitle,
      addMenuDescription,
      addMenuStatus,
      addMenuPreparationTime,
      addMenuCategories,
      addMenuSubcategories,
      editMenuId,

      addMenuImages,

      // addPricesCount,
      addPrice,
      addPriceStatus,
      addPriceDescription,

      // restaurantCategories,

      ordersChangePage,
      // paymentsChangePage,
      // menuChangePage,

      // editMenu,
      createMenu,
      deletePrice,

      createImages,
      selectImages,

      clearFields,

      getSelectedCategory,
      subcategories,
      showSubCategoriesInput,
    }  
  }
}
</script>