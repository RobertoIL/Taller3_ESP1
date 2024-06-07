import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";
import { getActivePinia, setActivePinia } from "pinia";
import { createPinia } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/wiki",
      name: "wiki",
      component: () => import("../views/WikiView.vue.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/juego",
      name: "juego",
      component: () => import("../views/GameView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/historial",
      name: "historial",
      component: () => import("../views/RecordView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

const pinia = createPinia();
setActivePinia(pinia);

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});
export default router;
