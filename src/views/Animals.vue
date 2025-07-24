<template>
  <Page title="Consulta Genealógica">
    <div class="px-5">
      <DataTable
        api-url="/animais"
        :params="{ tipo, ano, nome }"
        :filters="[
          { label: 'Tipo', value: tipo_item },
          { label: 'Ano', value: ano == 0 ? 'Todos os Anos' : ano },
          { label: 'Animal', value: nome },
        ]"
        :to-load="nome != ''"
        :searchable="false"
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
            class: 'text-center',
          },
          {
            key: 'NmGender',
            label: 'Sexo',
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
      >
        <BRow class="mb-4">
          <BCol :cols="12" :md="9" class="pt-2">
            <BFormGroup label="Tipo">
              <BFormSelect
                v-model="tipo"
                value-field="id"
                :options="tipo_lista"
              />
            </BFormGroup>
          </BCol>
          <BCol :cols="12" :md="3" class="pt-2">
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

      <BAlert :model-value="nome == ''" variant="warning">
        Informe o nome, o registro ou microchip
      </BAlert>
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
    tipo: 1,
    ano: 0,
    nome: "",
    tipo_lista: [],

    abort_controller: null,
  }),
  computed: {
    ano_options() {
      const currentYear = new Date().getFullYear();
      const anos = [];

      anos.push({ value: 0, text: "Todos os Anos" });

      for (let ano = currentYear; ano >= 1976; ano--) {
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
    async loadData() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      this.tipo_lista = Storage.get("animais/types", []);

      let self = this;
      await Api.get(
        "/animais/types",
        {
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.tipo_lista = data;

            Storage.set("animais/types", data);
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
