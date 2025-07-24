<template>
  <div>
    <TitleBar
      title="Cruzamento Virtual"
      :subtitle="
        sire_data && dam_data
          ? sire_data?.NmAnimal + ' X ' + dam_data?.NmAnimal
          : 'Carregando cruzamento...'
      "
    />

    <div class="px-5">
      <h2 class="text-primary border-bottom">Genealogia</h2>
      <div class="float-end">
        <BButton
          variant="danger"
          :disabled="!sire_data && !dam_data"
          @click="downloadPdf"
        >
          Baixar PDF
        </BButton>
      </div>

      <div class="clearfix" />

      <div
        class="overflow-auto"
        :style="{ opacity: sire_data && dam_data ? 1 : 0.5 }"
      >
        <FamilyTree
          :sire="sire_data?.lstPedigree"
          :dam="dam_data?.lstPedigree"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api.js";

import Page from "@/components/Page.vue";

import DataTable from "@/components/DataTable.vue";
import FamilyTree from "@/components/FamilyTree.vue";

export default {
  components: {
    Page,
    DataTable,
    FamilyTree,
  },
  props: {
    sire: String,
    dam: String,
  },
  data: () => ({
    sire_data: null,
    dam_data: null,
    sire_abort_controller: null,
    dam_abort_controller: null,
  }),
  methods: {
    async loadData() {
      this.abort();

      this.sire_abort_controller = new AbortController();
      const sire_signal = this.sire_abort_controller.signal;

      let self = this;
      Api.get(
        "/animais/" + this.sire,
        {
          __signal: sire_signal,
        },
        function (status, data) {
          if (status) {
            self.sire_data = data;
          }
        }
      );

      this.dam_abort_controller = new AbortController();
      const dam_signal = this.dam_abort_controller.signal;

      self = this;
      Api.get(
        "/animais/" + this.dam,
        {
          __signal: dam_signal,
        },
        function (status, data) {
          if (status) {
            self.dam_data = data;
          }
        }
      );
    },
    abort() {
      if (this.sire_abort_controller) {
        this.sire_abort_controller.abort();
      }
      if (this.dam_abort_controller) {
        this.dam_abort_controller.abort();
      }
    },
    downloadPdf() {
      const url = `${Api.url()}/animais/${this.sire}/${this.dam}/print`;
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
