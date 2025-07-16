<template>
  <Page title="Notícias">
    <div class="px-5">
      <DataTable
        api-url="/noticias"
        route-name="read_news"
        route-param-id="id"
        route-label="Ler Notícia"
        :fields="[
          {
            key: 'titulo',
            label: 'Título',
            class: 'fs-14px',
          },
          {
            key: 'data_publicacao_br',
            label: 'Data',
            class: 'text-end fs-14px',
          },
          {
            key: 'link',
            label: '',
            class: 'text-end fs-14px',
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
