<template>
  <div class="pb-3">
    <slot />

    <div v-if="searchable">
      <BFormGroup :label="searchLabel">
        <FormSearch v-model="search" />
      </BFormGroup>
      <div class="my-3" />
    </div>

    <div v-if="searching || loading || !data" class="fs-14px">
      <BSpinner small class="me-2" />
      Carregando...
    </div>
    <div v-else class="fs-14px d-flex align-items-center flex-wrap">
      <div
        class="fs-14px d-flex align-items-center flex-wrap"
        style="column-gap: 15px"
      >
        <div v-if="search">
          {{ searchLabelFilter }}: <b>{{ search }}</b>
        </div>
        <div
          v-for="filter in filters"
          :key="filter.label"
          v-show="filter.value"
        >
          {{ filter.label }}: <b>{{ filter.value }}</b>
        </div>
      </div>
    </div>

    <div v-if="!searching && data">
      <div class="overflow-auto">
        <BTable
          :busy="loading"
          striped
          hover
          :items="data?.data"
          :fields="fields"
        >
          <template #cell()="{ item, field }">
            <router-link
              v-if="field?.route"
              :to="{
                name: field?.route?.to,
                params: route_params(field?.route?.params, item),
              }"
              :class="field?.route?.class"
            >
              {{ field?.prefix }}
              {{ field?.text ?? item[field?.key] ?? "" }}
              {{ field?.sufix }}
            </router-link>
            <a
              v-else-if="field?.emit"
              href="#"
              @click.prevent="$emit('item', item)"
              :class="field?.route?.class"
            >
              {{ field?.prefix }}
              {{ field?.text ?? item[field?.key] ?? "" }}
              {{ field?.sufix }}
            </a>
            <a
              v-else-if="field?.type == 'link'"
              :href="link(item[field?.key])"
              :class="field?.route?.class"
              target="_blank"
            >
              {{ field?.prefix }}
              {{ field?.text ?? item[field?.key] ?? "" }}
              {{ field?.sufix }}
            </a>
            <span v-else>
              {{ field?.prefix }}
              {{ field?.text ?? item[field?.key] ?? "" }}
              {{ field?.sufix }}
            </span>
          </template>
        </BTable>
      </div>

      <BPagination
        v-if="data?.total"
        v-model="current_page"
        :total-rows="data?.total"
        :per-page="data?.per_page"
        :disabled="loading"
        :first-number="pagination_limit >= 10"
        :last-number="pagination_limit >= 10"
        :limit="pagination_limit"
        align="center"
      />
    </div>
  </div>
</template>

<script>
import FormSearch from "@/components/FormSearch.vue";

import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

export default {
  components: {
    FormSearch,
  },
  props: {
    apiUrl: String,
    fields: Array,
    items: Array,
    filters: Array,
    searchLabel: {
      type: String,
      default: "Pesquisar",
    },
    searchLabelFilter: {
      type: String,
      default: "Buscando por",
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    params: {
      type: Object,
      default: {},
    },
    toLoad: {
      type: Boolean,
      default: true,
    },
    clearSearchIfChangeParams: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    loading_count: 0,
    searching: false,
    data: null,
    current_page: null,
    pagination_limit: 10,
    search: "",
    abort_controller: null,
  }),
  computed: {
    loading() {
      return this.loading_count > 0;
    },
    getParams() {
      return Object.fromEntries(
        Object.entries(this.params).filter(([_, v]) => v != null),
      );
    },
  },
  watch: {
    current_page(newVal) {
      if (this.data?.current_page != newVal) {
        this.loadData({ current_page: newVal });
      }
    },
    params() {
      if (this.clearSearchIfChangeParams) {
        this.search = "";
      }
      this.loadData({ current_page: 1 });
    },
    items() {
      this.loadData({ current_page: 1 });
    },
    loading() {
      this.$emit("loading", this.loading);
    },
    toLoad() {
      this.data.current_page = 1;
      this.loadData({ current_page: 1 });
    },
    search() {
      this.searching = true;
      Storage.set("dt-s-" + this.apiUrl, this.search);
      this.loadData({ current_page: 1 });
    },
  },
  methods: {
    async loadData(options = {}) {
      if (this.items) {
        this.data = { data: this.items };
      } else if (this.apiUrl) {
        this.abort();

        this.abort_controller = new AbortController();
        const signal = this.abort_controller.signal;

        if (!this.toLoad) {
          this.loading_count = 0;
          this.searching = false;
          this.data = [];
          Storage.set("dt-" + this.apiUrl, this.data);
          return;
        }

        this.loading_count++;

        this.data = Storage.get("dt-" + this.apiUrl);

        this.current_page =
          options?.current_page ?? this.data?.current_page ?? 1;

        let self = this;
        await Api.get(
          this.apiUrl,
          {
            limit: 30,
            search: this.search,
            page: this.current_page,
            __signal: signal,
            ...self.getParams,
          },
          function (status, data) {
            self.loading_count--;

            if (status) {
              self.searching = false;
              self.data = data;
              self.current_page = data.current_page;
              Storage.set("dt-" + self.apiUrl, data);
            }
          },
        );
      }
    },
    updatePaginationLimit() {
      const width = window.innerWidth;

      if (width < 350) {
        this.pagination_limit = 1;
      } else if (width < 490) {
        this.pagination_limit = 3;
      } else if (width < 768) {
        this.pagination_limit = 8;
      } else {
        this.pagination_limit = 10;
      }
    },
    abort() {
      if (this.abort_controller) {
        this.abort_controller.abort();
      }
    },
    route_params(params, item) {
      let p = {};
      Object.keys(params).map((param) => {
        p[param] = item[params[param]] ?? "";
      });
      return p;
    },
    link(url) {
      if (!/^https?:\/\//i.test(url)) {
        return "https://" + url;
      }
      return url;
    },
  },
  mounted() {
    this.search = Storage.get("dt-s-" + this.apiUrl, "");
    this.loadData();
    this.updatePaginationLimit();
    window.addEventListener("resize", this.updatePaginationLimit);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updatePaginationLimit);

    this.abort();
  },
};
</script>
