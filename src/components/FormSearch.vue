<template>
  <BForm @submit.prevent="searchFor">
    <div class="d-flex align-items-center flex-row form-search">
      <BFormInput v-model="search" type="text" :placeholder="placeholder" />
      <BButton variant="primary" @click="searchFor()">
        <MagnifyIcon width="20px" color="#FFF" />
      </BButton>
    </div>
  </BForm>
</template>

<script>
import MagnifyIcon from "@/components/icons/Magnify.vue";

export default {
  components: {
    MagnifyIcon,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Pesquisar",
    },
  },
  data: () => ({
    search: "",
  }),
  watch: {
    modelValue(newVal) {
      this.search = newVal;
    },
  },
  methods: {
    searchFor() {
      this.$emit("update:modelValue", this.search);
    },
  },
  mounted() {
    this.search = this.modelValue;
  },
};
</script>

<style lang="scss">
.form-search {
  input.form-control {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
