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
      const foundUser = usuarios_registrados.find(
        (u) => u.username === user.username && u.password === user.password
      );
      if (foundUser) {
        this.user = user;
        return true;
      } else return false;
    },
    logout() {
      this.user = null;
    },
  },
});

const usuarios_registrados = [
  {
    username: "bastian",
    password: "1234",
  },
  {
    username: "roberto",
    password: "1234",
  },
];
