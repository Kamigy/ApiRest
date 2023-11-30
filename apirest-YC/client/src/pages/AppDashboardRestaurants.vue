<script setup>
import ApiService from "../api/ApiService";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import RestaurantItem from "../components/RestaurantItem.vue";

const restaurantsAccounts = ref([]);

async function loadRestaurantAccounts() {
  restaurantsAccounts.value = await ApiService.getRestaurantAccounts();
}

onMounted(() => {
  loadRestaurantAccounts();
});
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Restaurants</h1>
      <RouterLink
        to="/dashboard/restaurants/create"
        class="add-restaurant button"
        >Ajouter un restaurateur</RouterLink
      >
    </header>
    <div class="restaurants">
      <RestaurantItem
        :on-deleted="loadRestaurantAccounts"
        v-for="restaurantAccount in restaurantsAccounts"
        :key="restaurantAccount._id"
        :restaurant-account="restaurantAccount"
      />
    </div>
  </div>
</template>

<style scoped>
.add-restaurant {
  margin-left: auto;
}

.restaurants {
  margin-top: 20px;
}
</style>
