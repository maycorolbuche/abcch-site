<template>
  <svg
    :style="{ width: width }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path :fill="color" :d="path" />
  </svg>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    color: String,
    width: String,
  },
};
</script>
