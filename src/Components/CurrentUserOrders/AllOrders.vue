<template>
  <div class="tab-container">
    <div class="heading"><h2>All orders</h2></div>
    <the-spinner v-if="isLoading"></the-spinner>
    <!-- <the-spinner v-if="false"></the-spinner> -->
    <div v-if="isOrders">
      <orders-tab
        v-for="order in orders"
        :key="order.orderId"
        :order="order"
        :currentUser="user"
      ></orders-tab>
    </div>
    <div class="noOrders" v-else>
      <h1>Order Now!!</h1>
    </div>
  </div>
  <confirmation-dialog
    @submit-feedback="onSubmitFeedback"
  ></confirmation-dialog>
</template>
<script>
import ConfirmationDialog from "../UI/ConfirmationDialog.vue";
import TheSpinner from "../UI/TheSpinner.vue";
import OrdersTab from "./OrdersTab.vue";
export default {
  data() {
    return {
      orders: null,
      isFeedbackSubmitting: false,
    };
  },
  components: { OrdersTab, TheSpinner, ConfirmationDialog },
  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
    isOrders() {
      return !this.orders || this.orders?.length > 0 ? true : false;
    },
    isLoading() {
      return this.isFeedbackSubmitting ? false : this.$store.getters.isLoading;
    },
    showDialog() {
      return this.$store.getters.showDialogFeedback;
    },
  },
  methods: {
    async getAllOrders() {
      await this.$store.dispatch("getCurrentUserOrders");
      this.orders = this.$store.getters.currentUserOrders;
    },
    onSubmitFeedback(feedback) {
      this.isFeedbackSubmitting = true; //to prevent loading spinner on orderpage
      const feedbackObject = {
        orderId: this.$store.getters.getFeedbackOrderId,
        userId: this.$store.getters.currentUser.id,
        date: new Date().toString().slice(4, 15),
        title: feedback.title,
        message: feedback.message,
      };
      this.$store.dispatch("submitFeedback", feedbackObject);
      // console.log("on submitfeedback");
    },
  },
  beforeMount() {
    this.getAllOrders();
  },
};
</script>
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
.tab-container .noOrders {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hidden {
  display: none !important;
}

@media (max-width: 45em) {
  .tab-container {
    padding: 0 1rem;
    padding-bottom: 3.2rem;
  }
}
</style>
