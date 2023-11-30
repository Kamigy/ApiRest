<script setup>
import ApiService from "../api/ApiService";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();

const restaurantAccount = ref({
  name: "",
  address: "",
  postalCode: "",
  city: "",
  email: "",
  password: "",
});

async function createRestaurantUser() {
  await ApiService.createRestaurantUser(restaurantAccount.value);
  router.push("/dashboard/restaurants");
}
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Ajouter un restaurateur</h1>
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
      <input
        v-model="restaurantAccount.email"
        type="text"
        placeholder="Email"
      />
      <input
        v-model="restaurantAccount.password"
        type="text"
        placeholder="Password"
      />
      <button class="button" @click="createRestaurantUser">Ajouter</button>
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
