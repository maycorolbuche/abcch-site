<template>
  <div class="block-container">
    <router-link v-for="block in blocks" :key="block.title" :to="block.to">
      <div v-if="block?.img" class="bg">
        <img :src="block.img" />
      </div>
      <span v-html="block.title" />
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
          title: "Consulta<br>Genealógica",
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
    position: relative;
    background: #ccc;
    height: 175px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    span {
      z-index: 1;
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
