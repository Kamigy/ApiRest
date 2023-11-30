<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  plate: Object,
});
</script>

<template>
  <RouterLink :to="`/dashboard/plates/${plate._id}/edit`" class="plate-item">
    <img class="plate-image" :src="plate?.image" alt="" />
    <div class="plate-name">
      {{ plate?.name }}
    </div>
    <div class="plate-price">{{ plate?.price }}€</div>
  </RouterLink>
</template>

<style scoped>
.plate-item {
  margin: 10px;
}
.plate-image {
  width: 250px;
  border-radius: 11px;
}

.plate-name {
  font-size: 15px;
  font-weight: bold;
}

.plate-price {
  font-size: 15px;
}
</style>
