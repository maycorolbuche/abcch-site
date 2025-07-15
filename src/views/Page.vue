<template>
  <div>
    <TitleBar :title="data?.site_titulo" :loading="!data ? true : false" />

    <template v-if="data">
      <div v-html="data?.site_html" class="px-5" />
    </template>

    <template v-else>
      <div class="px-5 py-2">
        <BPlaceholder v-for="n in 3" :key="n" width="100%" animation="glow" />
      </div>
    </template>
  </div>
</template>

<script>
import Api from "@/services/Api.js";

import TitleBar from "@/components/TitleBar.vue";

export default {
  props: {
    menu: String,
    submenu: String,
  },
  components: {
    TitleBar,
  },
  data: () => ({
    data: null,
  }),
  methods: {
    async load_data() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      let self = this;

      await Api.get(
        "/pagina/" + this.menu + "/" + (this.submenu ?? ""),
        {
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.data = data;
          }
          console.log(status, data, self.data);
        }
      );
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },
  },
  mounted() {
    this.load_data();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>
