<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import ApiService from "../api/ApiService";

const props = defineProps({
  order: Object,
  onOrderCanceled: Function,
});

const total = computed(() =>
  props?.order?.items?.reduce((total, item) => total + item.price, 0)
);

async function cancelOrder() {
  const canceledOrder = await ApiService.cancelOrder(props?.order?._id);
  props?.onOrderCanceled?.();
}
</script>

<template>
  <div class="order-item-wrapper">
    <div class="order-item">
      <div class="order-client col">{{ order?.user?.email }}</div>
      <div class="order-total col">{{ total }}€</div>
      <div class="order-nb-articles col">{{ order?.items?.length }}€</div>
      <div class="order-actions col">
        <button @click="cancelOrder" class="button button-error">
          Annuler la commande
        </button>
      </div>
    </div>
    <div class="items">
      <div class="item" v-for="orderItem in order?.items" :key="orderItem?._id">
        <img class="item-image" :src="orderItem?.image" alt="" />
        <div class="item-infos">
          <div class="item-title">{{ orderItem?.name }}</div>
          <div class="item-price">{{ orderItem?.price }}€</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-item {
  display: flex;
  align-items: center;
}

.order-item-wrapper {
  background-color: white;
  padding: 20px;
  margin: 5px;
}

.col {
  flex: 1;
}

.item {
  display: flex;
  align-items: center;
  padding: 10px;
}

.item-image {
  width: 70px;
  margin-right: 16px;
}
.item-title {
  font-weight: bold;
}
</style>
