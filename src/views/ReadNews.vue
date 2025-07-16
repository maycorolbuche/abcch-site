<template>
  <div>
    <TitleBar :title="data?.titulo" :loading="!data ? true : false">
      <div class="text-end text-white px-3 fs-14px fw-500">
        {{ data?.data_publicacao_br }}
      </div>
    </TitleBar>

    <template v-if="data">
      <div v-html="data?.texto" class="px-5" />
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
    id: Number,
  },
  components: {
    TitleBar,
  },
  data: () => ({
    data: null,
    abort_controller: null,
  }),
  methods: {
    async loadData() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      let self = this;

      await Api.get(
        "/noticias/" + this.id,
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
    this.loadData();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>
