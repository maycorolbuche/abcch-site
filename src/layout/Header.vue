<template>
  <header
    class="d-flex flex-nowrap flex-row justify-content-center pt-3 pb-1 px-3"
  >
    <div class="flex-auto">
      <div class="header-title fw-bold h-50">
        ASSOCIAÇÃO BRASILEIRA DOS CRIADORES DO CAVALO BRASILEIRO DE HIPISMO
      </div>
      <div class="h-50">
        <MainMenu :items="menu[0]" />
      </div>
    </div>
    <div>
      <Logo :width="100" />
    </div>
    <div class="flex-auto">
      <div class="h-50">LINHA 1</div>
      <div class="h-50">
        <MainMenu :items="menu[1]" />
      </div>
    </div>
  </header>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import Logo from "@/components/Logo.vue";

export default {
  components: {
    MainMenu,
    Logo,
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
                title: "SMenu 1",
              },
              {
                title: "SMenu 2",
                submenu: [
                  {
                    title: "3SMenu 1",
                  },
                  {
                    title: "3SMenu 2",
                    submenu: [
                      {
                        title: "4SMenu 1",
                      },
                      {
                        title: "4SMenu 2",
                      },
                      {
                        title: "4SMenu 3",
                      },
                    ],
                  },
                  {
                    title: "3SMenu 3",
                  },
                ],
              },
              {
                title: "SMenu 3",
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
}
</style>
