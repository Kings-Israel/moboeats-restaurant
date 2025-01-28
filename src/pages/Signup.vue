<template>
  <main class="bg-white dark:bg-slate-900">

    <div class="relative flex flex-col-reverse lg:flex-row">

      <!-- Content -->
      <div class="w-full lg:w-3/5">
        <div class="min-h-[85dvh] lg:min-h-[100dvh] h-full flex flex-col bg-[#2E5945] justify-center md:px-12">
          <div class="lg:w-[90%] bg-slate-50 rounded-md p-6">
            <h1 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-4">Create your Account ✨</h1>
        
            <h3 class="text-xl text-slate-700 font-bold my-2">Personal Details</h3>
            <!-- Form -->
            <form @submit.prevent="onSubmit">
              <div class="block md:grid md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium mb-1" for="name">Full Name <span class="text-rose-500">*</span></label>
                  <input id="name" class="w-full rounded-md border-2 border-slate-400 text-slate-800" type="text" v-model="name" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="email">Email Address <span class="text-rose-500">*</span></label>
                  <input id="email" class="w-full rounded-md border-2 border-slate-400" type="email" v-model="email" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="name">Phone Number <span class="text-rose-500">*</span></label>
                  <input id="phone_number" class="w-full rounded-md border-2 border-slate-400 text-slate-800" type="tel" v-model="phone_number" />
                </div>
                <div class="col-span-2 block md:grid md:grid-cols-2 gap-3">
                  <div>
                    <div class="flex justify-between">
                        <label class="block text-sm font-medium mb-1" for="password">Password</label>
                        <i class="fas fa-eye cursor-pointer" id="show-password" @click="showPassword"></i>
                        <i class="fas fa-eye-slash cursor-pointer hidden" id="hide-password" @click="showPassword"></i>
                    </div>
                    <input id="password" class="w-full rounded-md border-2 border-slate-400 text-slate-800" type="password" autoComplete="on" v-model="password"  />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="password">Re-enter Password</label>
                    <input id="confirm_password" class="w-full rounded-md border-2 border-slate-400 text-slate-800" type="password" autoComplete="on" v-model="password_confirmation" />
                  </div>
                </div>
                <div class="col-span-2">
                  <label class="block text-sm font-medium mb-1" for="profile_picture">Profile Picture</label>
                  <input id="profile_picture" v-on:change="onFileChange" accept=".jpg,.jpeg,.png" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" autoComplete="on" />
                </div>
              </div>
              <div class="block md:flex mt-4">
                <label class="my-auto block text-sm font-medium mb-1" for="profile_picture">I am a:</label>
                <div class="flex-none md:flex my-auto">
                  <div class="px-3">
                    <!-- Start -->
                    <label class="flex items-center">
                      <input type="radio" name="menu-active" v-model="type" value="both" class="form-radio" />
                      <span class="text-sm font-bold ml-2">Partner Branch and Grocery Shop</span>
                    </label>
                    <!-- End -->
                  </div>
  
                  <div class="px-3">
                    <!-- Start -->
                    <label class="flex items-center">
                      <input type="radio" name="menu-active" v-model="type" value="restaurant" class="form-radio" />
                      <span class="text-sm font-bold ml-2">Partner Branch</span>
                    </label>
                    <!-- End -->
                  </div>
  
                  <div class="px-3">
                    <!-- Start -->
                    <label class="flex items-center">
                      <input type="radio" name="menu-active" v-model="type" value="grocery shop" class="form-radio" />
                      <span class="text-sm font-bold ml-2">Grocery Shop</span>
                    </label>
                    <!-- End -->
                  </div>
                </div>
              </div>
              <div class="px-0 py-4">
                <!-- Start -->
                <label class="flex items-center">
                  <input type="checkbox" name="menu-active" v-model="accept_terms" class="form-checkbox" />
                  <span class="text-sm font-bold ml-2">I agree to the <span class="underline font-bold text-green-900 hover:cursor-pointer" @click="showTerms(true)">terms and conditions</span> and <span class="underline font-bold text-green-900 hover:cursor-pointer" @click="showMerchantTerms(true)">Merchant Agreement</span></span>
                </label>
                <!-- End -->
              </div>
              <modal-action id='terms' :add-class="'max-w-4xl'" :modal-open="showTermsModal" @close-modal="showTerms(false)">
                <div class="relative p-4 w-full max-w-4xl">
                  <!-- Modal content -->
                  <div class="relative bg-primary-one rounded-lg shadow">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold">
                          Terms and Conditions
                        </h3>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5 space-y-4">
                        <span class="font-bold">
                          Welcome to Mobo Eats! We are delighted to partner with you as a merchant to our customers
                          through our platform. Please carefully review and understand the following terms and
                          conditions governing our partnership:
                        </span>
                        <ul class="list-disc space-y-3">
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                  Partnership Agreement:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>By registering as a merchant with Mobo Eats, you agree to enter into a
                                        partnership agreement to sell your products through our platform.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Merchant Responsibilities:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Provide accurate and up-to-date information about your business, including
                                        menu items, prices, availability, and business hours.
                                    </li>
                                    <li>Maintain high-quality standards for food and grocery items, ensuring freshness,
                                        cleanliness, and adherence to food safety regulations.
                                    </li>
                                    <li>Fulfil orders promptly within the specified time frame agreed upon with
                                        customers and our platform.
                                    </li>
                                    <li>Notify us immediately of any changes to your menu, prices, availability, or
                                        operational status that may affect orders.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Order Management:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Acknowledge and accept orders received through our platform within a
                                        reasonable time frame.
                                    </li>
                                    <li>Ensure that orders are prepared accurately and packaged securely to maintain
                                        quality during delivery.
                                    </li>
                                    <li>Confirm the driver as they start their delivery.
                                    </li>
                                    <li>Communicate any delays, cancellations, or issues with orders to our platform
                                        and customers promptly.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Pricing and Payment:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Set and update prices for your products in accordance with our platform's
                                        guidelines and pricing policies.
                                    </li>
                                    <li>Receive payments for orders through our platform based on agreed-upon terms
                                        and payment schedules.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Quality Assurance:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Comply with all applicable laws, regulations, and industry standards related to
                                        food safety, hygiene, and quality control.
                                    </li>
                                    <li>Address customer complaints or issues regarding product quality, order
                                        accuracy, or service promptly and professionally.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Delivery and Pickup Options:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Offer delivery, pickup and dine in options based on your operational capabilities
                                        and agreements with our platform.
                                    </li>
                                    <li>Ensure that delivery personnel (if applicable) representing your business
                                        maintain professionalism, adhere to traffic laws, and follow safety protocols
                                        during deliveries.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Intellectual Property:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Retain ownership of your intellectual property, including trademarks, logos, and
                                        content provided to our platform.
                                    </li>
                                    <li>Grant Mobo Eats Ltd a limited, non-exclusive license to use your intellectual
                                        property solely for the purpose of promoting and facilitating transactions on our
                                        platform.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Data and Privacy:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Protect customer data and privacy in accordance with applicable data
                                        protection laws and our privacy policy.
                                    </li>
                                    <li>Use customer data obtained through our platform only for order fulfilment and
                                        customer service purposes.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Termination of Partnership:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Either party may terminate this partnership agreement with notice of 1 month.
                                    </li>
                                    <li>We reserve the right to suspend or terminate your merchant account on our
                                        platform in case of non-compliance with these terms and conditions, breach of
                                        contract, or other violations.
                                    </li>
                                </ul>
                            </li>
                            <li class="flex flex-col">
                                <span class="font-bold text-lg">
                                    Updates to Terms:
                                </span>
                                <ul class="list-decimal font-semibold mx-4 space-y-2">
                                    <li>Mobo Eats reserves the right to update or modify these terms and conditions as
                                        needed. We will communicate any changes to you in a timely manner.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <span class="mx-4 space-y-4 font-bold">
                        By continuing to partner with Mobo Eats Ltd, you acknowledge that you have read, understood,
                        and agreed to abide by these terms and conditions. We look forward to a successful and
                        mutually beneficial partnership.
                    </span>
                  </div>
                </div>
              </modal-action>
              <modal-action id='terms' :add-class="'max-w-4xl'" :modal-open="showMerchantTermsModal" @close-modal="showMerchantTerms(false)">
                <div class="relative p-4 w-full max-w-4xl">
                  <div class="relative p-4 w-full max-w-4xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-primary-one rounded-lg shadow">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold">
                                Merchant Agreement
                            </h3>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4 md:p-5 space-y-4">
                            <ul class="list-disc space-y-3">
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Payment Settlement:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>Payments for orders fulfilled through our food dine in and grocery delivery
                                            platform will be settled based on agreed-upon terms between Mobo Eats and
                                            the merchant.
                                        </li>
                                        <li>Settlements may occur weekly or monthly, depending on the payment schedule
                                            agreed upon during the merchant onboarding process.
                                        </li>
                                    </ul>
                                </li>
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Commission and Fees:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>Mobo Eats may charge commission or service fee for facilitating orders and
                                            delivery services through our platform.
                                        </li>
                                        <li>The commission rate and any applicable fees will be clearly communicated to
                                            the merchant before entering into a partnership agreement.
                                        </li>
                                    </ul>
                                </li>
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Payment Calculation:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>The payment amount to the merchant will be calculated based on the total value
                                            of orders fulfilled minus any applicable commissions, fees, or deductions as per
                                            the agreement.
                                        </li>
                                        <li>Taxes and other government-mandated deductions may apply and will be
                                            deducted as required by law.
                                        </li>
                                    </ul>
                                </li>
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Invoicing and Statements:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>Merchants will receive detailed invoices or statements outlining the
                                            transactions, commission charges, fees, and net payment amounts.
                                        </li>
                                        <li>Invoices or statements will typically be provided electronically through our
                                            merchant portal or via email.
                                        </li>
                                    </ul>
                                </li>
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Payment Methods:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>Payments to merchants will be made through the agreed-upon payment
                                            method(s), which may include:
                                            <ul class="list-decimal font-semibold mx-6 space-y-2">
                                                <li>Bank transfers: Direct deposits to the merchant's designated bank
                                                    account.
                                                </li>
                                                <li>Online payment platforms: Secure electronic transfers via payment
                                                    gateways.
                                                </li>
                                                <li>Checks: Physical checks issued to the merchant's mailing address (if
                                                    applicable).
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Payment Disputes and Resolutions:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>In case of payment discrepancies or disputes, merchants must notify Mobo Eats
                                            promptly to initiate a resolution process.
                                        </li>
                                        <li>Both parties agree to resolve payment disputes amicably through
                                            communication and negotiation.
                                        </li>
                                        <li>If a resolution cannot be reached, arbitration or legal measures may be pursued
                                            as per the terms of the partnership agreement.
                                        </li>
                                    </ul>
                                </li>
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Late Payments and Penalties:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>Merchants are expected to adhere to the payment schedule outlined in the
                                            agreement.
                                        </li>
                                        <li>Late payments may incur penalties, such as interest charges or suspension of
                                            services, as per the terms of the agreement and applicable laws.
                                        </li>
                                    </ul>
                                </li>
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Currency and Taxes:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>All payments will be made in the agreed currency (e.g., GBP, USD, EUR, etc.)
                                            unless otherwise specified.
                                        </li>
                                        <li>Merchants are responsible for any taxes, duties, or fees imposed by local
                                            authorities related to the services provided through our platform.
                                        </li>
                                    </ul>
                                </li>
                                <li class="flex flex-col">
                                    <span class="font-bold text-lg">
                                        Updates to Payment Policy:
                                    </span>
                                    <ul class="list-decimal font-semibold mx-4 space-y-2">
                                        <li>This payment policy is subject to updates or modifications with mutual
                                            agreement between Mobo Eats and the merchant.
                                        </li>
                                        <li>Any changes to the payment policy will be communicated in writing and
                                            acknowledged by both parties.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <span class="mx-4 space-y-4 font-bold">
                            By partnering with Mobo Eats, merchants acknowledge that they have read, understood, and
                            agreed to abide by the terms and conditions outlined in this payment policy.
                        </span>
                    </div>
                </div>
                </div>
              </modal-action>
              <div class="flex justify-end mt-6">
                <button :disabled="!accept_terms" class="btn bg-[#2E5945] disabled:bg-[#89bca4] hover:bg-indigo-600 text-white ml-3 whitespace-nowrap tracking-lighter font-bold transition duration-100 ease-in-out" type="submit">Sign Up</button>
              </div>
            </form>
            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
              <div class="font-bold">
                Have an account? <router-link class="text-lg text-[#2E5945] hover:text-indigo-600 dark:hover:text-indigo-400 underline transition duration-100 ease-in-out" to="/signin">Sign In</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div class="lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:md:w-2/5 bg-[#2E5945]" aria-hidden="true">
        <img
          src="../images/1024.png"
          class="my-auto mx-auto lg:mx-24 object-contain w-32 lg:w-96 lg:mt-44"
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
import ModalAction from '../components/ModalAction.vue'

export default {
  name: 'Signup',
  components: {
    ModalAction
  },
  setup() {
    const $http = inject("$http")
    const router = useRouter()
    const toast = useToast()

    const name = ref('')
    const email = ref('')
    const phone_number = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const avatar = ref('')
    const type = ref('both')

    const accept_terms = ref(false)

    const showTermsModal = ref(false)
    const showMerchantTermsModal = ref(false)

    const showTerms = (state) => {
      showTermsModal.value = state
    }

    const showMerchantTerms = (state) => {
      showMerchantTermsModal.value = state
    }

    const password_showing = ref(false)

    const onSubmit = () => {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('email', email.value)
      formData.append('phone', phone_number.value)
      formData.append('password', password.value)
      formData.append('password_confirmation', password_confirmation.value)
      formData.append('image', avatar.value)
      formData.append('userType', 'restaurant')
      formData.append('type', type.value)

      $http.post('/register', formData)
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
          localStorage.setItem('token', response.data.data.token)
          toast.success('Registration successful')
          router.push({ name: 'create-restaurant' })
        })
        .catch(error => {
          toast.error(error.response.data.message)
        })
    }

    const showPassword = () => {
        password_showing.value = !password_showing.value
        if (password_showing.value) {
            document.getElementById('show-password').classList.add('hidden')
            document.getElementById('hide-password').classList.remove('hidden')
            document.getElementById('password').type = 'text'
            document.getElementById('confirm_password').type = 'text'
        } else {
            document.getElementById('show-password').classList.remove('hidden')
            document.getElementById('hide-password').classList.add('hidden')
            document.getElementById('password').type = 'password'
            document.getElementById('confirm_password').type = 'password'
        }
    }

    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      avatar.value = files[0];
    }

    return  {
      name,
      email,
      phone_number,
      password,
      password_confirmation,
      type,
      accept_terms,
      onFileChange,
      showTermsModal,
      showTerms,
      showMerchantTermsModal,
      showMerchantTerms,

      onSubmit,
      showPassword
    }
  }
}
</script>