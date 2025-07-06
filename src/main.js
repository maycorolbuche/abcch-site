import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

const app = createApp(App);

// Registrar todos os componentes do Bootstrap
import * as components from "bootstrap-vue-next";
Object.entries(components).forEach(([componentName, component]) => {
  if (componentName.startsWith("B")) {
    app.component(componentName, component);
  }
});

import "./assets/styles/main.scss";

app.use(router);
app.use(createBootstrap());
app.mount("#app");
