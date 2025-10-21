<template>
  <Header />

  <main>
    <RouterView :key="$route.fullPath" />
  </main>
  <Footer :spacing="!isHome" />
</template>

<script>
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    isHome() {
      return this.$route.name === "home";
    },
  },
  mounted() {
    //console.log("App mounted");
  },
};
</script>

<style lang="scss">
body {
  display: flex;
  justify-content: center;

  #app {
    width: 100%;
    max-width: 1100px;
  }
}
</style>
