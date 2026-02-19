<template>
  <Page title="Garanhões" subtitle="Aprovados e licenciados pela ABCCH">
    <div class="d-flex page-flex">
      <div class="d-flex flex-column mt-5 pt-4">
        <BButton
          v-for="letter in letters"
          :key="letter"
          @click="setInicial(letter)"
          :variant="letter == initial ? 'primary' : 'outline-primary'"
          pill
          class="p-0 m-1 fw-600"
          style="width: 30px; height: 30px"
        >
          {{ letter }}
        </BButton>
      </div>

      <div class="mx-4 page-grid" style="flex: 1">
        <DataTable
          api-url="/garanhoes"
          searchLabel="Informe o nome, o registro ou microchip"
          searchLabelFilter="Nome"
          :clearSearchIfChangeParams="true"
          :params="{ initial }"
          :filters="[{ label: 'Inicial', value: initial }]"
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
            {
              key: 'DsType',
              label: 'Tipo',
            },
          ]"
        />
      </div>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page.vue";

import DataTable from "@/components/DataTable.vue";
import Storage from "@/helpers/Storage.js";

export default {
  components: {
    Page,
    DataTable,
  },
  data: () => ({
    initial: null,
  }),
  computed: {
    letters() {
      return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    },
  },
  watch: {
    initial() {
      Storage.set("dt-initial-/garanhoes", this.initial);
    },
  },
  methods: {
    async setInicial(letter) {
      this.initial = this.initial !== letter ? letter : null;
    },
  },
  mounted() {
    this.initial = Storage.get("dt-initial-/garanhoes", "");
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 1050px) {
  .page-flex {
    .page-grid {
      width: calc(100% - 70px);
    }
  }
}
</style>
