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
      path: "/noticias",
      name: "news",
      component: () => import("../views/News.vue"),
    },
    {
      path: "/noticia/:id",
      name: "read_news",
      component: () => import("../views/ReadNews.vue"),
      props: true,
    },
  ],
});

export default router;
