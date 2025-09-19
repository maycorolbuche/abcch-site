<template>
  <div>
    <TitleBar title="Mídias" />

    <div class="year-select mt-5 mb-4 px-5">
      <BDropdown :text="ano" class="me-2">
        <BDropdownItem
          v-for="ano_item in ano_options"
          :key="ano_item.value"
          @click="ano = ano_item.value"
        >
          {{ ano_item.text }}
        </BDropdownItem>
      </BDropdown>
    </div>

    <div
      class="px-5 pb-5 mt-5 d-flex align-items-center justify-content-center"
    >
      <div
        v-if="!loading && data?.length > 0"
        class="w-100 d-flex flex-wrap justify-content-center"
      >
        <div
          v-for="foto in data"
          :key="foto.id"
          @click="open(foto)"
          class="card-photo"
        >
          <img :src="foto.url" />
        </div>
      </div>
      <div v-else-if="data?.length == 0">
        Não há fotos no ano de
        <b>{{ ano }}</b> .
      </div>
      <BSpinner v-else />
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
  data: () => ({
    data: null,
    abort_controller: null,
    loading: false,

    ano: new Date().getFullYear(),
  }),
  computed: {
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
        "/fotos",
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
    open(foto) {
      window.open(foto.url, "_blank");
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

<style lang="scss">
.year-select {
  display: flex;
  justify-content: center;

  .dropdown {
    width: 200px;
    > button {
      background: var(--bs-primary);
      color: #fff;
      border: 0;
      width: 100%;
    }

    ul {
      width: 200px;
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

        button {
          background: #f3f2f4;
          &:hover {
            background: var(--bs-primary);
            color: #fff;
          }
        }

        &:hover,
        &.active {
          background: var(--bs-primary);
          color: #fff;

          button {
            background: var(--bs-primary);
            color: #fff;
          }
        }
      }
    }
  }
}

.card-photo {
  cursor: pointer;
  img {
    width: 300px;
    height: 300px;

    @media (max-width: 350px) {
      width: 100%;
      height: auto;
    }
  }
}
</style>
