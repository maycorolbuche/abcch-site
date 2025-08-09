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
      path: "/inspetores",
      name: "inspectors",
      component: () => import("../views/Inspectors.vue"),
      props: true,
    },
    {
      path: "/criadores",
      name: "creators",
      component: () => import("../views/Creators.vue"),
      props: true,
    },

    {
      path: "/studbook/genealogia",
      name: "animals",
      component: () => import("../views/Animals.vue"),
    },
    {
      path: "/studbook/matriz",
      name: "gold_mares",
      component: () => import("../views/GoldMares.vue"),
    },
    {
      path: "/studbook/matriz/:type",
      name: "gold_mares_data",
      component: () => import("../views/GoldMaresData.vue"),
      props: true,
    },
    {
      path: "/studbook/cruzamento",
      name: "virtual_crossing_search",
      component: () => import("../views/VirtualCrossingSearch.vue"),
    },
    {
      path: "/studbook/cruzamento/:sire/:dam",
      name: "virtual_crossing",
      component: () => import("../views/VirtualCrossing.vue"),
      props: true,
    },
    {
      path: "/studbook/formulario",
      name: "forms",
      component: () => import("../views/Forms.vue"),
    },

    {
      path: "/biblioteca",
      name: "library",
      component: () => import("../views/Library.vue"),
    },

    {
      path: "/contato",
      name: "contact",
      component: () => import("../views/Contact.vue"),
    },

    {
      path: "/pesquisa",
      name: "search",
      component: () => import("../views/Search.vue"),
    },

    {
      path: "/:menu/:submenu?",
      name: "page",
      component: () => import("../views/Page.vue"),
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
