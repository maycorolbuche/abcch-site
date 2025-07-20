<template>
  <div>
    <div v-if="!loading" class="bg-primary my-3 p-4">
      <div v-if="title" class="text-center text-white fw-700 fs-2">
        {{ title }}
      </div>
      <slot />
    </div>
    <BPlaceholder
      v-else
      variant="primary"
      width="100%"
      class="my-3 p-4"
      animation="glow"
      style="height: 100px"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    loading: Boolean,
  },
};
</script>
