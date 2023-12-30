<template>
  <div class="tab-container">
    <div class="heading"><h2>All orders</h2></div>

    <the-spinner v-if="isLoading"></the-spinner>
    <tab-component
      v-for="order in orders"
      :key="order.id"
      :order="order"
    ></tab-component>
  </div>
</template>

<style scoped>
.tab-container {
  max-width: 120rem;
  margin: 0 auto;
  margin-top: 3.6rem;
  padding: 3.2rem;
  padding-top: 0;
  border: 1px solid #1111;
}
.tab-container .heading {
  margin: 3.2rem 0 3.2rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.hidden {
  display: none !important;
}
</style>

<script>
import TabComponent from "./TabComponent.vue";
import TheSpinner from "../UI/TheSpinner.vue";
export default {
  components: {
    TabComponent,
    TheSpinner,
  },
  data() {
    return {
      //
      orders: null,
    };
  },
  computed: {
    isHidden() {
      return true;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    toggle(event) {
      event.target
        .closest(".tab")
        .querySelector(".tab-data")
        .classList.toggle("hidden");
    },
    async getAllOrders() {
      await this.$store.dispatch("getAllUsersNOrders");
      this.orders = this.$store.getters.orders;

      // //Test
      // await this.$store.dispatch("getCurrentUserOrders");
    },
  },
  mounted() {
    this.getAllOrders();
  },
};
</script>
