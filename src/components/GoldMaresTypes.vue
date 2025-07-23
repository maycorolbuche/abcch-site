<template>
  <div class="d-flex align-items-center justify-content-evenly flex-wrap">
    <router-link
      v-for="item in items"
      :key="item.title"
      :to="{
        name: 'gold_mares_data',
        params: { type: item.type.toLowerCase() },
      }"
      class="d-flex flex-column align-items-center m-3"
    >
      <img :src="item.image" alt="Escarapela" />
      <span class="text-black fw-bold text-uppercase fs-16px pt-2">
        {{ item.title }}
      </span>
    </router-link>
  </div>
</template>

<script>
import escarapelaEImg from "@/assets/imgs/escarapela_E.png";
import escarapelaPImg from "@/assets/imgs/escarapela_P.png";
import escarapelaCImg from "@/assets/imgs/escarapela_C.png";
import escarapelaSImg from "@/assets/imgs/escarapela_S.png";

export default {
  computed: {
    items() {
      return [
        {
          title: "Elite",
          image: escarapelaEImg,
          type: "E",
        },
        {
          title: "Premium",
          image: escarapelaPImg,
          type: "P",
        },
        {
          title: "Competition",
          image: escarapelaCImg,
          type: "C",
        },
        {
          title: "Special",
          image: escarapelaSImg,
          type: "S",
        },
      ];
    },
  },
};
</script>
