<template>
  <div class="block-container">
    <div v-for="n in 2" :key="n">
      <BSpinner v-if="data == null" />
      <div v-else-if="block(n)">
        <img
          :src="block(n).imagem_url"
          class="position-absolute w-100 h-100 left-0 top-0 object-fit-cover"
          style="cursor: pointer"
          @click="openUrl(block(n).site_url)"
        />
      </div>
      <span v-else>Anuncie<br />Aqui</span>
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

export default {
  props: {
    line: Number,
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

      this.data = Storage.get("blocks-partners");

      let self = this;

      await Api.get(
        "/anuncios/ANUNCIO",
        {
          destaque: true,
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.data = data;

            Storage.set("blocks-partners", data);
          }
        }
      );
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },

    block(col) {
      if (!this.data) return null;
      return this.data["l" + this.line + "c" + col] ?? null;
    },
    openUrl(url) {
      window.open(url, "_blank");
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
.block-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }

  > div {
    position: relative;
    background: var(--bs-primary);
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    line-height: 1;

    &:first-child {
      @media (max-width: 460px) {
        margin-top: 20px;
      }
    }
  }
}
</style>
>
