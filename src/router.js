import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./pages/Dashboard.vue";
import PageNotFound from "./pages/utility/PageNotFound.vue";
import Messages from "./pages/Messages.vue";

import Signin from "./pages/Signin.vue";
import Signup from "./pages/Signup.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";

import CreateRestaurant from "./pages/CreateRestaurant.vue";
import AddOperatingHours from "./pages/AddOperatingHours.vue";
import AddDocuments from "./pages/AddDocuments.vue";
import Orders from "./pages/orders/Orders.vue";
import Dineins from "./pages/orders/Dineins.vue";
import OrderDetails from "./pages/orders/Details.vue";
import Restaurants from "./pages/restaurants/Restaurants.vue";
import RestaurantDetails from "./pages/restaurants/Details.vue";
import Payments from "./pages/payments/Payments.vue";
import Menus from "./pages/menu/Index.vue";
import MenuDetails from "./pages/menu/Details.vue";
import Groceries from "./pages/menu/groceries/Index.vue";
import PromoCodes from "./pages/promo-codes/Index.vue";
import Discounts from "./pages/discounts/Index.vue";
import AddDineInCapacity from "./pages/AddDineInCapacity.vue";
import RegistrationPayment from "./pages/RegistrationPayment.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: Dashboard,
      name: "dashboard",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/orders",
      component: Orders,
      name: "orders",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/dine-ins",
      component: Dineins,
      name: "dine-ins",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/orders/:id",
      component: OrderDetails,
      name: "order-details",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/restaurants",
      component: Restaurants,
      name: "restaurants",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/restaurant/:id",
      component: RestaurantDetails,
      name: "restaurant-details",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/payments",
      component: Payments,
      name: "payments",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/menus",
      component: Menus,
      name: "menus",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/menus/:id",
      component: MenuDetails,
      name: "menu-details",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/groceries",
      component: Groceries,
      name: "groceries",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/promo-codes",
      component: PromoCodes,
      name: "promo-codes",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/discounts",
      component: Discounts,
      name: "discounts",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/messages",
      component: Messages,
    },
    {
      path: "/utility/404",
      component: PageNotFound,
    },
    {
      path: "/signin",
      component: Signin,
      name: "auth-login",
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/signup",
      component: Signup,
      name: "auth-signup",
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/restaurant/:id?/create",
      component: CreateRestaurant,
      name: "create-restaurant",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/restaurant/:uuid/operating-hours/add",
      component: AddOperatingHours,
      name: "add-operating-hours",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/restaurant/:uuid/registration-fee",
      component: RegistrationPayment,
      name: "registration-fee-payment",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/restaurant/:uuid/tables/add",
      component: AddDineInCapacity,
      name: "add-restaurant-tables",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/restaurant/:uuid/documents/add",
      component: AddDocuments,
      name: "add-documents",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/reset-password",
      component: ResetPassword,
      name: "auth-reset-password",
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/forgot-password",
      component: ForgotPassword,
      name: "auth-forgot-password",
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

const isUserLoggedIn = () => {
  return localStorage.getItem("user") && localStorage.getItem("token");
};

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({
        name: "auth-login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isLoggedIn) {
      next({
        name: "dashboard",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
