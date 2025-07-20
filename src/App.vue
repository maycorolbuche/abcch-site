<template>
  <Header />

  <main>
    <RouterView :key="$route.fullPath" />
  </main>

  <Footer />
</template>

<script>
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
