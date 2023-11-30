<script setup>
import { useRouter } from "vue-router";
import ApiService from "../api/ApiService";

const props = defineProps({
  restaurantAccount: Object,
  onDeleted: Function,
});

async function deleteRestaurant() {
  await ApiService.deleteRestaurant?.(props.restaurantAccount?._id);
  props.onDeleted?.();
}
</script>

<template>
  <div class="restaurant-item">
    <div class="restaurant-item-name">
      {{ restaurantAccount?.name }}
    </div>
    <div class="restaurant-item-email">
      {{ restaurantAccount?.email }}
    </div>
    <div class="restaurant-item-actions">
      <button class="button button-error" @click="deleteRestaurant">
        Supprimer
      </button>
    </div>
  </div>
</template>

<style scoped>
.restaurant-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 15px 36px;
}

.restaurant-item-name,
.restaurant-item-email {
  color: rgba(0, 0, 0, 0.59);

  font-family: Lexend;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
}
</style>
