<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <div class="d-flex align-items-center" style="gap: 5px">
        <img
          v-if="item.items"
          src="@/assets/imgs/icon-folder.png"
          width="20"
          height="20"
        />
        <img v-else src="@/assets/imgs/icon-file.png" width="20" height="20" />

        <BLink v-if="item.url" :href="item.url" target="_blank">
          {{ item.descricao }}
        </BLink>
        <span v-else-if="item.items" class="fw-500">
          {{ item.descricao }}
        </span>
        <span v-else>
          {{ item.descricao }}
        </span>
      </div>

      <DocList v-if="item.items" :items="item.items" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  li {
    padding: 5px 0 5px 0;
  }
}
</style>
