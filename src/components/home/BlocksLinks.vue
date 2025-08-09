<template>
  <div class="block-container">
    <router-link v-for="block in blocks" :key="block.title" :to="block.to">
      <span>{{ block.title }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    blocks() {
      return [
        {
          title: "Consulta Genealógica",
          to: { name: "animals" },
        },
        {
          title: "Studbook",
          to: { name: "gold_mares" },
        },
        {
          title: "Formulários",
          to: { name: "forms" },
        },
        {
          title: "Biblioteca Virtual",
          to: { name: "library" },
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
