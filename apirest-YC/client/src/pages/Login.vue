<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");

async function loginUserAction() {
  await userStore.login(email.value, password.value);
  router.push("/dashboard");
}
</script>

<template>
  <div class="app-login">
    <h1>Login</h1>
    <form>
      <input
        v-model="email"
        type="text"
        placeholder="email"
        name="email"
        id="email"
      />
      <input
        v-model="password"
        type="password"
        placeholder="password"
        name="password"
        id="password"
      />
      <button type="button" class="button" @click="loginUserAction">
        Se connecter
      </button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
input {
  margin: 10px 0;
}

.register-button {
  margin-top: 10px;
}

.app-login {
  padding: 26px;
}
</style>
