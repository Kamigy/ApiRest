<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./store/user";

const userStore = useUserStore();
</script>

<template>
  <RouterView />
</template>

<style scoped>
.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  position: fixed;
  width: 100%;
  padding: 20px;
}
</style>
