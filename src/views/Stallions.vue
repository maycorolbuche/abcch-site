<template>
  <Page title="Garanhões" subtitle="Aprovados e licenciados pela ABCCH">
    <div class="px-5">
      <DataTable
        api-url="/garanhoes"
        searchLabel="Informe o nome, o registro ou microchip"
        searchLabelFilter="Nome"
        :fields="[
          {
            key: 'NmAnimal',
            label: 'Animal',
            route: {
              to: 'animal',
              params: { id: 'CdToken' },
            },
          },
          {
            key: 'NrRegistration',
            label: 'Registro',
          },
          {
            key: 'DtFoaledBr',
            label: 'Dt. Nasc.',
          },
          {
            key: 'NmAnimalSire',
            label: 'Pai',
          },
          {
            key: 'NmAnimalDam',
            label: 'Mãe',
          },
          {
            key: 'NmUserOwner',
            label: 'Proprietário',
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
  data: () => ({
    uf: null,
  }),
};
</script>
