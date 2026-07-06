<template>
  <div
    :data-level="level"
    class="block-container"
    :class="{
      'ps-5': level == 1,
      'pe-5': level == maxLevel,
    }"
  >
    <div
      v-for="(block, index) in blocks"
      :key="index"
      class="block-row d-flex align-items-stretch flex-row flex-nowrap"
      :class="{
        'mt-4': index == 1 && level == 1,
      }"
      :data-index="index"
    >
      <div class="d-flex flex-column position-relative">
        <div
          class="block-title text-center fw-600 fs-13px"
          v-if="top && index == 0"
        >
          {{ title ?? "&nbsp;" }}
        </div>
        <div class="d-flex align-items-stretch" style="flex: auto">
          <div
            v-if="level > 1"
            class="d-flex"
            :class="{ 'align-items-end': index == 0 }"
          >
            <div
              class="block-separator block-separator-left"
              :data-index="index"
            />
            <div
              class="block-separator block-separator-right"
              :data-index="index"
            />
          </div>
          <div
            :style="{
              backgroundColor: block.color,
              flex: 'auto',
              width: '180px',
            }"
            class="block d-flex align-items-center justify-content-center text-center fw-600 fs-12px p-1 my-2"
            :data-level="level"
            :data-index="index"
          >
            <div v-if="level == 1" class="block-icon" :data-index="index">
              <div>
                <GenderMale v-if="index == 0" width="90px" color="#FFF" />
                <GenderFemale v-else width="90px" color="#FFF" />
              </div>
            </div>
            <router-link
              v-if="data[index]"
              :to="{
                name: 'animal',
                params: { id: data[index]?.cdToken },
              }"
              class="text-dark"
            >
              <span>{{ data[index]?.nmAnimal }}</span>
              <div v-if="data[index]?.cdGoldMaresType" class="pt-2">
                <img
                  v-for="escarapela in escarapelas(
                    data[index]?.cdGoldMaresType,
                  )"
                  :key="escarapela"
                  :alt="escarapela"
                  :src="escarapela"
                  style="width: 35px; margin: 1px"
                />
              </div>
            </router-link>
            <span v-else> &nbsp; </span>
          </div>
        </div>
      </div>
      <FamilyTree
        v-if="level < maxLevel"
        :level="level + 1"
        :max-level="maxLevel"
        :top="top && index == 0"
        :sire="data[index]?.sire"
        :dam="data[index]?.dam"
      />
    </div>
  </div>
</template>

<script>
import GenderMale from "@/components/icons/GenderMale.vue";
import GenderFemale from "@/components/icons/GenderFemale.vue";

import escarapelaEImg from "@/assets/imgs/escarapela_E.png";
import escarapelaPImg from "@/assets/imgs/escarapela_P.png";
import escarapelaCImg from "@/assets/imgs/escarapela_C.png";
import escarapelaSImg from "@/assets/imgs/escarapela_S.png";

export default {
  components: {
    GenderMale,
    GenderFemale,
  },
  props: {
    maxLevel: {
      type: Number,
      default: 4,
    },
    level: {
      type: Number,
      default: 1,
    },
    top: {
      type: Boolean,
      default: true,
    },
    sire: Object,
    dam: Object,
  },
  computed: {
    blocks() {
      return [
        {
          color: "#9DBFE2",
        },
        {
          color: "#F2DDEE",
        },
      ];
    },
    title() {
      return ["PAIS", "AVÓS", "BISAVÓS", "TRISAVÓS"][this.level - 1];
    },
    data() {
      return [this.sire, this.dam];
    },
  },
  methods: {
    escarapelas(types) {
      const images = {
        E: escarapelaEImg,
        P: escarapelaPImg,
        C: escarapelaCImg,
        S: escarapelaSImg,
      };

      return (types ?? "")
        .split("")
        .map((letter) => images[letter])
        .filter(Boolean);
    },
  },
};
</script>

<style lang="scss" scoped>
.block-container {
  .block {
    border-radius: 15px;
    transition: box-shadow 0.1s ease-in-out 0s;
    &:hover {
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
    }

    .block-icon {
      position: absolute;
      left: 0;
      width: 60px;
      height: 60px;
      overflow: hidden;

      &[data-index="0"] {
        bottom: 7px;
        > div {
          bottom: -30px;
          left: -30px;
        }
      }
      &[data-index="1"] {
        top: 7px;
        > div {
          top: -35px;
          left: -35px;

          svg {
            transform: rotate(320deg);
          }
        }
      }

      > div {
        position: absolute;
      }
    }
  }

  .block[data-level="1"][data-index="0"]::after,
  .block[data-level="1"][data-index="1"]::after {
    content: "";
    border-left: 13px solid #afafaf;
    height: 70px;
    left: 50%;
    z-index: -1;
    position: absolute;
  }
  .block[data-level="1"][data-index="0"]::after {
    bottom: -50px;
    transform: rotate(35deg);
  }
  .block[data-level="1"][data-index="1"]::after {
    top: -50px;
    transform: rotate(325deg);
  }

  .block-separator {
    width: 20px;
    height: 50%;
  }
  .block-separator-left[data-index="0"] {
    border-bottom: 2px solid #afafaf;
  }
  .block-separator-left[data-index="1"] {
    border-top: 2px solid #afafaf;
  }
  .block-separator-right[data-index="0"] {
    border-left: 4px solid #afafaf;
    border-top: 4px solid #afafaf;
  }
  .block-separator-right[data-index="1"] {
    border-left: 4px solid #afafaf;
    border-bottom: 4px solid #afafaf;
  }
}
</style>
>
