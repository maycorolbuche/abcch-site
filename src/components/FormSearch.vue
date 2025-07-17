<template>
  <BForm @submit.prevent="searchFor">
    <BFormGroup :label="label" class="form-search">
      <div class="d-flex align-items-center flex-row">
        <BFormInput v-model="search" type="text" :placeholder="placeholder" />
        <BButton variant="primary" @click="searchFor()">
          <MagnifyIcon width="20px" color="#FFF" />
        </BButton>
      </div>
    </BFormGroup>
  </BForm>
</template>

<script>
import MagnifyIcon from "@/components/icons/Magnify.vue";

export default {
  components: {
    MagnifyIcon,
  },
  props: {
    label: {
      type: String,
      default: "Pesquisar",
    },
    placeholder: {
      type: String,
      default: "Pesquisar",
    },
  },
  data: () => ({
    search: "",
  }),
  methods: {
    searchFor() {
      this.$emit("search", this.search);
    },
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
