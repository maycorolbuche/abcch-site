<template>
  <Icon
    v-bind="$attrs"
    path="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
  />
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Icon,
  },
  inheritAttrs: false,
};
</script>
