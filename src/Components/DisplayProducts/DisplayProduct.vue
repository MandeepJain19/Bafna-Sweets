<template>
  <section id="products">
    <div class="container">
      <figure
        class="product"
        v-for="(product, index) in products"
        :key="index"
        @click="showProductDetail(index)"
      >
        <div class="image">
          <img :src="`${product.img}`" />
        </div>
        <div class="text">
          <div class="name">{{ product.name }}</div>
          <div class="price">&#8377; {{ product.price }}</div>
        </div>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 120rem;
  margin: 0 auto;
  /* margin-top: 9.6rem; */
  padding: 4.8rem;
  padding-top: 19.4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1.8rem;
  row-gap: 6.2rem;
  align-items: center;
  justify-content: center;
}
.product {
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.image {
  height: 100%;
  width: 100%;
  border-radius: 5%;
  overflow: hidden;
}
.product img:hover {
  /* opacity: 0.6; */
  transform: scale(1.1);
}
img {
  height: 100%;
  width: 100%;
  border-radius: 5%;
  /* transition: all 1s ease-in-out; */
  /* overflow: hidden; */
  object-fit: cover;
  transition: all 0.4s;
}

.text {
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
}

.extra {
  height: 200rem;
  max-width: 130rem;
}

@media (max-width: 60em) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 45em) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 34em) {
  .container {
    /* padding: 2rem; */
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

<script>
// import AddProduct from "../UI/AddToCartButton.vue";

export default {
  components: {
    // AddProduct,
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
  },
  methods: {
    showProductDetail(index) {
      this.$store.dispatch("showProducts", index);
    },
  },
};
</script>
