<script setup>
import ApiService from "../api/ApiService";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const plate = ref({
  name: "",
  image: "",
  price: "",
  city: "",
});

const route = useRoute();
const router = useRouter();

async function updateOrCreatePlate() {
  if (plate.value._id) {
    await ApiService.updatePlate(route.params.plate_id, plate.value);
  } else {
    await ApiService.createPlate(plate.value);
  }

  plate.value = {};

  router.push("/dashboard/plates");
}
async function loadExistingPlate() {
  if (route.params.plate_id) {
    plate.value = await ApiService.getPlate(route.params.plate_id);
  }
}

onMounted(() => {
  loadExistingPlate();
});
</script>

<template>
  <div>
    <header class="page-header">
      <h1 class="page-title">
        {{ route.params.plate_id ? "Modifier" : "Créer" }} un plat
      </h1>
    </header>
    <div class="form">
      <input v-model="plate.name" type="text" placeholder="Nom" />
      <input v-model="plate.image" type="text" placeholder="Photo Url" />
      <input v-model="plate.price" type="text" placeholder="Prix" />
      <button class="button" @click="updateOrCreatePlate">
        {{ route.params.plate_id ? "Modifier" : "Créer" }}
      </button>
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
