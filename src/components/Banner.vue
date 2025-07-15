<template>
  <div>
    #BANNER.. . ,{{ type }},
    <pre>  {{ data }}  </pre>
    .
  </div>
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

export default {
  props: {
    type: String,
  },
  data: () => ({
    data: null,
    abort_controller: null,
  }),
  methods: {
    async load_data() {
      this.abort();

      this.abort_controller = new AbortController();
      const signal = this.abort_controller.signal;

      this.data = Storage.get("banner-" + this.type);

      let self = this;

      await Api.get(
        "/anuncios/" + this.type,
        {
          limit: 3,
          __signal: signal,
        },
        function (status, data) {
          if (status) {
            self.data = data;

            Storage.set("banner-" + self.type, data);
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
    this.load_data();
  },
  beforeUnmount() {
    this.abort();
  },
};
</script>

<style lang="scss" scoped>
.card {
  color: #3c3950;
}
</style>
