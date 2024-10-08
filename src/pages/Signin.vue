<template>
  <main class="bg-white dark:bg-slate-900">
    <div class="relative flex flex-col-reverse lg:flex-row">
      <!-- Content -->
      <div class="w-full lg:w-1/2">
        <div class="min-h-[100vh] h-full pt-24 flex flex-col after:flex-1 bg-[#2E5945]">
          <div class="max-w-sm mx-auto w-full px-4 py-8 bg-gray-100 rounded-md lg:mt-28">
            <h1
              class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6"
            >
              Welcome back! ✨
            </h1>
            <!-- Form -->
            <form @submit.prevent="login">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="categories"
                    >Role</label
                  >
                  <select
                    name="role"
                    v-model="role"
                    class="w-full rounded-lg form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="restaurant">Partner Admin</option>
                    <option value="restaurant employee">Partner Employee</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="email"
                    >Email Address</label
                  >
                  <input
                    id="email"
                    class="form-input w-full"
                    type="email"
                    v-model="email"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password"
                    >Password</label
                  >
                  <input
                    id="password"
                    class="form-input w-full"
                    type="password"
                    v-model="password"
                    autoComplete="on"
                  />
                </div>
              </div>
              <div class="flex items-center justify-between mt-6">
                <div class="mr-1">
                  <router-link
                    class="text-sm underline hover:no-underline"
                    to="/forgot-password"
                    >Forgot Password?</router-link
                  >
                </div>
                <button
                  type="submit"
                  class="btn bg-[#2E5945] hover:bg-indigo-600 text-white ml-3 font-bold transition duration-150 ease-in-out"
                >
                  Sign In
                </button>
              </div>
            </form>
            <!-- Footer -->
            <div
              class="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700"
            >
              <div class="text-sm">
                Don’t you have an account?
                <router-link
                  class="font-bold text-[#2E5945] hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-150 ease-in-out"
                  :to="{ name: 'auth-signup' }"
                  >Apply</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div
        class="lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:w-1/2 bg-[#2E5945]"
        aria-hidden="true"
      >
        <img
          src="../images/1024.png"
          class="my-auto mx-auto lg:mx-32 object-contain w-32 lg:w-96 lg:mt-44"
          alt=""
        />
      </div>
    </div>
  </main>
</template>

<script>
import { ref, inject } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  name: "Signin",
  setup() {
    const $http = inject("$http");
    const router = useRouter();
    const toast = useToast();
    const email = ref("");
    const password = ref("");
    const role = ref("restaurant");

    const login = () => {
      $http
        .post("/login", {
          email: email.value,
          password: password.value,
          userType: role.value,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", response.data.data.role);
          if (response.data.data.role == "restaurant") {
            if (response.data.data.restaurants.length > 0) {
              localStorage.setItem(
                "restaurants",
                JSON.stringify(response.data.data.restaurants)
              );
            }
          } else {
            if (response.data.data.restaurant != null) {
              localStorage.setItem(
                "restaurant",
                JSON.stringify(response.data.data.restaurant)
              );
            }
          }
          router.push({ name: "dashboard" });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    };

    return {
      login,
      email,
      password,
      role,
    };
  },
};
</script>
