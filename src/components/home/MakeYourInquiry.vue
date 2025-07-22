<template>
  <div class="root pt-5">
    <div class="text-uppercase text-center fs-4 fw-500 lh-sm">Faça sua</div>
    <div
      class="text-uppercase text-center fw-700 lh-sm"
      style="font-size: 60px"
    >
      Consulta
    </div>

    <div class="d-flex align-items-center justify-content-center flex-row py-3">
      <div class="sp-line" />
      <div class="p-2">
        <StarIcon width="25px" color="var(--bs-primary)" />
      </div>
      <div class="sp-line" />
    </div>

    <div class="blocks-container">
      <div class="blocks">
        <div v-for="(block, index) in blocks" :key="index" class="column">
          <template v-if="index % 2 === 0">
            <div class="block image">
              <img v-if="block?.image" :src="block?.image" />
            </div>
            <div class="block info">
              <div v-if="block?.title" class="title">{{ block?.title }}</div>
              <router-link
                v-if="block?.to"
                class="btn btn-md btn-primary"
                :to="block?.to"
              >
                Saiba mais
              </router-link>
            </div>
          </template>
          <template v-else>
            <div class="block info">
              <div v-if="block?.title" class="title">{{ block?.title }}</div>
              <router-link
                v-if="block?.to"
                class="btn btn-md btn-primary"
                :to="block?.to"
              >
                Saiba mais
              </router-link>
            </div>
            <div class="block image inverse">
              <img v-if="block?.image" :src="block?.image" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarIcon from "@/components/icons/Star.vue";

import statisticsImg from "@/assets/imgs/statistics.jpg";
import animalsImg from "@/assets/imgs/horse.png";
import regulationsImg from "@/assets/imgs/regulations.avif";
import rankingsImg from "@/assets/imgs/horse-2.png";

export default {
  components: {
    StarIcon,
  },
  computed: {
    blocks() {
      return [
        {
          title: "Estatísticas",
          image: statisticsImg,
          to: { name: "statistic" },
        },
        {
          title: "Animais",
          image: animalsImg,
          to: { name: "animals" },
        },
        {
          title: "Regulamentos",
          image: regulationsImg,
          to: { name: "docs", params: { type: "regulamento" } },
        },
        {
          title: "Rankings",
          image: rankingsImg,
          to: { name: "home" },
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  background-color: #f0e9df;
  color: #002128;

  .sp-line {
    width: 40px;
    height: 3px;
    background: var(--bs-primary);
  }

  .blocks-container {
    padding: 120px;
    padding-top: 50px;
    padding-bottom: 150px;
    @media (max-width: 1100px) {
      padding: 80px;
      padding-bottom: 150px;
    }
    @media (max-width: 800px) {
      padding: 50px;
    }
    @media (max-width: 400px) {
      padding: 20px;
    }

    .blocks {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.3);

      .column {
        width: 25%;

        @media (max-width: 950px) {
          width: 50%;
        }

        @media (max-width: 500px) {
          width: 100%;
        }

        .block {
          width: 100%;
          aspect-ratio: 1 / 1;

          &.image {
            background: var(--bs-primary);
            position: relative;

            &:after {
              content: "";
              background: #fff;
              width: 20%;
              aspect-ratio: 1 / 1;
              position: absolute;
              bottom: -10%;
              left: calc(50% - 10%);
              transform: rotate(45deg);
            }

            &.inverse {
              &:after {
                bottom: initial;
                top: -10%;
              }
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          &.info {
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .title {
              text-transform: uppercase;
              font-size: 18px;
              font-weight: 600;
            }

            a.btn {
              text-transform: uppercase;
              font-weight: 600;
              font-size: 14px;
              border-radius: 0;
              padding: 4px 16px;
              margin-top: 40px;
            }
          }
        }
      }
    }
  }
}
</style>
