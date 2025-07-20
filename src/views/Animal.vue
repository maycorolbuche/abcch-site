<template>
  <div>
    <TitleBar :title="data?.NmAnimal" :loading="!data ? true : false" />

    <div class="overflow-auto px-5" :style="{ opacity: data ? 1 : 0.5 }">
      <FamilyTree
        :sire="data?.lstPedigree?.sire"
        :dam="data?.lstPedigree?.dam"
      />
    </div>
    {{ id }}
    <pre>{{ data?.lstPedigree }}</pre>
  </div>
</template>

<script>
import Api from "@/services/Api.js";

import Page from "@/components/Page.vue";

import FamilyTree from "@/components/FamilyTree.vue";

export default {
  components: {
    Page,
    FamilyTree,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: null,
    abort_controller: null,
  }),
  methods: {
    async loadData(options = {}) {
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
  },
  mounted() {
    this.loadData();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>
