<script setup>
import ApiService from "../api/ApiService";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import RestaurantItem from "../components/RestaurantItem.vue";
import OrderItem from "../components/OrderItem.vue";

const orders = ref([]);

async function loadRestaurantOrders() {
  orders.value = await ApiService.getRestaurantOrders();
}

async function onOrderCanceled() {
  loadRestaurantOrders();
}
onMounted(() => {
  loadRestaurantOrders();
});
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">Commandes</h1>
    </header>
    <div class="orders">
      <OrderItem
        @onOrderCanceled="onOrderCanceled"
        v-for="order in orders"
        :key="order._id"
        :order="order"
      />
    </div>
  </div>
</template>

<style scoped>
.orders {
  margin-top: 20px;
}
</style>
