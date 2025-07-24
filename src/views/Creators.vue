<template>
  <Page title="Criadores">
    <div class="px-5">
      <label class="form-label d-block">Pesquisa por Estado</label>

      <BrasilMap v-model="uf" />

      <div class="py-1" />

      <DataTable
        api-url="/criadores"
        searchLabel="Pesquisa por Nome"
        searchLabelFilter="Nome"
        :params="{ uf }"
        :filters="[{ label: 'UF', value: uf }]"
        :fields="[
          {
            key: 'nome',
            label: 'Nome',
          },
          {
            key: 'end_cidade',
            label: 'Cidade',
          },
          {
            key: 'end_uf',
            label: 'UF',
          },
          {
            key: 'site',
            label: 'Site',
            type: 'link',
          },
        ]"
      />
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page.vue";

import DataTable from "@/components/DataTable.vue";
import BrasilMap from "@/components/BrasilMap.vue";

export default {
  components: {
    Page,
    DataTable,
    BrasilMap,
  },
  data: () => ({
    uf: null,
  }),
};
</script>
