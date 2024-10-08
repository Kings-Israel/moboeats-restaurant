<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
      :class="{ 'bg-slate-200': dropdownOpen }"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="sr-only">Notifications</span>
      <svg class="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-current text-slate-500 dark:text-slate-400" d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z" />
        <path class="fill-current text-slate-400 dark:text-slate-500" d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z" />
      </svg>
      <div v-show="notifications.length != 0" class="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-[#182235] rounded-full"></div>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1" :class="align === 'right' ? 'right-0' : 'left-0'">
        <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">Notifications</div>
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <li v-for="notification in notifications" :key="notification.id" class="border-b border-slate-200 dark:border-slate-700 last:border-0">
            <router-link class="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20" 
              @click.prevent="goToNotification(notification)"
              v-if="notification.type == 'App\\Notifications\\OrderUpdate'" 
              :to="{ name: 'order-details', params: { id: notification.data[0].uuid } }"
            >
              <span class="block text-sm mb-2">📣 <span class="font-medium text-slate-800 dark:text-slate-100">{{ getOrderId(notification.data[0]) }} updated</span> </span>
              <span v-if="notification.data[1] == 'accepted'">
                Rider accepted delivery for the order!
              </span>
              <span v-if="notification.data[1] == 'on_delivery'">
                Rider picked the order and is on delivery!
              </span>
              <span v-if="notification.data[1] == 'delivered'">
                Rider has delivered the order!
              </span>
              <span v-if="notification.data[1] == 'rejected'" class="text-red-600">
                Rider has delivered the order!
              </span>
              <span class="block text-xs font-medium text-slate-400 dark:text-slate-500">{{ moment(notification.created_at).format('Do MMM Y') }}</span>
            </router-link>
            <router-link class="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20" 
              @click.prevent="goToNotification(notification)"
              v-if="notification.type == 'App\\Notifications\\NewOrder'" 
              :to="{ name: 'order-details', params: { id: notification.data.order.uuid } }"
            >
              <span class="block text-sm mb-2">📣 <span class="font-medium text-slate-800 dark:text-slate-100">New Order Made: {{ getOrderId(notification.data.order) }}</span> </span>
              <span class="block text-xs font-medium text-slate-400 dark:text-slate-500">{{ moment(notification.created_at).format('Do MMM Y') }}</span>
            </router-link>
            <span class="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20" 
              @click.prevent="goToNotification(notification)"
              v-if="notification.type == 'App\\Notifications\\UpdatedRestaurantStatus'" 
            >
              <span class="block text-sm mb-2">📣 <span class="font-medium text-slate-800 dark:text-slate-100">Restaurant Status was update to: {{ notification.data.status }}</span> </span>
              <span class="block text-sm mb-2" v-if="notification.data.reason"><span class="font-medium text-slate-800 dark:text-slate-100">Reason: {{ notification.data.reason }}</span> </span>
              <span class="block text-xs font-medium text-slate-400 dark:text-slate-500">{{ moment(notification.created_at).format('Do MMM Y') }}</span>
            </span>
          </li>
        </ul>
      </div> 
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useToast } from 'vue-toastification'
import moment from 'moment';
import { useRouter } from 'vue-router';

export default {
  name: 'DropdownNotifications',
  props: ['align'],
  setup() {

    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)

    const $http = inject('$http')

    const echo = inject('echo')

    const toast = useToast()

    const router = useRouter()

    const notifications = ref([])

    const role = ref('')

    const restaurants = ref([])
    const restaurant = ref({})

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
      dropdownOpen.value = false
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    const getOrderId = (order) => {
      return order.uuid.split('-')[0].toUpperCase()
    }

    const getNotifications = () => {
      $http.get('/notifications')
        .then(response => {
          notifications.value = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }

    const goToNotification = (notification) => {
      dropdownOpen.value = false
      $http.get(`/notifications/${notification.id}/mark-read`)
        .then(() => {
          if (notification.type == 'App\\Notifications\\OrderUpdate') {
            router.push({ name: 'order-details', params: { id: notification.data[0].uuid } })
          }
          if (notification.type == 'App\\Notifications\\NewOrder') {
            router.push({ name: 'order-details', params: { id: notification.data[0].uuid } })
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          getNotifications()
        })
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)

      restaurants.value = JSON.parse(localStorage.getItem('restaurants'))
      restaurant.value = JSON.parse(localStorage.getItem('restaurant'))

      role.value = localStorage.getItem('role')

      getNotifications()

      if (role.value == 'restaurant' && restaurants.value != null && restaurants.value.length > 0) {
        restaurants.value.forEach(restaurant => {
          echo
            .channel(restaurant.uuid)
            .listen('.new.order', data => {
              toast.success('New Order requested .'+getOrderId(data.order))
              getNotifications()
            })
            .listen('.update.order', data => {
              if(data.status == 'accepted') {
                toast.success('Rider accepted delivery of order '+getOrderId(data.order))
              }
              if(data.status == 'on_delivery') {
                toast.info('Rider started delivery of order '+getOrderId(data.order))
              }
              if(data.status == 'delivered') {
                toast.success('Rider delivered the order '+getOrderId(data.order))
              }
              if(data.status == 'rejected') {
                toast.error('Rider rejected delivery of order '+getOrderId(data.order))
              }
              getNotifications()
            })
        });
      }

      if (role.value = 'restaurant employee' && restaurant.value != null && restaurant.value != '') {
        echo
          .channel(restaurant.value.uuid)
          .listen('.new.order', data => {
            toast.success('New Order requested .'+getOrderId(data.order))
            getNotifications()
          })
          .listen('.update.order', data => {
            if(data.status == 'accepted') {
              toast.success('Rider accepted delivery of order '+getOrderId(data.order))
            }
            if(data.status == 'on_delivery') {
              toast.info('Rider started delivery of order '+getOrderId(data.order))
            }
            if(data.status == 'delivered') {
              toast.success('Rider delivered the order '+getOrderId(data.order))
            }
            if(data.status == 'rejected') {
              toast.error('Rider rejected delivery of order '+getOrderId(data.order))
            }
            getNotifications()
          })
      }

    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)

      if (role.value == 'restaurant' && restaurants.value.length > 0) {
        restaurants.forEach(restaurant => {
          echo
            .channel(restaurant.uuid)
            .stopListening('.new.order')
            .stopListening('.update.order')
        });
      }

      if (role.value == 'restaurant employee' && restaurant.value != null && restaurant.value != '') {
        echo
          .channel(restaurant.value.uuid)
          .stopListening('.new.order')
          .stopListening('.update.order')
      }
    })

    return {
      dropdownOpen,
      trigger,
      dropdown,
      notifications,
      moment,
      getOrderId,
      goToNotification,
    }
  }
}
</script>