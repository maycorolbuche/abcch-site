<template>
  <Page title="Cruzamento Virtual">
    <div class="px-5">
      <div
        class="blocks d-flex align-items-center justify-content-center mb-3"
        style="gap: 15px"
      >
        <a
          class="block p-3 text-center rounded-3 fw-600 text-black"
          style="background-color: #9dbfe2"
          href="javascript:"
          @click="tipo = 2"
        >
          <span v-if="sire">
            {{ sire?.NmAnimal }}
          </span>
          <span v-else class="text-muted"> SELECIONE O ANIMAL </span>
        </a>
        <div class="fw-bold fs-2" style="color: #afafaf">X</div>
        <a
          class="block p-3 text-center rounded-3 fw-600 text-black"
          style="background-color: #f2ddee"
          href="javascript:"
          @click="tipo = 3"
        >
          <span v-if="dam">
            {{ dam?.NmAnimal }}
          </span>
          <span v-else class="text-muted"> SELECIONE O ANIMAL </span>
        </a>
      </div>

      <DataTable
        api-url="/animais"
        :params="{ tipo, nome }"
        :to-load="nome != ''"
        :searchable="false"
        :fields="[
          {
            key: 'NmAnimal',
            label: 'Animal',
            emit: true,
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
        @item="setItem"
      >
        <BRow class="mb-4">
          <BCol :cols="12" class="pt-2">
            <BFormGroup
              :label="
                'Informe o nome, o registro ou microchip ' +
                labels[0] +
                ' ' +
                labels[1]
              "
            >
              <FormSearch
                v-model="nome"
                placeholder="Nome, registro ou microchip"
                :key="tipo"
              />
            </BFormGroup>
          </BCol>
        </BRow>
      </DataTable>

      <BAlert :model-value="nome == ''" variant="warning">
        Informe o nome, o registro ou microchip {{ labels[0] }} {{ labels[1] }}
      </BAlert>
    </div>
  </Page>
</template>

<script>
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
    tipo: 2,
    nome: "",

    sire: null,
    dam: null,
  }),
  computed: {
    labels() {
      if (this.tipo == 2) {
        return ["do", "Pai"];
      } else if (this.tipo == 3) {
        return ["da", "Mãe"];
      } else {
        return ["", ""];
      }
    },
  },
  methods: {
    setItem(value) {
      if (this.tipo == 2) {
        this.sire = value;
      } else if (this.tipo == 3) {
        this.dam = value;
      }
      this.tipo = this.tipo == 2 ? 3 : 2;
      this.nome = "";

      if (this.sire && this.dam) {
        this.$router.push({
          name: "virtual_crossing",
          params: { sire: this.sire.CdToken, dam: this.dam.CdToken },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.blocks {
  .block {
    text-decoration: none;
    width: 300px;

    &:hover {
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
>
