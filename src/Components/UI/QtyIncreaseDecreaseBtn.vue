<template>
  <div class="addLessBtn">
    <the-button :type="type" @click="decreaseQty()">-</the-button>
    <span :class="qtyType" class="qty"><slot></slot> </span>
    <the-button :type="type" @click="increaseQty()">+</the-button>
  </div>
</template>

<script>
import TheButton from "./TheButton.vue";
export default {
  props: ["type", "qtyType"],
  components: {
    TheButton,
  },
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    increaseQty() {
      this.$emit("increaseQty");
    },
    decreaseQty() {
      this.$emit("decreaseQty");
    },
  },
};
</script>

<style scoped>
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
.small-qty {
  font-size: 2rem;
  font-weight: 500;
}

@media (max-width: 54rem) {
  button {
    padding: 1rem;
    font-size: 2rem;
  }
}
</style>
