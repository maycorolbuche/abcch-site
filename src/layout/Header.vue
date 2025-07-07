<template>
  <header
    class="d-flex flex-nowrap flex-row justify-content-center pt-3 pb-1 px-3"
  >
    <div class="left-menu flex-auto">
      <div class="header-title fw-bold fst-italic h-50">
        ASSOCIAÇÃO BRASILEIRA DOS CRIADORES DO CAVALO BRASILEIRO DE HIPISMO
      </div>
      <div class="main-menu h-50">
        <MainMenu :items="menu[0]" />
      </div>
    </div>
    <div class="logo-menu">
      <Logo :width="100" />
    </div>
    <div class="flex-auto">
      <div
        class="social-icons h-50 d-flex justify-content-end"
        style="gap: 20px"
      >
        <a href="">
          <MagnifyIcon width="26px" />
        </a>
        <a href="">
          <FacebookIcon width="26px" />
        </a>
        <a href="">
          <YoutubeIcon width="26px" />
        </a>
        <a href="">
          <InstagramIcon width="26px" />
        </a>
        <a href="">
          <WhatsappIcon width="26px" />
        </a>
        <a href="" class="menu-mobile-button">
          <MenuIcon width="26px" color="var(--bs-primary)" />
        </a>
      </div>
      <div class="main-menu h-50">
        <MainMenu :items="menu[1]" />
      </div>
    </div>
  </header>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import Logo from "@/components/Logo.vue";

import MagnifyIcon from "@/components/icons/Magnify.vue";
import FacebookIcon from "@/components/icons/Facebook.vue";
import YoutubeIcon from "@/components/icons/Youtube.vue";
import InstagramIcon from "@/components/icons/Instagram.vue";
import WhatsappIcon from "@/components/icons/Whatsapp.vue";
import MenuIcon from "@/components/icons/Menu.vue";

export default {
  components: {
    MainMenu,
    Logo,

    MagnifyIcon,
    FacebookIcon,
    YoutubeIcon,
    InstagramIcon,
    WhatsappIcon,
    MenuIcon,
  },
  computed: {
    menu() {
      return [
        [
          {
            title: "Home",
          },
          {
            title: "Studbook",
            submenu: [
              {
                title: "Como registrar",
              },
              {
                title: "Lançamento de cobrição",
              },
              {
                title: "Consulta genealógica",
              },
              {
                title: "Acompanhe o registro do seu potro",
              },
              {
                title: "Garanhões",
              },
              {
                title: "Matrizes de ouro",
                submenu: [
                  {
                    title: "Regulamento",
                  },
                  {
                    title: "Quem são",
                  },
                  {
                    title: "Fotos",
                  },
                ],
              },
              {
                title: "Cruzamento virtual",
              },
              {
                title: "Formulários",
              },
              {
                title: "Inspetores",
              },
              {
                title: "Conselho D. técnico",
              },
              {
                title: "Tabela de molumentos",
              },
              {
                title: "Regulamentos",
                submenu: [
                  {
                    title: "Reprodutores",
                  },
                  {
                    title: "Stud book",
                  },
                ],
              },
            ],
          },
          {
            title: "ABCCH",
          },
          {
            title: "Eventos",
          },
        ],
        [
          {
            title: "Transparência",
          },
          {
            title: "Contato / Ouvidoria",
          },
          {
            title: "Área Restrita",
          },
        ],
      ];
    },
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

  @media (max-width: 600px) {
    flex-direction: column !important;

    .left-menu {
      display: none;
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
