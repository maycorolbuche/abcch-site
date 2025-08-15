<template>
  <div class="block-container">
    <router-link
      v-for="block in blocks"
      :key="block.title"
      :to="block.to"
      :style="{ backgroundImage: block?.img ? `url(${block.img})` : '' }"
    >
      <span>{{ block.title }}</span>
    </router-link>
  </div>
</template>

<script>
import geneticaImg from "@/assets/imgs/genetica.jpg";
import registreImg from "@/assets/imgs/registre_seu_potro.png";
import friesianImg from "@/assets/imgs/friesian.jpg";
import festivalImg from "@/assets/imgs/festival_bh.jpg";

export default {
  computed: {
    blocks() {
      return [
        {
          title: "Consulta Genealógica",
          to: { name: "animals" },
          img: geneticaImg,
        },
        {
          title: "Registre Seu Potro",
          to: {
            name: "page",
            params: { menu: "abcch", submenu: "registrar" },
          },
          img: registreImg,
        },
        {
          title: "Friesian",
          to: { name: "animals" },
          img: friesianImg,
        },
        {
          title: "Festival BH",
          to: {
            name: "docs",
            params: { type: "festival" },
          },
          img: festivalImg,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.block-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }

  > a {
    background: #ccc;
    background-position: center;
    background-size: cover;
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    span {
      background: var(--bs-primary);
      color: #fff;
      padding: 3px 8px;
      font-size: 17px;
      font-weight: bold;
      text-align: center;
      text-shadow: 1px 2px 2px #000000;
    }

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
>
