<template>
  <div>
    <TitleBar :title="title" />

    <BRow class="year-select mb-4 px-5">
      <BCol :cols="12" class="pt-2">
        <BFormGroup label="Ano">
          <BFormSelect v-model="ano" :options="ano_options" />
        </BFormGroup>
      </BCol>
    </BRow>

    <div class="px-5 pb-5 d-flex">
      <div class="flex-auto">
        <DocList v-if="!loading && data?.length > 0" :items="data" />
        <div v-else-if="data?.length == 0">
          Dados não encontrados para o ano de <b>{{ ano }}</b
          >.
        </div>
        <BPlaceholder
          v-else
          v-for="n in 3"
          :key="n"
          width="100%"
          animation="glow"
        />
      </div>
      <div class="year-list ps-3">
        <ul>
          <li
            v-for="year in ano_options"
            :key="year.value"
            @click="ano = year.value"
            :class="{ active: year.value == ano }"
          >
            {{ year.text }}
          </li>
        </ul>
      </div>
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
      if (this.type === "festival") {
        return "Festival Nacional";
      } else if (this.type === "transparencia") {
        return "Transparência";
      }
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

<style lang="scss" scoped>
.year-list {
  display: block;
}
.year-select {
  display: none;
}

@media (max-width: 650px) {
  .year-list {
    display: none;
  }
  .year-select {
    display: block;
  }
}

.year-list {
  width: 200px;
  max-width: 200px;
  min-width: 200px;

  ul {
    list-style-type: none;
    padding: 0;
    border-bottom: 5px solid #d3d2d2;
    border-radius: 0 0 5px 5px;

    li {
      cursor: pointer;
      font-weight: 500;
      color: #939598;
      background: #f3f2f4;
      border-bottom: 1px solid #dddcde;
      border-top: 1px solid #fff;
      margin: 0;
      padding: 3px 15px;

      &:hover,
      &.active {
        background: var(--bs-primary);
        color: #fff;
      }
    }
  }
}
</style>
