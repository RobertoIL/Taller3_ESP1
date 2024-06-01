import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/wiki",
      name: "wiki",
      component: () => import("../views/WikiView.vue.vue"),
    },
    {
      path: "/juego",
      name: "juego",
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/historial",
      name: "historial",
      component: () => import("../views/RecordView.vue"),
    },
  ],
});
export default router;
