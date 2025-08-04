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
        <!--
        <BLink href="" target="_blank">
          <MagnifyIcon width="26px" />
        </BLink>
        -->
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
  computed: {
    menu() {
      return [
        [
          {
            title: "Home",
            to: { name: "home" },
          },
          {
            title: "Studbook",
            submenu: [
              {
                title: "Como registrar",
                to: {
                  name: "page",
                  params: { menu: "abcch", submenu: "registrar" },
                },
              },
              {
                title: "Lançamento de cobrição",
                href: "https://abcch.com.br/sistema/",
              },
              {
                title: "Consulta genealógica",
                to: { name: "animals" },
              },
              {
                title: "Acompanhe o registro do seu potro",
                href: "https://abcch.com.br/sistema/",
              },
              /*{
                title: "Garanhões",
              },*/
              /*{
                title: "Matrizes de ouro",
                submenu: [
                  {
                    title: "Regulamento",
                    to: { name: "gold_mares" },
                  },
                  {
                    title: "Quem são",
                  },
                  {
                    title: "Fotos",
                  },
                ],
              },*/
              {
                title: "Matrizes de ouro",
                to: { name: "gold_mares" },
              },
              {
                title: "Cruzamento virtual",
                to: { name: "virtual_crossing_search" },
              },
              {
                title: "Mapa genético",
                to: {
                  name: "page",
                  params: { menu: "studbook", submenu: "mapa" },
                },
              },
              {
                title: "Formulários",
                to: { name: "forms" },
              },
              {
                title: "Inspetores",
                to: { name: "inspectors" },
              },
              {
                title: "Criadores",
                to: { name: "creators" },
              },
              {
                title: "Conselho D. técnico",
                to: {
                  name: "page",
                  params: { menu: "abcch", submenu: "diretoria" },
                },
              },
              {
                title: "Atas CDT",
                to: {
                  name: "docs",
                  params: { type: "cdt" },
                },
              },
              {
                title: "Rankings",
                to: {
                  name: "docs",
                  params: { type: "ranking" },
                },
              },
              {
                title: "Comunicados",
                to: {
                  name: "docs",
                  params: { type: "comunicado" },
                },
              },
              {
                title: "Tabela de emolumentos",

                to: {
                  name: "page",
                  params: { menu: "abcch", submenu: "emolumentos" },
                },
              },
              {
                title: "Regulamentos",
                to: {
                  name: "docs",
                  params: { type: "regulamento" },
                },
              },
              /*
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
              */
            ],
          },
          {
            title: "ABCCH",
            to: {
              name: "page",
              params: { menu: "abcch", submenu: "sobre" },
            },
          },
          {
            title: "Eventos",
            submenu: [
              {
                title: "Festival Nacional",
                to: {
                  name: "docs",
                  params: { type: "festival" },
                },
              },
              /*
              {
                title: "Festival do BH",
              },
              {
                title: "Gran Slam",
              },
              {
                title: "Dia de Campo",
              },
              {
                title: "BH TV",
              },
              {
                title: "Palestras/Cursos",
              },
              */
            ],
          },
        ],
        [
          {
            title: "Transparência",
            to: {
              name: "docs",
              params: { type: "transparencia" },
            },
          },
          {
            title: "Contato / Ouvidoria",
            to: { name: "contact" },
          },
          {
            title: "Área Restrita",
            href: "https://abcch.com.br/sistema/",
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
