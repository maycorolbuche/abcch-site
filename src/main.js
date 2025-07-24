import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* Bootstrap */
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

/* Slider */
/* https://splidejs.com/ */
import VueSplide from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

/* SweetAlert */
/* https://sweetalert2.github.io/ */
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);

import "./assets/styles/main.scss";

app.use(router);
app.use(createBootstrap());
app.use(VueSplide);
app.use(VueSweetalert2);
app.mount("#app");
