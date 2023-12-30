<template>
  <div class="tab">
    <div class="tab-container">
      <div class="tab-header" @click="toggle">
        <span>{{ order.date }}</span>
        <span v-if="this.windowWidth > 600"
          >Total Items : {{ order.products.length }}</span
        >
        <span v-if="this.windowWidth > 1000"
          >{{ order.products[0]?.name }}
          {{ order.products.length > 1 ? `,` : "" }}
          {{ order.products[1]?.name }}
          {{
            order.products.length > 2
              ? `& (${order.products.length - 2} other)`
              : ""
          }}
        </span>
        <div class="flex-end">
          <span>&#8377;{{ order.grandTotal }}</span>
          <span class="icon" v-if="isHidden"
            ><i class="ph ph-caret-down"></i
          ></span>
          <span class="icon" v-else><i class="ph ph-caret-up"></i></span>
        </div>
      </div>
      <div class="feedback-container">
        <a class="btn-feedback" @click="showfeedbackForm(order.orderId)">
          <i class="ph-bold ph-chat-teardrop-text"></i>
        </a>
      </div>
    </div>
    <div class="tab-data" :class="isHidden ? 'hidden' : ''">
      <!-- <span>Delivery Details</span> -->
      <div class="customer-details-container">
        <div class="heading"><h3>Shipping Details</h3></div>

        <div class="customer-details">
          <span>Name :-</span>
          <span>{{ currentUser?.fullname }}</span>
          <span>Phone :-</span><span>{{ currentUser?.tel }}</span>
          <span>Email :-</span><span>{{ currentUser?.email }}</span>
          <span>City :-</span><span>{{ currentUser?.city }}</span>
          <span>State :-</span> <span>{{ currentUser?.state }}</span>
          <span>Pin Code :-</span><span>{{ currentUser?.pin }}</span>
          <span>Address :-</span><span>{{ currentUser?.address }}</span>
        </div>
      </div>
      <div class="order-details-container">
        <div class="heading"><h3>Order Details</h3></div>

        <div class="order-details">
          <div class="product bold">
            <span>Name </span>
            <span>Quantity</span>
            <span>Weight </span>
            <span>Price </span>
          </div>
          <hr />
          <div
            class="products"
            v-for="product in order.products"
            :key="product.id"
          >
            <div class="product">
              <span>{{ product.name }}</span>
              <span>{{ product.quantity }}</span>
              <span>{{ product.weight }}</span>
              <span>{{ product.cartPrice }}</span>
            </div>
          </div>
          <div class="total">
            <span>Grand Total</span>
            <span>&#8377;{{ order.grandTotal }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <confirmation-dialog
    @submit-feedback="onSubmitFeedback"
    v-if="showDialog"
  ></confirmation-dialog> -->
</template>

<script>
// import ConfirmationDialog from "../UI/ConfirmationDialog.vue";
export default {
  // components: { ConfirmationDialog },
  data() {
    return {
      isHidden: true,
      feedbackOrder: null,
      windowWidth: window.innerWidth,
    };
  },
  props: ["order", "currentUser"],
  methods: {
    toggle() {
      this.isHidden = !this.isHidden;
    },
    showfeedbackForm(orderId) {
      this.$store.commit("setFeedbackOrderId", orderId);
      this.$store.commit("toggleShowDialogFeedback");
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    // onSubmitFeedback(feedback) {
    //   console.log(this.$store.getters.getFeedbackOrderId);
    //   console.log(feedback);
    //   feedback = {
    //     orderId: this.$store.getters.getFeedbackOrderId,
    //     userId: this.$store.getters.currentUser.id,
    //     message: feedback,
    //   };
    //   this.$store.dispatch("submitFeedback", feedback);
    //   console.log("on submitfeedback");
    // },
  },
  computed: {
    showDialog() {
      return this.$store.getters.showDialogFeedback;
    },
    smallScreen() {
      if (this.windowWidth < 1050) return true;
      else return false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  unmounted() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style scoped>
.hidden {
  display: none !important;
}
.tab {
  margin-bottom: 2rem;
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); */
}
.tab .tab-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* background-color: #ffec99; */
}
.tab .tab-header {
  display: flex;
  align-items: center;
  gap: 3.6rem;
  padding: 2rem;
  background-color: #ffec99;
  font-size: 2.4rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tab-header .flex-end {
  display: flex;
  gap: 3.6rem;
  margin-left: auto;
}
.feedback-container .btn-feedback {
  display: inline-block;
  align-self: center;
  padding: 1.6rem;
  background-color: #e03131;
  cursor: pointer;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.feedback-container .btn-feedback:hover {
  opacity: 0.7;
}
.btn-feedback i {
  font-size: 3.2rem;
  color: #ffec99;
}

.order-details-container,
.customer-details-container {
  border: 0.4px solid #0f1841;
  border-radius: 10px;
  margin: 1rem;
}
.heading {
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
  margin-left: 1rem;
}
.tab .tab-data {
  border: 0.5px solid #1111;
  border-radius: 10px;
  border-top: none;
}
.tab .tab-data .customer-details,
.tab .tab-data .order-details {
  padding: 2.4rem;
  font-size: 2.4rem;
  gap: 2rem;
}
.tab .tab-data .customer-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.tab .tab-data .customer-details span:nth-child(odd),
.order-details .product.bold,
.total {
  font-weight: 600;
}

.tab .tab-data .order-details ul {
  list-style: none;
}
.tab .tab-data .order-details ul li,
.tab .tab-data .order-details .total {
  display: flex;
  gap: 3.2rem;
}
.tab .tab-data .order-details .total {
  margin-top: 3.2rem;
}
.tab .tab-data .order-details .icon {
  align-content: flex-end;
}
.tab-data {
  background-color: #fffefb;
}
.order-details .product,
.order-details .products .product {
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 1.8rem;
  margin: 2rem 0 2rem 0;
  justify-items: center;
  align-items: center;
}

@media (max-width: 45em) {
  .tab .tab-data .customer-details {
    grid-template-columns: repeat(2, 1fr);
    font-size: 2rem;
  }
  .tab .tab-data .order-details {
    padding: 2.4rem 1rem;
    font-size: 1.8rem;
  }
}
@media (max-width: 39em) {
  .tab .tab-data .order-details {
    font-size: 1.6rem;
  }
  .order-details .product,
  .order-details .products .product {
    justify-items: flex-start;
  }
}
</style>
