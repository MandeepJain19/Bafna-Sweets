<template>
  <div class="container">
    <hero-section></hero-section>
    <display-product></display-product>
    <product-detail :key="new Date()"></product-detail>
  </div>
</template>

<script>
import HeroSection from "../HeroSection/HeroSection.vue";
import DisplayProduct from "../DisplayProducts/DisplayProduct.vue";
import ProductDetail from "../UI/ProductDetail.vue";

export default {
  components: {
    HeroSection,
    DisplayProduct,
    ProductDetail,
  },
  beforeMount() {
    this.$store.dispatch("getAllProducts");
  },
  beforeRouteLeave() {
    document.querySelector(".nav").classList.remove("fixed");
  },
};
</script>

<style scoped></style>
