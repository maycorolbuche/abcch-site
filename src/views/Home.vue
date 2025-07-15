<template>
  <div class="row">
    <div class="col-12 col-md-6">#BANNERS</div>
    <div class="col-12 col-md-6">
      <LatestNews />
    </div>
  </div>

  <div class="px-4 mb-5">
    <Banner type="banner" />
  </div>

  <BeAssociate />
  <Separator secondary-color="#F0E9DF" />

  <div style="background-color: #f0e9df">#CONSULTA</div>
</template>

<script>
import Separator from "@/components/Separator.vue";

import Banner from "@/components/Banner.vue";

import LatestNews from "@/components/home/LatestNews.vue";
import BeAssociate from "@/components/home/BeAssociate.vue";

export default {
  components: {
    Separator,
    LatestNews,
    BeAssociate,
  },
};
</script>
