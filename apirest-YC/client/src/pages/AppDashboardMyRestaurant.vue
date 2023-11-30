<script setup>
import ApiService from "../api/ApiService";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const restaurantAccount = ref({
  name: "",
  address: "",
  postalCode: "",
  city: "",
});

async function updateRestaurantUser() {
  await ApiService.updateRestaurantUser(restaurantAccount.value);
}

async function loadRestaurant() {
  restaurantAccount.value = await ApiService.getLoggedUser();
}
onMounted(() => {
  loadRestaurant();
});
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Mon Restaurant</h1>
    </header>
    <div class="form">
      <input v-model="restaurantAccount.name" type="text" placeholder="Nom" />
      <input
        v-model="restaurantAccount.address"
        type="text"
        placeholder="Addresse"
      />
      <input
        v-model="restaurantAccount.postalCode"
        type="text"
        placeholder="Code Postal"
      />
      <input v-model="restaurantAccount.city" type="text" placeholder="Ville" />
      <button class="button" @click="updateRestaurantUser">Modifier</button>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

input {
  margin: 5px 0;
}

.button {
  margin-top: 20px;
}
</style>
