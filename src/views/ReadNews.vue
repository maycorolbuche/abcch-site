<template>
  <div>
    <template v-if="data">
      <TitleBar :title="data?.titulo">
        <div class="text-end text-white px-3 fs-14px fw-500">
          {{ data?.data_publicacao_br }}
        </div>
      </TitleBar>

      <div v-html="data?.texto" class="px-5" />
    </template>

    <template v-else>
      <BPlaceholder
        width="100%"
        class="my-3 p-4"
        animation="glow"
        style="height: 130px"
      />
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
  }),
  methods: {
    async load_data() {
      let self = this;

      await Api.get("/noticias/" + this.id, {}, function (status, data) {
        if (status) {
          self.data = data;
        }
        console.log(status, data, self.data);
      });
    },
  },
  mounted() {
    this.load_data();
  },
};
</script>
