<template>
  <main class="bg-[#2E5945]">
    <div class="">
      <!-- Content -->
      <div class="w-full">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div
              class="flex items-center justify-center h-16 px-4 sm:px-6 lg:px-8"
            >
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

          <div
            class="mx-auto w-full lg:w-[40%] px-2 py-2 bg-gray-100 rounded-md"
          >
            <div class="md:flex md:justify-between mb-6">
              <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold">
                Complete Registration Fee Payment! ✨
              </h1>
            </div>
            <p class="text-2xl text-slate-800 dark:text-slate-100 font-semibold mb-4 text-center">
              Kindly Pay <strong>{{ registrationFee }}</strong> to complete your registration.
            </p>
            <!-- Form -->
            <form @submit.prevent="completePayment">
              <div class="space-y-4"></div>
              <div class="flex justify-end gap-2 mt-6">
                <button
                  type="submit"
                  class="btn bg-[#001510] hover:bg-indigo-600 text-white"
                  ref="submit_button"
                >
                  Proced
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "RegistrationPayment",
  setup() {
    const $http = inject("$http");
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    const registrationFee = ref(0);

    const onSubmit = () => {
      const formData = new FormData();
    };

    onMounted(() => {
      toast.success("Complete Registration Fee Payment to Proceed");
      $http
        .get(`/restaurant/${route.params.uuid}/registration/fee-payment`)
        .then((res) => {
          if (res.data.message == "paid") {
            router.push({
              name: "restaurant-details",
              params: { id: route.params.uuid },
            });
            toast.success("Registration Fee already paid");
          } else {
            registrationFee.value = res.data.data.data;
            if (registrationFee.value == 0) {
              router.push({
                name: "restaurant-details",
                params: { id: route.params.uuid },
              });
              toast.success("Restaurant Registration Successful");
            }
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    });

    const completePayment = () => {
      $http
        .post(
          `/restaurant/${route.params.uuid}/registration/fee-payment/complete`
        )
        .then((res) => {
          router.push({
            name: "restaurant-details",
            params: { id: route.params.uuid },
          });
          toast.success("Registration Fee paid successfully");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };

    return {
      onSubmit,
      registrationFee,
      completePayment,
    };
  },
};
</script>
