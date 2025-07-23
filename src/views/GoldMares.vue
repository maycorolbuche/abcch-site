<template>
  <Page title="Matrizes de Ouro">
    <div class="px-5">
      <GoldMaresTypes />
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page.vue";
import GoldMaresTypes from "@/components/GoldMaresTypes.vue";

export default {
  components: {
    Page,
    GoldMaresTypes,
  },
};
</script>
