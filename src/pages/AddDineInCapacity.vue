<template>
  <main class="bg-[#2E5945]">

    <div class="">

      <!-- Content -->
      <div class="w-full">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">

          <div class="flex-1">
            <div class="flex items-center justify-center h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="flex gap-4" to="/">
                <img
                  src="../images/1024.png"
                  class="object-contain w-24 pt-2"
                  alt=""
                />
              </router-link>
            </div>
          </div>          

          <div class="mx-auto w-[40%] px-2 py-2 bg-gray-100 rounded-md">
            <div class="flex justify-between mb-6">
              <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold">Add Dine In Table Details! ✨</h1>
            </div>
            <!-- Form -->
            <form @submit.prevent="addTable()" class="flex flex-col justify-evenly">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="seating-area">Seating Area</label>
                  <select name="seating-area" v-model="addTableSeatingArea" class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="seating_area in seatingAreas" :key="seating_area.id" :value="seating_area.id">{{ seating_area.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="title">Table Name/Number</label>
                  <input id="title" class="form-input w-full rounded-lg" type="text" v-model="addTableName" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="title">Number of Seats</label>
                  <input id="title" class="form-input w-full rounded-lg" type="number" min="1" v-model="addTableSeatsNumber" />
                </div>
              </div>
              <div class="flex justify-end gap-2 mt-6">
                <router-link v-if="status == 'update'" class="btn bg-red-800 hover:bg-red-900 text-white" :to="{ name: 'dashboard' }">Cancel</router-link>
                <button type="submit" class="btn bg-[#001510] hover:bg-indigo-600 text-white">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'AddDineInCapacity',
  setup() {
    const $http = inject("$http")
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()

    const addTableName = ref('')
    const addTableSeatingArea = ref('')
    const addTableSeatsNumber = ref(1)

    const seatingAreas = ref([])

    const addTable = () => {
      const formData = new FormData()
      formData.append('name', addTableName.value)
      formData.append('seat_number', addTableSeatsNumber.value)
      formData.append('seating_area_id', addTableSeatingArea.value)
      $http.post('restaurant/'+route.params.uuid+'/tables/add', formData)
        .then(() => {
          router.push({ name: 'add-operating-hours', params: { uuid: route.params.uuid }})
          toast.success('Dine in table saved Successfully')
        })
        .catch(() => {
          toast.error('An error occured while adding table')
        })
    }

    const getSeatingAreas = () => {
      $http.get('/seating-areas')
        .then(response => {
          seatingAreas.value = response.data.data
        })
    }

    onMounted(() => {
      getSeatingAreas()
    })

    return {
      addTable,
      addTableName,
      addTableSeatingArea,
      addTableSeatsNumber,
      seatingAreas,
    }
  }
}
</script>