<template>
  <BCard class="border-0 p-0" body-class="p-0">
    <BCardTitle
      class="fs-4 fw-bold p-0 m-0 text-primary d-flex align-items-end justify-content-between"
    >
      <span>ÚLTIMAS NOTÍCIAS</span>
      <router-link class="fw-600 fs-13px" :to="{ name: 'news' }">
        + Notícias
      </router-link>
    </BCardTitle>

    <template v-if="data">
      <BCard
        v-for="item in data"
        :key="item.id"
        no-body
        class="border-0 my-3"
        @click="openLink({ name: 'read_news', params: { id: item.id } })"
      >
        <BRow class="g-0">
          <BCol cols="3" class="d-flex align-items-center">
            <BCardImg
              :src="item.imagem_url"
              alt="Image"
              :rounded="false"
              lazy
              style="object-fit: cover; height: 100px; background: #eee"
            />
          </BCol>
          <BCol cols="9">
            <BCardBody class="py-0">
              <BCardTitle class="fs-5">
                <span class="fw-700 text-uppercase">
                  {{ item.dia_mes_publicacao }}:
                </span>
                <span class="fw-400">
                  {{ item.titulo }}
                </span>
              </BCardTitle>
              <BCardText class="fs-14px">
                <span v-if="item.resumo != '...'" v-html="item.resumo" />
                <router-link
                  :to="{ name: 'read_news', params: { id: item.id } }"
                  class="float-end fw-600 fs-13px"
                >
                  Saiba mais
                </router-link>
              </BCardText>
            </BCardBody>
          </BCol>
        </BRow>
      </BCard>
    </template>

    <BCard v-else v-for="n in 3" :key="n" no-body class="border-0 my-2">
      <BRow class="g-0">
        <BCol md="4">
          <BPlaceholder width="100%" animation="glow" style="height: 100px" />
        </BCol>
        <BCol md="8">
          <BCardBody class="py-0">
            <BPlaceholder animation="glow" style="height: 25px" />
            <BPlaceholder animation="glow" class="mt-2" style="height: 60px" />
          </BCardBody>
        </BCol>
      </BRow>
    </BCard>
  </BCard>
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

export default {
  data: () => ({
    data: null,
    abort_controller: null,
  }),
  methods: {
    async loadData() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      this.data = Storage.get("latest_news");

      let self = this;

      await Api.get(
        "/noticias",
        {
          limit: 3,
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.data = data.data;

            Storage.set("latest_news", data.data);
          }
        },
      );
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },
    openLink(to) {
      this.$router.push(to);
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
