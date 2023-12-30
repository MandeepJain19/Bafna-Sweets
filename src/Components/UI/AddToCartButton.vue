<template>
  <div class="cartButton" @click="addProduct">
    <div class="addLessBtn">
      <the-button @click="decreaseQty()">-</the-button>
      <span class="qty">{{ quantity }} </span>
      <the-button @click="increaseQty">+</the-button>
    </div>
    <the-button class="addToCartbtn">Add To Cart</the-button>
  </div>
</template>
<style scoped>
.cartButton {
  display: flex;
  gap: 2rem;
}
.addLessBtn {
  display: flex;
  gap: 1.8rem;
  justify-content: center;
  align-items: center;
}
.qty {
  font-size: 2.4rem;
  font-weight: 600;
}
</style>

<script>
import TheButton from "./TheButton.vue";
export default {
  components: {
    TheButton,
  },
  data() {
    return {
      click: false,
      quantity: 1,
    };
  },
  methods: {
    addProduct() {
      this.click = true;
    },
    increaseQty() {
      this.quantity++;
    },
    decreaseQty() {
      if (this.quantity > 0) this.quantity--;
      else return;
    },
  },
};
</script>
