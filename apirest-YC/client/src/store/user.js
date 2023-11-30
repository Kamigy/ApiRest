import { defineStore } from "pinia";
import AuthService from "../api/AuthService";
import ApiService from "../api/ApiService";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      accessToken: localStorage.getItem("accessToken"),
      user: {
        role: "RESTAURANT",
      },
    };
  },
  actions: {
    async login(email, password) {
      const token = await AuthService.login(email, password);

      localStorage.setItem("accessToken", token);
      this.accessToken = token;
      const user = await ApiService.getLoggedUser();

      this.user = user;
    },
    async register(email, name, password) {
      const token = await AuthService.register(email, name, password);
      localStorage.setItem("accessToken", token);

      this.accessToken = token;
      const user = await ApiService.getLoggedUser();

      this.user = user;
    },
    async loadUser() {
      if (this.accessToken && !this.user._id) {
        const user = await ApiService.getLoggedUser();

        this.user = user;
      }
    },
    logout() {
      this.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
  getters: {
    isAdmin: (state) => state.user.role == "ADMIN",
    isRestaurant: (state) => state.user.role == "RESTAURANT",
  },
});
