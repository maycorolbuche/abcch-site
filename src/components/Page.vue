<template>
  <TitleBar
    :title="page_title"
    :subtitle="page_subtitle"
    :loading="!data && !title && !data?.site_titulo"
  />
  <slot />

  <template v-if="loading && !data">
    <div class="px-5 pt-2">
      <BPlaceholder v-for="n in 3" :key="n" width="100%" animation="glow" />
    </div>
  </template>
  <div v-else-if="!data">
    <BProgress
      variant="primary"
      :value="100"
      striped
      animated
      style="margin-bottom: -50px"
    />
  </div>
  <div
    v-else-if="data"
    v-html="data?.conteudo"
    class="px-5 py-2 pb-4 page-content"
  />
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

          //console.log(status, data, self.data);
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

<style lang="scss">
.page-content {
  position: relative;

  .table-block {
    width: calc(100% + 84px);
    margin-top: -21px;
    margin-left: -42px;

    tr {
      td {
        width: 50%;
        position: relative;

        @media (max-width: 600px) {
          display: block;
          width: 100%;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          margin: 0px;
          top: 0;
          left: 0;
          position: absolute;
        }

        p {
          padding: 10px;
        }

        @media (max-width: 600px) {
          display: block;
          width: 100%;
          min-height: 150px;
        }
      }
    }
  }

  .block-bg {
    width: calc(100% + 84px);
    margin-left: -42px;
    background: var(--bs-primary);
    color: #fff;
    padding: 30px 20px;

    table {
      justify-self: center;

      td {
        padding: 5px;
      }
    }
  }

  .block-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 210px));
    gap: 30px;
    margin-top: 30px;
    justify-content: center;

    .block-card {
      border: 5px solid var(--bs-primary);
      padding: 25px 25px 42px 25px;
      position: relative;

      img {
        width: 100% !important;
        height: 200px !important;
        object-fit: cover !important;
      }

      div {
        background: var(--bs-primary);
        font-size: 11px;
        padding: 2px;
        text-align: center;
        color: #fff;
        text-transform: uppercase;
        margin: -10px;
        position: absolute;
        z-index: 1;
        width: calc(100% - 30px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
