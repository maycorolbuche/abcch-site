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
