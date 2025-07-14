<template>
  <div>
    <TitleBar title="Notícias" />

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
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  components: {
    TitleBar,
    DataTable,
  },
};
</script>
