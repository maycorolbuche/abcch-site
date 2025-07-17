<template>
  <Page title="Notícias">
    <div class="px-5">
      <DataTable
        api-url="/noticias"
        :fields="[
          {
            key: 'titulo',
            label: 'Título',
          },
          {
            key: 'data_publicacao_br',
            label: 'Data',
            class: 'text-end',
          },
          {
            key: 'link',
            label: '',
            text: 'Ler Notícia',
            route: {
              to: 'read_news',
              params: { id: 'id' },
              class: 'float-end fw-600 fs-13px text-nowrap',
            },
          },
        ]"
      />
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page.vue";

import DataTable from "@/components/DataTable.vue";

export default {
  components: {
    Page,
    DataTable,
  },
};
</script>
