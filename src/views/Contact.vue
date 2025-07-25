<template>
  <div>
    <TitleBar title="Contato" />

    Formulario de Contato
  </div>
</template>

<script>
import Api from "@/services/Api.js";

import Page from "@/components/Page.vue";

export default {
  components: {
    Page,
  },
  data: () => ({
    data: null,

    abort_controller: null,
  }),
  methods: {
    async sendMessage() {
      let self = this;
      await Api.post(
        "/email",
        {
          //params
        },
        function (status, data) {
          /*if (status) {
            self.data = data;
          }*/
        }
      );
    },

    async loadData() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      //this.tipo_lista = Storage.get("animais/types", []);

      let self = this;
      //Carregar as combos//////////////////////////////////////
      /*await Api.get(
        "/animais/types",
        {
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.tipo_lista = data;

            Storage.set("animais/types", data);
          }
        }
      );*/
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },
  },
  mounted() {
    this.loadData();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>
