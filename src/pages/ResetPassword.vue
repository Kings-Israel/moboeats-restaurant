<template>
  <main class="bg-white dark:bg-slate-900">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full md:w-3/5">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1 bg-[#2E5945]">        
          <div class="max-w-sm mx-auto w-full px-4 py-8 bg-gray-100 rounded-md lg:my-44">
            <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Reset your Password ✨</h1>
            <!-- Form -->
            <form @submit.prevent="onSubmit">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="code">Code <span class="text-rose-500">*</span></label>
                  <input id="code" class="form-input w-full" type="text" v-model="code" autocomplete="off" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Password <span class="text-rose-500">*</span></label>
                  <input id="password" class="form-input w-full" type="password" v-model="password" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="Confirm Password">Confirm Password Address <span class="text-rose-500">*</span></label>
                  <input id="password_confirmation" class="form-input w-full" v-model="password_confirmation" type="password" />
                </div>
              </div>
              <div class="flex justify-end mt-6">
                <button class="btn bg-[#2E5945] hover:bg-indigo-600 text-white whitespace-nowrap transition duration-100 ease-in-out font-bold">Reset Password</button>
              </div>
            </form>

            <div
              class="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700"
            >
              <div class="text-sm">
                <router-link
                  class="font-bold underline text-[#2E5945] hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-150 ease-in-out"
                  to="/signin"
                  >Sign In</router-link
                >
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-2/5 bg-[#2E5945]" aria-hidden="true">
        <img
          src="../images/1024.png"
          class="my-auto object-contain w-96 mt-44"
          alt=""
        />
      </div>

    </div>

  </main>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
export default {
  name: 'ResetPassword',
  setup() {
    const $http = inject("$http")
    const router = useRouter()
    const toast = useToast()

    const code = ref('')
    const password = ref('')
    const password_confirmation = ref('')

    const onSubmit = () => {
      const formData = new FormData()
      formData.append('code', code.value)
      formData.append('password', password.value)
      formData.append('password_confirmation', password_confirmation.value)

      $http.post('/reset-password', formData)
        .then(response => {
          router.push({ name: 'auth-login' })
          toast.success('Password has been reset')
        })
        .catch(error => {
          toast.error('Check details')
        })
    }

    return {
      code,
      password,
      password_confirmation,
      onSubmit,
    }
  }
}
</script>