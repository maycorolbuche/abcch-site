<template>
  <div class="root pt-5">
    <div class="text-uppercase text-center fs-4 fw-500 lh-sm">Faça sua</div>
    <div
      class="text-uppercase text-center fw-700 lh-sm"
      style="font-size: 60px"
    >
      Consulta
    </div>

    <div class="d-flex align-items-center justify-content-center flex-row py-3">
      <div class="sp-line" />
      <div class="p-2">
        <StarIcon width="25px" color="var(--bs-primary)" />
      </div>
      <div class="sp-line" />
    </div>

    <div>#CONSULTA</div>
  </div>
</template>

<script>
import StarIcon from "@/components/icons/Star.vue";

export default {
  components: {
    StarIcon,
  },
};
</script>

<style lang="scss" scoped>
.root {
  background-color: #f0e9df;
  color: #002128;

  .sp-line {
    width: 40px;
    height: 3px;
    background: var(--bs-primary);
  }
}
</style>
