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
    {
      path: "/estatistica",
      name: "statistic",
      component: () => import("../views/Statistic.vue"),
    },
    {
      path: "/studbook",
      name: "animals",
      component: () => import("../views/Animals.vue"),
    },
    {
      path: "/animal/:id",
      name: "animal",
      component: () => import("../views/Animal.vue"),
      props: true,
    },
    {
      path: "/comunicado/:type",
      name: "docs",
      component: () => import("../views/Docs.vue"),
      props: true,
    },
    {
      path: "/registrar",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/inspetores",
      name: "inspectors",
      component: () => import("../views/Inspectors.vue"),
    },
    {
      path: "/:menu/:submenu?",
      name: "page",
      component: () => import("../views/Page.vue"),
      props: true,
    },
  ],
});

export default router;
