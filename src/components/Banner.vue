<template>
  <div>
    <Splide
      v-if="data"
      :options="{ rewind: true, autoplay: true, autoHeight: true }"
    >
      <SplideSlide v-for="item in data" :key="item.id">
        <a
          v-if="item.site_url"
          :href="item.site_url"
          :target="item.site_janela"
        >
          <img :src="item.imagem_url" style="width: 100%" />
        </a>
        <img v-else :src="item.imagem_url" style="width: 100%" />
      </SplideSlide>
    </Splide>
  </div>
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

export default {
  props: {
    type: String,
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

      this.data = Storage.get("banner-" + this.type);

      let self = this;

      await Api.get(
        "/anuncios/" + this.type,
        {
          limit: 3,
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.data = data;

            Storage.set("banner-" + self.type, data);
          }
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

<style lang="scss" scoped>
.card {
  color: #3c3950;
}
</style>
