import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./store/user";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

useUserStore().loadUser();

app.mount("#app");
