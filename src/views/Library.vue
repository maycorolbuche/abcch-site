<template>
  <Page title="Biblioteca Virtual">
    <div class="px-5">
      <DataTable
        api-url="/biblioteca"
        :fields="[
          {
            key: 'data_cadastro_br',
            label: 'Data',
            class: 'text-end',
          },
          {
            key: 'tipo',
            label: 'Tipo',
            class: 'text-center',
          },
          {
            key: 'nome',
            label: 'Assunto',
          },
          {
            key: 'url',
            label: '',
            text: 'Acessar',
            type: 'link',
            class: 'fw-600 fs-13px text-nowrap',
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
