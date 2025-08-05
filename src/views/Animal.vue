<template>
  <div>
    <TitleBar :title="data?.NmAnimal" :loading="!data ? true : false" />

    <BTabs class="mx-5" content-class="p-2">
      <BTab title="Detalhes do Animal" active>
        <div class="float-end">
          <BButton variant="danger" :disabled="!data" @click="downloadPdf">
            Baixar PDF
          </BButton>
        </div>
        <div class="pb-3" style="columns: 400px">
          <div
            v-for="detail in details"
            :key="detail.label"
            :class="{ 'text-nowrap': !data }"
            class="py-1"
          >
            <span class="fw-600">{{ detail.label }}: </span>

            <span v-if="data">{{ detail.value }}</span>
            <BPlaceholder v-else :width="50" animation="glow" />
          </div>
        </div>

        <h2 class="text-primary border-bottom">Genealogia</h2>
        <div class="overflow-auto" :style="{ opacity: data ? 1 : 0.5 }">
          <FamilyTree
            :sire="data?.lstPedigree?.sire"
            :dam="data?.lstPedigree?.dam"
          />
        </div>
      </BTab>
      <BTab title="Progênie (Filhos)">
        <DataTable
          :searchable="false"
          :fields="[
            {
              key: 'NmAnimal',
              label: 'Filho',
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
              key: 'DsGender',
              label: 'Sexo',
            },
          ]"
          :items="data?.lstProgeny"
        />
      </BTab>
      <BTab title="Irmãos">
        <DataTable
          :searchable="false"
          :fields="[
            {
              key: 'NmAnimal',
              label: 'Irmã(o)',
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
              key: 'DsGender',
              label: 'Sexo',
            },
          ]"
          :items="data?.lstBrothers"
        />
      </BTab>
    </BTabs>
  </div>
</template>

<script>
import Api from "@/services/Api.js";

import TitleBar from "@/components/TitleBar.vue";
import Page from "@/components/Page.vue";

import DataTable from "@/components/DataTable.vue";
import FamilyTree from "@/components/FamilyTree.vue";

export default {
  components: {
    TitleBar,
    Page,
    DataTable,
    FamilyTree,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: null,
    abort_controller: null,
  }),
  computed: {
    details() {
      return [
        { label: "Registro", value: this.data?.NrRegistration },
        { label: "Microchip", value: this.data?.CdMicrochip },
        { label: "Nascimento", value: this.data?.DtFoaledBr },
        { label: "Sexo", value: this.data?.DsGender },
        { label: "Criador", value: this.data?.NmUserBreeder },
        { label: "Proprietário", value: this.data?.NmUserOwner },
        { label: "Status", value: this.data?.DsStatus },
        { label: "Raça", value: this.data?.DsBreed },
        { label: "Pelagem", value: this.data?.DsCoatColor },
        { label: "DNA", value: this.data?.CdDNALaboratory },
        { label: "Status do DNA", value: this.data?.DsDNAResult },
        { label: "Local de Nascimento", value: this.data?.DsFoalBirthplace },
      ];
    },
  },
  methods: {
    async loadData() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      let self = this;
      await Api.get(
        "/animais/" + this.id,
        {
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.data = data;
          }
        }
      );
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },
    downloadPdf() {
      const url = `${Api.url()}/animais/${this.id}/print`;
      window.open(url, "_blank");
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
