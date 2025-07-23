<template>
  <div>
    <TitleBar title="Matrizes de Ouro" :subtitle="subtitle" />

    <div class="px-5">
      <GoldMaresTypes />

      <div class="py-3" />

      <DataTable
        :api-url="'/matriz/' + type"
        :searchable="false"
        :fields="[
          {
            key: 'NmAnimal',
            label: 'Nome',
            route: {
              to: 'animal',
              params: { id: 'CdToken' },
            },
          },
          {
            key: 'DtFoaledBr',
            label: 'Dt. Nasc.',
            class: 'text-center',
          },
          {
            key: 'NmAnimalDam',
            label: 'Mãe',
          },
          {
            key: 'NmAnimalSire',
            label: 'Pai',
          },
          {
            key: 'NmAnimalSire',
            label: 'Pai',
          },
          {
            key: 'NmUserBreeder',
            label: 'Criador',
          },
          {
            key: 'DsSiteComments',
            label: '',
          },
        ]"
      />
    </div>
  </div>
</template>

<script>
import Page from "@/components/Page.vue";
import GoldMaresTypes from "@/components/GoldMaresTypes.vue";

export default {
  components: {
    Page,
    GoldMaresTypes,
  },
  props: {
    type: String,
  },
  computed: {
    subtitle() {
      switch (this.type?.toLowerCase()) {
        case "e":
          return "Elite";
        case "p":
          return "Premium";
        case "c":
          return "Competition";
        case "s":
          return "Special";
        default:
          return "Não Encontrado";
      }
    },
  },
};
</script>
