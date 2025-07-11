<template>
  <div class="bg-primary my-3 p-4">
    <div v-if="title" class="text-center text-white fw-700 fs-2">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
