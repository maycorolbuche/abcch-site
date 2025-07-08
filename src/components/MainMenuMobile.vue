<template>
  <BLink v-b-toggle.collapse-menu>
    <MenuIcon width="26px" color="var(--bs-primary)" />
  </BLink>

  <BCollapse id="collapse-menu" class="position-absolute left-0 w-100">
    <MainMenuMobileItems :items="items" />
  </BCollapse>
</template>

<script>
import MenuIcon from "@/components/icons/Menu.vue";
import MainMenuMobileItems from "@/components/MainMenuMobileItems.vue";

export default {
  components: {
    MainMenuMobileItems,
    MenuIcon,
  },
  props: {
    items: Array,
  },
};
</script>
