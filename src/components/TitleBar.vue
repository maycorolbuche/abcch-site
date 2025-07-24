<template>
  <div>
    <div v-if="!loading" class="bg-primary my-3 p-5">
      <div class="text-center text-white" style="line-height: 1.3">
        <div v-if="title" class="fs-2 fw-700 p-0 m-0">
          {{ title.toUpperCase() }}
        </div>
        <div v-if="subtitle" class="fs-3 fw-400 p-0 m-0">
          {{ subtitle.toUpperCase() }}
        </div>
      </div>
      <slot />
    </div>
    <BPlaceholder
      v-else
      variant="primary"
      width="100%"
      class="my-3 p-4"
      animation="glow"
      style="height: 130px"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
    loading: Boolean,
  },
};
</script>
