<template>
  <div class="min-w-fit">
    <VOnboardingWrapper ref="wrapper" :steps="steps" />

    <!-- Sidebar backdrop (mobile only) -->
    <div class="fixed inset-0 bg-[#2E5945] bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200" :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-[#2E5945] p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >

      <!-- Sidebar header -->
      <div class="flex justify-between lg:justify-center mb-10 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-slate-500 hover:text-yellow-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="flex" to="/">
          <img src="../images/1024.png" class="w-24 h-28 mx-auto object-contain" alt="" id="mobo-logo">
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <ul class="mt-3">
            <!-- Dashboard -->
            <router-link :to="{ name: 'dashboard' }" custom v-slot="{ href, navigate, isExactActive }" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'hover:text-slate-200' : 'hover:text-white'" href="#0" @click.prevent="parentLink.handleClick(); sidebarExpanded = true">
              <div id="dashboard-link" class="px-3 py-2 rounded-sm mb-0.5 text-slate-200 truncate transition duration-150 flex items-center gap-3" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                  <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-yellow-500' : 'text-yellow-400'" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                  <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-yellow-600' : 'text-white'" d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                  <path class="fill-current" :class="(currentRoute.fullPath === '/' || currentRoute.fullPath.includes('dashboard')) ? 'text-yellow-200' : 'text-yellow-400'" d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />                      
                </svg>
                <a class="block transition duration-150 truncate" :class="isExactActive ? 'text-yellow-500' : 'text-white hover:text-slate-200'" :href="href" @click="navigate">
                  <span class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                </a>
              </div>
            </router-link>
            <!-- Orders -->
            <router-link to="/orders" custom v-slot="{ href, navigate, isExactActive }">
              <li id="orders-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="currentRoute.fullPath.includes('orders') ? 'text-yellow-300' : 'text-yellow-400'" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('orders') ? 'text-yellow-600' : 'text-white'" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('orders') ? 'text-yellow-500' : 'text-yellow-600'" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />                    
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Orders</span>
                    </div>
                    <!-- Badge -->
                    <div class="flex flex-shrink-0 ml-2">
                      <span class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-yellow-500 px-2 rounded">{{ orders_count }}</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Dine ins -->
            <router-link to="/dine-ins" custom v-slot="{ href, navigate, isExactActive }">
              <li id="dineins-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="currentRoute.fullPath.includes('dine-ins') ? 'text-yellow-300' : 'text-yellow-400'" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('dine-ins') ? 'text-yellow-600' : 'text-white'" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('dine-ins') ? 'text-yellow-500' : 'text-yellow-600'" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z" />                    
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dine ins</span>
                    </div>
                    <!-- Badge -->
                    <div class="flex flex-shrink-0 ml-2">
                      <span class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-yellow-500 px-2 rounded">{{ dine_ins_count }}</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Payments -->
            <router-link to="/payments" custom v-slot="{ href, navigate, isExactActive }">
              <li id="payments-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="currentRoute.fullPath.includes('payments') ? 'text-yellow-600' : 'text-yellow-700'" d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('payments') ? 'text-yellow-500' : 'text-white'" d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('payments') ? 'text-yellow-300' : 'text-yellow-400'" d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z" />                      
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Payments</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Restaurants -->
            <router-link v-if="role == 'restaurant'" to="/restaurants" custom v-slot="{ href, navigate, isExactActive }">
              <li id="branches-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                        <g fill="#212121" class="nc-icon-wrapper">
                          <path class="fill-current" :class="currentRoute.fullPath.includes('restaurants') ? 'text-yellow-300' : 'text-white'" d="M7.938,22.308,7.914,22H5.33c-.186,0-.33-.256-.33-.477a3.533,3.533,0,0,1,.205-.927,7.923,7.923,0,0,0,.421-2.468,15.029,15.029,0,0,0-.18-2.083,28.074,28.074,0,0,1-.289-4.119A16.64,16.64,0,0,1,6.336,6.6,9.027,9.027,0,0,0,7,4V3H9V4a9.027,9.027,0,0,0,.664,2.6l.145.422c.064,0,.126-.02.191-.02h1.911c-.122-.373-.244-.73-.357-1.057A9.388,9.388,0,0,1,11,4V1a1,1,0,0,0-1-1H6A1,1,0,0,0,5,1V4a9.388,9.388,0,0,1-.554,1.943,18.517,18.517,0,0,0-1.289,5.983,29.777,29.777,0,0,0,.307,4.383,13.36,13.36,0,0,1,.162,1.819,6.046,6.046,0,0,1-.335,1.889A5.117,5.117,0,0,0,3,21.523,2.409,2.409,0,0,0,5.33,24H8.485A3.93,3.93,0,0,1,7.938,22.308Z" fill="#212121">
                          </path>
                          <path class="fill-current" :class="currentRoute.fullPath.includes('restaurants') ? 'text-yellow-300' : 'text-yellow-400'" d="M20.734,9.32A1,1,0,0,0,20,9H10a1,1,0,0,0-1,1.077l.929,12.077A2.01,2.01,0,0,0,11.926,24h6.148a2.008,2.008,0,0,0,1.994-1.846L21,10.077A1,1,0,0,0,20.734,9.32Z" data-color="color-2">
                          </path>
                        </g>
                      </svg>
                      <span v-if="type == 'both'" class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Branches & Shops</span>
                      <span v-else-if="type == 'restaurant'" class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Branches</span>
                      <span v-else-if="type == 'grocery shop'" class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Grocery Shops</span>
                      <span v-else class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Shops</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link> 
            <!-- Menus -->
            <router-link v-if="role == 'restaurant' && (type == 'both' || type == 'restaurant')" to="/menus" custom v-slot="{ href, navigate, isExactActive }">
              <li id="menus-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="currentRoute.fullPath.includes('menus') ? 'text-yellow-500' : 'text-white'" d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('menus') ? 'text-yellow-300' : 'text-yellow-400'" d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />                    
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Menus</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Groceries -->
            <router-link v-if="role == 'restaurant' && (type == 'both' || type == 'grocery shop')" custom v-slot="{ href, navigate, isExactActive }" to="/groceries">
              <li id="groceries-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <circle class="fill-current" :class="currentRoute.fullPath.includes('groceries') ? 'text-yellow-500' : 'text-white'" cx="16" cy="8" r="8" />
                        <circle class="fill-current" :class="currentRoute.fullPath.includes('groceries') ? 'text-yellow-300' : 'text-yellow-400'" cx="8" cy="16" r="8" />                      
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Groceries</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Promo Codes -->
            <router-link custom v-slot="{ href, navigate, isExactActive }" to="/promo-codes">
              <li id="promocodes-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="currentRoute.fullPath.includes('promo-codes') ? 'text-yellow-600' : 'text-yellow-400'" d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('promo-codes') ? 'text-yellow-500' : 'text-white'" d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('promo-codes') ? 'text-yellow-300' : 'text-yellow-400'" d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z" />                      
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Promo Codes</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Discounts -->
            <router-link custom v-slot="{ href, navigate, isExactActive }" to="/discounts">
              <li id="discounts-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-[#1c2e2a] rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="currentRoute.fullPath.includes('discounts') ? 'text-yellow-500' : 'text-yellow-400'" d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('discounts') ? 'text-yellow-300' : 'text-white'" d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('discounts') ? 'text-yellow-500' : 'text-yellow-400'" d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                        <path class="fill-current" :class="currentRoute.fullPath.includes('discounts') ? 'text-yellow-300' : 'text-white'" d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />                      
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Discounts</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Messages -->
            <router-link to="/messages" custom v-slot="{ href, navigate, isExactActive }">
              <li id="messages-link" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900 rounded-xl'">
                <a class="block text-slate-200 truncate transition duration-150" :class="isExactActive ? 'hover:text-slate-200' : 'hover:text-white'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path class="fill-current" :class="isExactActive ? 'text-yellow-500' : 'text-yellow-600'" d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
                        <path class="fill-current" :class="isExactActive ? 'text-yellow-300' : 'text-yellow-400'" d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Messages</span>
                    </div>
                    <!-- Badge -->
                    <div class="flex flex-shrink-0 ml-2">
                      <span class="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-yellow-500 px-2 rounded">{{ unread_messages_count }}</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>      
          </ul>
        </div>
      </div>

      <!-- Expand / collapse button -->
      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click.prevent="sidebarExpanded = !sidebarExpanded">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg class="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
              <path class="text-yellow-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
              <path class="text-yellow-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import { VOnboardingWrapper, useVOnboarding } from 'v-onboarding'
import 'v-onboarding/dist/style.css'

import SidebarLinkGroup from './SidebarLinkGroup.vue'

export default {
  name: 'Sidebar',
  props: ['sidebarOpen'],
  components: {
    SidebarLinkGroup,
    VOnboardingWrapper
  },  
  setup(props, { emit }) {
    const $http = inject("$http")
    const trigger = ref(null)
    const sidebar = ref(null)

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
    const sidebarExpanded = ref(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')

    const currentRoute = useRouter().currentRoute.value

    const role = ref('')
    const type = ref('')
    const orders_count = ref(0)
    const dine_ins_count = ref(0)
    const unread_messages_count = ref(0)
    const is_guided = ref(false)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      ) return
      emit('close-sidebar')
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return
      emit('close-sidebar')
    }

    const getOrders = () => {
      $http.get('/restaurant/pending-orders')
        .then(response => {
          orders_count.value = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    const getDineins = () => {
      $http.get('/restaurant/pending-dineins')
        .then(response => {
          dine_ins_count.value = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    const getUnreadMessagesCount = () => {
      $http.get('/messages/unread/count')
        .then(response => {
          unread_messages_count.value = response.data.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }

    onMounted(() => {
      role.value = localStorage.getItem('role')
      type.value = JSON.parse(localStorage.getItem('user')).type
      is_guided.value = JSON.parse(localStorage.getItem('user')).is_guided
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
      getOrders()
      getDineins()
      getUnreadMessagesCount()
      if (!is_guided.value) {
        start()
      }
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    const wrapper = ref(null)
    const { start, goToStep, finish } = useVOnboarding(wrapper)

    const steps = [
      { attachTo: { element: '#mobo-logo' }, content: { title: "Welcome to your Moboeats Dashboard!", description: "Click next for us to take your through the features" } },
      { attachTo: { element: '#dashboard-link' }, content: { title: "Dashboard!", description: "Get a brief overview of your orders, branches and payments." } },
      { attachTo: { element: '#orders-link' }, content: { title: "Orders!", description: "A list of all your orders and their status" } },
      { attachTo: { element: '#dineins-link' }, content: { title: "Dine Ins!", description: "View all your bookings that have been made to your branches" } },
      { attachTo: 
        { 
          element: '#payments-link' 
        }, 
        content: { 
          title: "Payments!", 
          description: "Keep track of all payments made." 
        },
        on: {
          afterStep: function (options) {
            if (role.value == 'restaurant' && (type.value == 'both' || type.value == 'restaurant')) {
              goToStep(5)
            } else if(role.value == 'restaurant' && (type.value == 'both' || type.value == 'grocery shop')) {
              goToStep(6)
            } else {
              goToStep(6)
            }
          }
        }
      },
      { attachTo: { element: '#branches-link' }, content: { title: "Branches!", description: "Manage multiple branches." } },
      { attachTo: 
        { element: '#menus-link' }, 
        content: { title: "Menu!", description: "Manage what you offer in all your branches" },
        on: {
          afterStep: function (options) {
            if(role.value == 'restaurant' && (type.value == 'both' || type.value == 'grocery shop')) {
              goToStep(7)
            } else {
              goToStep(8)
            }
          }
        }
      },
      { attachTo: { element: '#groceries-link' }, content: { title: "Groceries!", description: "Manage the groceries that you offer. Add new and update existing ones." } },
      { attachTo: { element: '#promocodes-link' }, content: { title: "Promocodes!", description: "Add and Manage Promo codes for your items in your menu" } },
      { attachTo: { element: '#discounts-link' }, content: { title: "Discounts!", description: "Add and view discount performance for your menu items" } },
      { 
        attachTo: { element: '#messages-link' }, 
        content: { title: "Messaging!", description: "Have direct contact with our support incase in need of any assistance" },
        on: {
          afterStep: function (options) {
            $http.get('/user/guide/update')
              .then(() => {})
              .catch(error => {
                console.log(error)
              })
          }
        }
      },
    ]

    watch(sidebarExpanded, () => {
      localStorage.setItem('sidebar-expanded', sidebarExpanded.value)
      if (sidebarExpanded.value) {
        document.querySelector('body').classList.add('sidebar-expanded')
      } else {
        document.querySelector('body').classList.remove('sidebar-expanded')
      }
    })

    return {
      wrapper,
      steps,
      trigger,
      sidebar,
      sidebarExpanded,
      currentRoute,
      role,
      type,
      orders_count,
      dine_ins_count,
      unread_messages_count,
    }
  },
}
</script>