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
              <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold">Upload Business Documents! ✨</h1>
              <button class="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white py-0" @click="file_count += 1">Add Document</button>
            </div>
            <!-- Form -->
            <form @submit.prevent="onSubmit">
              <div class="space-y-4">
                <div v-for="count in file_count" :key="count" class="flex gap-3">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="email">Name</label>
                    <input class="rounded-md border-2 border-slate-400 text-slate-900" type="text" v-model="file_names[count]" />
                  </div>
                  <div class="w-full">
                    <label class="block text-sm font-medium mb-1" for="email">File</label>
                    <div class="flex gap-2">
                      <input id="profile_picture" v-on:change="onFileChange" @click="getCurrentField(count)" :ref="count" accept=".pdf" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" autoComplete="on" />
                      <div class="btn btn-xs bg-red-600 text-white hover:cursor-pointer" @click="removeFile(count)">Remove</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-2 mt-6">
                <router-link v-if="status == 'update'" class="btn bg-red-800 hover:bg-red-900 text-white" :to="{ name: 'dashboard' }">Cancel</router-link>
                <button type="submit" class="btn bg-[#001510] hover:bg-indigo-600 text-white" ref="submit_button">Submit</button>
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
  name: 'Signin',
  setup() {
    const $http = inject("$http")
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()

    const file_count = ref(0)
    const file_names = ref([])
    const uploaded_files = ref([])

    const status = ref('create')

    const documents = ref([])

    const current_document = ref(0)

    const submit_button = ref(null)

    const onSubmit = () => {
      const formData = new FormData()
      // formData.append('file_names', JSON.stringify(file_names.value))
      file_names.value.forEach((name, index) => {
        formData.append('names['+index+']', name)
      })
      uploaded_files.value.forEach((file, index) => {
        formData.append('files['+index+']', file)
      })
      submit_button.value.innerHTML = 'Uploading...'
      submit_button.value.setAttribute('disabled', 'disabled')
      if (status.value === 'create') {
        $http.post(`/restaurant/${route.params.uuid}/documents/store`, formData)
          .then(() => {
            router.push({ name: 'dashboard' })
            toast.success('Documents saved Successfully')
          })
          .catch(error => {
            toast.error(error.response.data.message)
          })
          .finally(() => {
            submit_button.value.innerHTML = 'Submit'
            submit_button.value.removeAttribute('disabled')
          })
      } else {
        $http.post(`/restaurant/${route.params.uuid}/documents/update`, formData)
          .then(() => {
            router.push({ name: 'restaurant-details', params: { id: route.params.uuid }})
            toast.success('Documents saved Successfully')
          })
          .catch(error => {
            toast.error(error.response.data.message)
          })
          .finally(() => {
            submit_button.value.innerHTML = 'Submit'
            submit_button.value.removeAttribute('disabled')
          })
      }
    }

    onMounted(() => {
      file_count.value += 1
      $http.get(`/restaurant/restaurants/${route.params.uuid}`)
        .then(response => {
          if (response.data.data.relationships.documents.length > 0) {
            documents.value = response.data.data.relationships.documents
            documents.value.forEach((file, index) => {
              file_names.value[index + 1] = file.document_name
              file_count.value += 1
            })
            status.value = 'update'
          }
        })
    })

    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      uploaded_files.value[current_document.value] = files[0];
    }

    const getCurrentField = (count) => {
      current_document.value = count
      // uploaded_files.value[current_document.value] = ref(null)
    }

    const removeFile = (index) => {
      if (file_count.value == 1) {
        toast.error('At least one file is required')
        return
      }
      file_count.value -= 1
      file_names.value.splice(index, 1)
      files.value.splice(index, 1)
    }

    return {
      file_count,
      file_names,
      onSubmit,
      onFileChange,
      removeFile,
      getCurrentField,
      submit_button,
    }
  }
}
</script>