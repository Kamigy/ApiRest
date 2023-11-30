<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const router = useRouter();

function logout() {
  userStore.logout();
  router.push("/login");
}
</script>

<template>
  <div class="page">
    <nav class="nav" v-if="userStore.isAdmin">
      <RouterLink class="nav-item" :to="`/dashboard/restaurants`">
        Restaurants
      </RouterLink>
      <div class="logout-button" @click="logout">Se Déconnecter</div>
    </nav>
    <nav class="nav" v-else-if="userStore.isRestaurant">
      <RouterLink class="nav-item" :to="`/dashboard/my-restaurant`">
        Mon restaurant
      </RouterLink>
      <RouterLink class="nav-item" :to="`/dashboard/plates`">
        Plats
      </RouterLink>
      <RouterLink class="nav-item" :to="`/dashboard/orders`">
        Commandes
      </RouterLink>
      <div class="logout-button" @click="logout">Se Déconnecter</div>
    </nav>
    <RouterView class="content" />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  height: 100%;
}
.content {
  width: 100%;

  padding: 20px;
}

.nav-item {
  padding: 16px;
  background: transparent;
  margin: 10px;
  border-radius: 8px;
  color: black;
}

.nav-item.router-link-active {
  background: #685ed7;
  color: white;
}

.nav {
  background: #fff;
  width: 257px;
  display: flex;
  flex-direction: column;
}

.logout-button {
  color: rgba(0, 0, 0, 0.91);
  font-size: 16px;
  font-weight: 700;
  margin-top: auto;
  text-align: center;
  padding: 26px 0;
  cursor: pointer;
}
</style>
