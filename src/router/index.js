import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },

    {
      path: "/noticia/:id",
      name: "noticia",
      component: () => import("../views/Noticia.vue"),
    },
  ],
});

export default router;
