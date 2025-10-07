<template>
  <BRow class="m-0 p-0 pt-4">
    <BCol :cols="12" :md="6" class="m-0 p-0 pe-md-2">
      <BlocksLinks />
    </BCol>
    <BCol :cols="12" :md="6" class="m-0 p-0 ps-2 pe-4">
      <LatestNews />
    </BCol>
  </BRow>

  <BRow class="m-0 p-0 py-2 pb-4">
    <BCol :cols="12" :md="6" class="m-0 p-0 pe-md-2">
      <Banner type="banner" />
      <BlocksPartners class="pt-3" :line="2" />
    </BCol>
    <BCol :cols="12" :md="6" class="m-0 p-0 ps-md-2">
      <BlocksPartners class="pb-3" :line="1" />
      <Banner type="info" />
    </BCol>
  </BRow>

  <BeAssociate />
  <Separator primary-color="var(--bs-tertiary)" secondary-color="#F0E9DF" />

  <MakeYourInquiry />
</template>

<script>
import Separator from "@/components/Separator.vue";

import Banner from "@/components/Banner.vue";

import BlocksLinks from "@/components/home/BlocksLinks.vue";
import BlocksPartners from "@/components/home/BlocksPartners.vue";
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
