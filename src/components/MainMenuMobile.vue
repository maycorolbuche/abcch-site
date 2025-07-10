<template>
  <div class="menu-container" ref="menuContainer">
    <BLink v-b-toggle.collapse-menu>
      <MenuIcon width="26px" color="var(--bs-primary)" />
    </BLink>

    <BCollapse
      id="collapse-menu"
      ref="collapse"
      class="position-absolute left-0 w-100"
      @show="isCollapseOpen = true"
      @hide="isCollapseOpen = false"
    >
      <div>
        <div class="close-area text-end">
          <BLink v-b-toggle.collapse-menu>
            <CloseIcon width="32px" color="#FFF" />
          </BLink>
        </div>
        <div class="collapse-area">
          <MainMenuMobileItems :items="items" v-if="buildMenu" />
        </div>
      </div>
    </BCollapse>

    <transition name="fade">
      <div v-show="isCollapseOpen" class="menu-bg">fdsfsfds</div>
    </transition>
  </div>
</template>

<script>
import MenuIcon from "@/components/icons/Menu.vue";
import CloseIcon from "@/components/icons/Close.vue";
import MainMenuMobileItems from "@/components/MainMenuMobileItems.vue";

export default {
  components: {
    MainMenuMobileItems,
    MenuIcon,
    CloseIcon,
  },
  props: {
    items: Array,
  },
  data() {
    return {
      isCollapseOpen: false,
      buildMenu: true,
    };
  },
  watch: {
    isCollapseOpen(newVal) {
      document.body.classList.toggle("overflow-hidden", newVal);
      document.documentElement.classList.toggle("overflow-hidden", newVal);

      if (!newVal) {
        this.buildMenu = false;
        let self = this;
        setTimeout(function () {
          self.buildMenu = true;
        }, 10);
      }
    },
  },
  methods: {
    handleClickOutside(event) {
      const menu = this.$refs.menuContainer;
      if (menu && !menu.contains(event.target)) {
        this.closeCollapse();
      }
    },
    closeCollapse() {
      const collapse = this.$refs.collapse;
      if (collapse?.hide) collapse.hide();
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.unwatchRoute = this.$watch("$route", () => {
      this.closeCollapse();
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
    if (this.unwatchRoute) this.unwatchRoute();
  },
};
</script>

<style lang="scss">
.menu-container {
  #collapse-menu {
    z-index: 999;
    top: 0;

    .close-area {
      margin: 4px;
      margin-bottom: -5px;
      background: var(--bs-primary);
      padding: 10px;
    }

    .collapse-area {
      max-height: calc(100vh - 60px);
      overflow: auto;
    }
  }

  .menu-bg {
    height: 100vh;
    top: 0px;
    left: 0px;
    position: fixed;
    background: #000;
    width: 100vw;
    z-index: 998;
    opacity: 0.5;
  }
}
</style>
