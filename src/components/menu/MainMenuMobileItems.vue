<template>
  <BCard no-body class="m-1 p-0">
    <template v-for="(item, key) in items" :key="key">
      <router-link
        v-if="item?.to"
        v-b-toggle="
          item.submenu && item.submenu.length != 0
            ? `mobile-menu-${level}-${key}`
            : ''
        "
        :to="item.to"
        @click="clickMenu()"
      >
        {{ item.title }}
      </router-link>
      <BLink
        v-else
        v-b-toggle="
          item.submenu && item.submenu.length != 0
            ? `mobile-menu-${level}-${key}`
            : ''
        "
        :href="
          item.href ??
          (item.submenu && item.submenu.length != 0 ? 'javascript:' : '#')
        "
        :target="item.href ? item.target ?? '_blank' : null"
        @click="item.submenu && item.submenu.length != 0 ? null : clickMenu()"
      >
        <span>{{ item.title }}</span>
        <span v-if="item.submenu && item.submenu.length != 0" class="float-end">
          <ChevronDownIcon width="20px" />
        </span>
      </BLink>

      <BCollapse
        v-if="item.submenu && item.submenu.length != 0"
        :id="`mobile-menu-${level}-${key}`"
      >
        <MainMenuMobileItems
          :items="item.submenu"
          :level="level + 1"
          @menu="clickMenu"
        />
      </BCollapse>
    </template>
    <hr />
  </BCard>
</template>

<script>
import ChevronDownIcon from "@/components/icons/ChevronDown.vue";

export default {
  components: {
    ChevronDownIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    async clickMenu() {
      this.$emit("menu");
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0;
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.3);

  > a {
    text-transform: uppercase;
    color: #000;
    font-size: 15px;
    font-weight: 600;
    border-bottom: 1px solid var(--bs-primary);
    padding: 10px 5px 8px 5px;
    margin: 0 10px;
    width: calc(100% - 20px);
    text-wrap: auto;
    text-decoration: none;

    &:hover {
      background-color: var(--bs-primary);
      text-decoration: none;
    }
  }

  hr {
    padding: 0;
    margin: 0 10px;
    border-width: 6px;
    border-color: var(--bs-primary);
    opacity: 1;
  }
}
</style>
