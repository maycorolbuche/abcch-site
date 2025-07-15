<template>
  <div class="root-element" :style="{ background: primaryColor }">
    <div :style="{ background: secondaryColor }" />
    <div :style="{ background: secondaryColor }" />
  </div>
</template>

<script>
export default {
  props: {
    primaryColor: {
      type: String,
      default: "var(--bs-primary)",
    },
    secondaryColor: {
      type: String,
      default: "var(--bs-secondary)",
    },
  },
};
</script>

<style lang="scss" scoped>
.root-element {
  height: 50px;

  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  flex-direction: row;

  > div {
    width: 50%;

    &:first-child {
      border-radius: 0 50px 0 0;
    }
    &:last-child {
      border-radius: 50px 0 0 0;
    }
  }
}
</style>
