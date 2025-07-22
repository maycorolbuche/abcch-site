<template>
  <div>
    <TitleBar :title="title" />

    <BRow class="mb-4 px-5">
      <BCol :cols="12" class="pt-2">
        <BFormGroup label="Ano">
          <BFormSelect v-model="ano" :options="ano_options" />
        </BFormGroup>
      </BCol>
    </BRow>

    <div class="px-5 pb-5">
      <DocList v-if="!loading" :items="data" />
      <BPlaceholder
        v-else
        v-for="n in 3"
        :key="n"
        width="100%"
        animation="glow"
      />
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api.js";

import TitleBar from "@/components/TitleBar.vue";
import DocList from "@/components/DocList.vue";

export default {
  components: {
    TitleBar,
    DocList,
  },
  props: {
    type: String,
  },
  data: () => ({
    data: null,
    abort_controller: null,
    loading: false,

    ano: new Date().getFullYear(),
  }),
  computed: {
    title() {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1) + "s";
    },
    ano_options() {
      const currentYear = new Date().getFullYear();
      const anos = [];

      for (let ano = currentYear; ano >= 2012; ano--) {
        anos.push({ value: ano, text: String(ano) });
      }

      return anos;
    },
  },
  watch: {
    ano() {
      this.loadData();
    },
  },
  methods: {
    async loadData() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      this.loading = true;

      let self = this;

      await Api.get(
        "/comunicado/" + this.type,
        {
          ano: this.ano,
          __signal: signal,
        },
        function (status, data) {
          self.loading = false;

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
  },
  mounted() {
    this.loadData();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>
