<template>
  <div class="tab">
    <div class="tab-header" @click="toggle" :data-total="order.grandTotal">
      <span>{{ order.date }} </span>
      <span v-if="!feedbackTab">{{ order.customerDetails?.fullname }}</span>
      <span v-else>{{ order.title }} </span>
      <span v-if="!feedbackTab">{{ order.customerDetails?.city }} </span>
      <div class="flex-end">
        <span v-if="!feedbackTab">&#8377;{{ order.grandTotal }}</span>
        <span v-else class="feedback-author"
          ><span class="by">by-: </span
          >{{ order.customerDetails?.fullname }}</span
        >
        <span class="icon" v-if="isHidden"
          ><i class="ph ph-caret-down"></i
        ></span>
        <span class="icon" v-else><i class="ph ph-caret-up"></i></span>
      </div>
    </div>
    <div
      class="tab-data"
      :class="isHidden ? 'hidden' : '' || feedbackTab ? 'feedbackTab' : ''"
    >
      <div class="customer-details-container">
        <div class="heading"><h3>Customer Details</h3></div>
        <div class="customer-details">
          <span>Name :-</span>
          <span>{{ order.customerDetails?.fullname }}</span>
          <span>Phone :-</span><span>{{ order.customerDetails.tel }}</span>
          <span>Email :-</span><span>{{ order.customerDetails.email }}</span>
          <span>City :-</span><span>{{ order.customerDetails.city }}</span>
          <span>State :-</span> <span>{{ order.customerDetails.state }}</span>
          <span>Pin Code :-</span><span>{{ order.customerDetails.pin }}</span>
          <span>Address :-</span
          ><span>{{ order.customerDetails.address }}</span>
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
            v-for="product in order.products || order.order.products"
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
            <span>&#8377;{{ order.grandTotal || order.order.grandTotal }}</span>
          </div>
        </div>
      </div>
      <div v-if="feedbackTab" class="feedback-message">
        <div class="message">
          <span>Message:-</span>
          <span
            ><p>{{ order.message }}</p></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hidden {
  display: none !important;
}
.tab {
  margin-bottom: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
.tab .tab-header {
  background-color: #4444;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 3.6rem;
  font-size: 2.4rem;
  font-weight: 600;
}
.order-details-container,
.customer-details-container {
  border: 0.4px solid #0f1841;
  border-radius: 10px;
  margin: 1rem;
}
.tab .tab-header .flex-end {
  margin-left: auto;
  display: flex;
  gap: 3.2rem;
}
.tab-header .flex-end .feedback-author {
  font-style: italic;
  font-weight: 500;
}
.feedback-author .by {
  font-size: 1.6rem;
}
.tab .tab-data {
  display: flex;
  flex-direction: column;
}
.heading {
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
  margin-left: 1rem;
}
.feedbackTab {
  flex-direction: column-reverse !important;
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
  background-color: #1111;
}
.order-details .product,
.order-details .products .product {
  /* display: flex; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 1.8rem;
  margin: 2rem 0 2rem 0;
  justify-items: center;
}

.feedback-message {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.feedback-message .message {
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  font-size: 2rem;
  letter-spacing: 0.8px;
  line-height: 1.2;
}
.feedback-message .message span:first-child {
  font-weight: 500;
}
</style>

<script>
export default {
  data() {
    return {
      isHidden: true,
    };
  },
  props: ["order", "feedbackTab"],
  methods: {
    toggle() {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>
