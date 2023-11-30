import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/user";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/AppDashboard.vue";
import DashboardRestaurants from "../pages/AppDashboardRestaurants.vue";
import CreateRestaurant from "../pages/AppDashboardCreateRestaurant.vue";
import MyRestaurant from "../pages/AppDashboardMyRestaurant.vue";
import DashboardPlates from "../pages/AppDashboardPlates.vue";
import DashboardOrders from "../pages/AppDashboardOrders.vue";
import EditPlate from "../pages/AppDashboardEditPlate.vue";

function checkAuth(to, from, next) {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
}

function checkAnonymous(to, from, next) {
  if (localStorage.getItem("accessToken")) {
    next({ path: "/" });
  } else {
    next();
  }
}

async function checkRestaurantRole(to, from, next) {
  const userStore = useUserStore();
  await userStore.fetchUser();
  switch (userStore.user?.role) {
    case "RESTAURANT":
      next();
      break;
    case "ADMIN":
      next({ path: "/dashboard/restaurants" });
      break;
    default:
      userStore.logout();
      next({ path: "/" });
  }
}

async function checkAdminRole(to, from, next) {
  const userStore = useUserStore();
  await userStore.fetchUser();
  if (userStore.user?.role === "ADMIN") {
    next();
  } else {
    userStore.logout();
    next({ path: "/" });
  }
}

const routes = [
  { path: "/:pathMatch(.*)*", redirect: "/dashboard" },
  { path: "/login", component: Login, beforeEnter: checkAnonymous },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: checkAuth,
    redirect: "/dashboard/restaurants",
    children: [
      {
        path: "restaurants",
        component: DashboardRestaurants,
        beforeEnter: checkAdminRole,
      },
      {
        path: "restaurants/create",
        component: CreateRestaurant,
        beforeEnter: checkAdminRole,
      },
      {
        path: "my-restaurant",
        component: MyRestaurant,
        beforeEnter: checkRestaurantRole,
      },
      {
        path: "plates",
        component: DashboardPlates,
        beforeEnter: checkRestaurantRole,
      },
      {
        path: "plates/:plate_id/edit",
        component: EditPlate,
        beforeEnter: checkRestaurantRole,
      },
      {
        path: "orders",
        component: DashboardOrders,
        beforeEnter: checkRestaurantRole,
      },
    ],
  },
];

const appRouter = createRouter({
  history: createWebHistory(),
  routes,
});

export default appRouter;
