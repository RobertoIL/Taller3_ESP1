// src/stores/authStore.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUsername: (state) => state.user?.username,
  },
  actions: {
    login(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
});
