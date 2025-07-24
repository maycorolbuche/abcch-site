<template>
  <Page title="Estatísticas">
    <div class="px-5">
      <DataTable
        api-url="/estatisticas"
        :params="{ tipo, ano, nome }"
        :searchable="false"
        :filters="[
          { label: 'Tipo', value: tipo_item },
          { label: 'Ano', value: ano == 0 ? 'Acumulado' : ano },
          { label: 'Animal', value: nome },
        ]"
        :fields="[
          {
            key: 'classificacao',
            label: 'Posição',
            class: 'text-end',
            sufix: 'º',
          },
          {
            key: 'animal_nome',
            label: 'Animal',
          },
          {
            key: 'animal_registro',
            label: 'Registro',
          },
          {
            key: 'pontuacao',
            label: 'Pontos',
            class: 'text-end',
          },
        ]"
      >
        <BRow class="mb-4">
          <BCol :cols="12" :md="10" class="pt-2">
            <BFormGroup label="Tipo">
              <BFormSelect
                v-model="tipo"
                value-field="id"
                :options="tipo_lista"
              />
            </BFormGroup>
          </BCol>
          <BCol :cols="12" :md="2" class="pt-2">
            <BFormGroup label="Ano">
              <BFormSelect v-model="ano" :options="ano_options" />
            </BFormGroup>
          </BCol>
          <BCol :cols="12" class="pt-2">
            <BFormGroup label="Informe o nome, o registro ou microchip">
              <FormSearch
                v-model="nome"
                placeholder="Nome, registro ou microchip"
              />
            </BFormGroup>
          </BCol>
        </BRow>
      </DataTable>
    </div>
  </Page>
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

import Page from "@/components/Page.vue";

import DataTable from "@/components/DataTable.vue";
import FormSearch from "@/components/FormSearch.vue";

export default {
  components: {
    Page,
    DataTable,
    FormSearch,
  },
  data: () => ({
    tipo: 0,
    ano: 0,
    nome: "",
    tipo_lista: [],

    abort_controller: null,
  }),
  computed: {
    ano_options() {
      const currentYear = new Date().getFullYear();
      const anos = [];

      anos.push({ value: 0, text: "Acumulado" });

      for (let ano = currentYear; ano >= 2006; ano--) {
        anos.push({ value: ano, text: String(ano) });
      }

      return anos;
    },
    tipo_item() {
      if (!this.tipo_lista || this.tipo_lista.lengt <= 0) {
        return null;
      }

      let item = this.tipo_lista.filter((item) => item.id == this.tipo)[0]
        ?.text;

      return item;
    },
  },
  methods: {
    async loadData(options = {}) {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      this.tipo_lista = Storage.get("estatisticas/types", []);

      let self = this;
      await Api.get(
        "/estatisticas/types",
        {
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.tipo_lista = data;

            Storage.set("estatisticas/types", data);
          }
        }
      );
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },
  },
  mounted() {
    this.loadData();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>
