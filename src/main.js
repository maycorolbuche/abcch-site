import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

import VueSplide from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

const app = createApp(App);

import "./assets/styles/main.scss";

app.use(router);
app.use(createBootstrap());
app.use(VueSplide);
app.mount("#app");
