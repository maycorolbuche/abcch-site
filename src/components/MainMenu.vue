<template>
  <nav class="navbar navbar-expand">
    <MainMenuItems :items="items" />
  </nav>
</template>

<script>
import MainMenuItems from "@/components/MainMenuItems.vue";

export default {
  components: {
    MainMenuItems,
  },
  props: {
    items: Array,
  },
};
</script>
