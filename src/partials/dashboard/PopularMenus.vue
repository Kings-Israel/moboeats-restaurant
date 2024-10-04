<template>
  <div class="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-fit">
    <header class="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
      <h2 class="font-semibold text-slate-800 dark:text-slate-100">Top Menu Items</h2>
    </header>
    <div class="p-3">

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
                <div class="font-semibold text-center">Orders</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">Price</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">Restaurant</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">Added On</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            <!-- Row -->
            <tr v-for="item in topMenuItems" :key="item.id">
              <td class="p-2">
                <div class="flex items-center">
                  <!-- <img :src="item.images[0]" alt=""> -->
                  <div class="text-slate-800 dark:text-slate-100">{{ item.title }}</div>
                </div>
              </td>
              <td class="p-2">
                <div class="text-center">{{ item.order_items_count }}</div>
              </td>
              <td class="p-2">
                <div class="text-center text-emerald-500">{{ formatValue(item.menu_prices[0].price) }}</div>
              </td>
              <td class="p-2">
                <router-link :to="{name: 'restaurant-details', params: {id: item.restaurant.uuid}}" class="text-center text-sky-500 hover:text-sky-300">
                  <p class="text-center">
                    {{ item.restaurant.name }}
                  </p>
                </router-link>
              </td>
              <td class="p-2">
                <div class="text-center">{{ moment(item.created_at).format('D MMM Y') }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatValue } from '../../utils/Utils'
import moment from 'moment'

export default {
  name: 'PopularMenus',
  props: {
    topMenuItems: {
      type: Array
    }
  },
  setup(props) {
    const topMenuItems = props.topMenuItems

    return {
      formatValue,
      moment,
      topMenuItems
    }
  }
}
</script>