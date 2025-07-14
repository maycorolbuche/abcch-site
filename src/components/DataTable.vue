<template>
  <div>
    <BTable striped hover :items="data?.data" :fields="fields">
      <template #cell(link)="row">
        <router-link
          v-if="routeName"
          :to="{ name: routeName, params: { id: row.item[routeParamId] } }"
          class="float-end fw-600 fs-13px text-nowrap"
        >
          {{ routeLabel || "Acessar" }}
        </router-link>
      </template>
    </BTable>

    <BPagination
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
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

export default {
  props: {
    apiUrl: String,
    fields: Array,
    routeName: String,
    routeParamId: String,
    routeLabel: String,
  },
  data: () => ({
    loading: false,
    data: null,
    current_page: null,
    pagination_limit: 10,
  }),
  watch: {
    current_page(newVal) {
      if (this.data?.current_page != newVal) {
        this.load_data({ current_page: newVal });
      }
    },
  },
  methods: {
    async load_data(options = {}) {
      this.loading = true;

      this.data = Storage.get("dt-" + this.apiUrl);

      this.current_page = options?.current_page ?? this.data?.current_page ?? 1;

      let self = this;
      await Api.get(
        this.apiUrl,
        {
          limit: 30,
          page: this.current_page,
        },
        function (status, data) {
          self.loading = false;

          if (status) {
            self.data = data;
            self.current_page = data.current_page;

            Storage.set("dt-" + self.apiUrl, data);
          }
        }
      );
    },
    updatePagination_limit() {
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
  },
  mounted() {
    this.load_data();
    this.updatePagination_limit();
    window.addEventListener("resize", this.updatePagination_limit);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updatePagination_limit);
  },
};
</script>
