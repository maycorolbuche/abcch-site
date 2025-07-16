<template>
  <Page
    :loading="true"
    @data="loadedData"
    :title="not_found ? 'Página não encontrada!' : null"
  >
    <div v-if="not_found" class="px-5 text-center">
      <div>
        Não foi possível localizar esta página. Verifique se a url foi digitada
        corretamente!
      </div>
      <div class="text-primary fw-bold" style="font-size: 20vw">404</div>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page.vue";

export default {
  props: {
    menu: String,
    submenu: String,
  },
  components: {
    Page,
  },
  data: () => ({
    not_found: false,
  }),
  methods: {
    async loadedData(data) {
      if (Object.keys(data ?? {}).length <= 0) {
        this.not_found = true;
      }
    },
  },
};
</script>
