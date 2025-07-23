<template>
  <Page :title="title">
    <div class="px-5">
      <DataTable
        :api-url="'/pessoas/' + type_people"
        :fields="[
          {
            key: 'nome',
            label: 'Nome',
          },
          {
            key: 'telefone',
            label: '1º Tel.',
          },
          {
            key: 'email',
            label: 'E-mail',
          },
          {
            key: 'end_cidade',
            label: 'Cidade',
          },
          {
            key: 'end_uf',
            label: 'UF',
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
  props: {
    type: String,
  },
  computed: {
    title() {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1);
    },
    type_people() {
      if (this.type == "inspetores") {
        return "inspetor";
      } else {
        return this.type;
      }
    },
  },
};
</script>
