<template>
  <TitleBar
    :title="page_title"
    :subtitle="page_subtitle"
    :loading="!data && !title && !data?.site_titulo"
  />
  <slot />

  <template v-if="loading && !data">
    <div class="px-5 py-2 pb-3">
      <BPlaceholder v-for="n in 3" :key="n" width="100%" animation="glow" />
    </div>
  </template>
  <div v-else-if="data" v-html="data?.site_html" class="px-5 py-2 pb-4" />
</template>

<script>
import Api from "@/services/Api.js";

import TitleBar from "@/components/TitleBar.vue";

export default {
  components: {
    TitleBar,
  },
  props: {
    title: String,
    subtitle: String,
    loading: Boolean,
  },
  emits: ["data", "status"],
  data: () => ({
    data: null,
  }),
  computed: {
    path() {
      return this.$route.path.split("/").filter((item) => item !== "");
    },
    menu() {
      return this.path[0] ?? null;
    },
    submenu() {
      return this.path[1] ?? null;
    },
    page_title() {
      if (this.title) {
        return this.title;
      } else if (this.data?.site_titulo) {
        return this.data.site_titulo.split("|")[0].trim();
      }
    },
    page_subtitle() {
      if (this.subtitle) {
        return this.subtitle;
      } else if (this.data?.site_titulo) {
        const parts = this.data.site_titulo.split("|");
        if (parts.length > 1) {
          return parts[1].trim();
        }
      }
    },
  },
  methods: {
    async loadData() {
      this.abort();

      this.not_found = false;
      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      let self = this;

      await Api.get(
        "/pagina/" + this.menu + "/" + (this.submenu ?? ""),
        {
          __signal: signal,
        },
        function (status, data) {
          self.$emit("status", status);
          self.$emit("data", data);

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
    this.loadData();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>
