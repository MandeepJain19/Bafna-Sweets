<template>
  <div class="container">
    <div class="productCart">
      <order-form></order-form>
      <the-cart></the-cart>
    </div>
  </div>
</template>

<script>
import OrderForm from "../CartComponent/OrderForm.vue";
import TheCart from "../CartComponent/TheCart.vue";
export default {
  components: {
    OrderForm,
    TheCart,
  },
  mounted() {
    window.scrollTo(0, 0);
    if (!this.$store.getters.isAuthenticated)
      this.$store.commit("showLoginSignupDialog");
  },
};
</script>

<style scoped>
.container {
  max-width: 130rem;
  /* height: 100vh; */
  margin: 3.6rem auto 0 auto;
  overflow: hidden;
}
.productCart {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
}

@media (max-width: 60em) {
  .productCart {
    grid-template-columns: 1fr;
    padding-left: 0.4rem;
  }
}
</style>
