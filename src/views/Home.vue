<template>
  <div class="row">
    <div class="col-12 col-md-6">COL1</div>
    <div class="col-12 col-md-6">
      <LatestNews />
    </div>
  </div>
</template>

<script>
import LatestNews from "@/components/LatestNews.vue";

export default {
  components: {
    LatestNews,
  },
};
</script>
