<template>
  <header
    class="d-flex flex-nowrap flex-row justify-content-center pt-3 pb-1 px-3"
  >
    <div class="left-menu flex-auto">
      <div class="header-title fw-bold fst-italic h-50">
        ASSOCIAÇÃO BRASILEIRA DE CRIADORES<br />DO CAVALO DE HIPISMO
      </div>
      <div class="main-menu h-50">
        <MainMenu :items="menu[0]" />
      </div>
    </div>
    <div class="logo-menu px-2">
      <Logo :width="140" />
    </div>
    <div class="flex-auto">
      <div
        class="social-icons h-50 d-flex justify-content-end"
        style="gap: 20px"
      >
        <router-link :to="{ name: 'search' }">
          <MagnifyIcon width="26px" />
        </router-link>

        <BLink
          href="https://www.facebook.com/BRASILEIRODEHIPISMO/"
          target="_blank"
        >
          <FacebookIcon width="26px" />
        </BLink>
        <BLink
          href="https://www.youtube.com/user/brasileirodehipismo"
          target="_blank"
        >
          <YoutubeIcon width="26px" />
        </BLink>
        <BLink href="https://www.instagram.com/abcch_oficial/" target="_blank">
          <InstagramIcon width="26px" />
        </BLink>
        <!--
        <BLink href="" target="_blank">
          <WhatsappIcon width="26px" />
        </BLink>
        -->
        <div class="menu-mobile-button">
          <MainMenuMobile :items="[...menu[0], ...menu[1]]" />
        </div>
      </div>
      <div class="main-menu h-50">
        <MainMenu :items="menu[1]" />
      </div>
    </div>
  </header>
</template>

<script>
import Api from "@/services/Api.js";
import Storage from "@/helpers/Storage.js";

import MainMenu from "@/components/menu/MainMenu.vue";
import MainMenuMobile from "@/components/menu/MainMenuMobile.vue";
import Logo from "@/components/Logo.vue";

import MagnifyIcon from "@/components/icons/Magnify.vue";
import FacebookIcon from "@/components/icons/Facebook.vue";
import YoutubeIcon from "@/components/icons/Youtube.vue";
import InstagramIcon from "@/components/icons/Instagram.vue";
import WhatsappIcon from "@/components/icons/Whatsapp.vue";

export default {
  components: {
    MainMenu,
    MainMenuMobile,
    Logo,

    MagnifyIcon,
    FacebookIcon,
    YoutubeIcon,
    InstagramIcon,
    WhatsappIcon,
  },
  data: () => ({
    data: null,
  }),
  computed: {
    menu() {
      if (!this.data) {
        return [[], []];
      }

      const count = this.data.length;
      const left_count = count > 0 ? Math.ceil(count / 2) : 0;
      const rigth_count = count - left_count;

      const left_menu = left_count > 0 ? this.data.slice(0, left_count) : [];
      const right_menu =
        rigth_count > 0 ? this.data.slice(rigth_count * -1) : [];

      return [left_menu, right_menu];
    },
  },
  methods: {
    async loadData() {
      this.data = Storage.get("menu");

      let self = this;

      await Api.get("/menu", {}, function (status, data) {
        if (status) {
          self.data = data;

          Storage.set("menu", data);
        }
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
header {
  .header-title {
    font-size: 12px;
  }

  .menu-mobile-button {
    display: none;
  }

  @media (max-width: 900px) {
    .menu-mobile-button {
      display: initial;
    }

    .main-menu {
      display: none;
    }
  }

  @media (max-width: 660px) {
    flex-direction: column !important;

    .left-menu {
      text-align: center;
    }

    .social-icons {
      flex-wrap: wrap;
    }

    .logo-menu {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
}
</style>
