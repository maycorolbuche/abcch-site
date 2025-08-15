<template>
  <BRow class="m-0 p-0">
    <BCol :cols="12" :md="6" class="p-0 pt-4">
      <BlocksLinks />
    </BCol>
    <BCol :cols="12" :md="6" class="p-0 px-4 pt-4">
      <LatestNews />
    </BCol>
  </BRow>

  <div>
    <Banner type="banner" />
  </div>

  <BeAssociate />
  <Separator secondary-color="#F0E9DF" />

  <MakeYourInquiry />
</template>

<script>
import Separator from "@/components/Separator.vue";

import Banner from "@/components/Banner.vue";

import BlocksLinks from "@/components/home/BlocksLinks.vue";
import LatestNews from "@/components/home/LatestNews.vue";
import BeAssociate from "@/components/home/BeAssociate.vue";
import MakeYourInquiry from "@/components/home/MakeYourInquiry.vue";

export default {
  components: {
    Banner,
    Separator,
    BlocksLinks,
    LatestNews,
    BeAssociate,
    MakeYourInquiry,
  },
};
</script>
