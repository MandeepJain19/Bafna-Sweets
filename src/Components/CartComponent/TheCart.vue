<template>
  <div class="cartContainer">
    <h2>Order Summary</h2>

    <div class="flex products">
      <transition-group name="product" tag="div">
        <div v-for="product in products" :key="product">
          <div class="cart">
            <!-- <div class="flex-1"> -->
            <!-- <img
              :src="
                require(`../../../public/Images/HeroSection/${product.img}.jpg`)
              "
            /> -->
            <div><img :src="`${product.img}`" /></div>

            <div class="flex">
              <div>
                <span class="items">{{ product.name }} </span
                ><span>- {{ product.weight }}</span>
              </div>
              <div>
                <span>&#8377;{{ product.price }}</span
                ><span class="sml"> (250gm)</span>
              </div>
            </div>
            <!-- </div> -->

            <div>
              <QtyIncreaseDecreaseBtn
                type="small-btn"
                qtyType="small-qty"
                @increaseQty="increaseQty(product)"
                @decreaseQty="decreaseQty(product)"
                >{{ product.quantity }}</QtyIncreaseDecreaseBtn
              >
            </div>

            <div class="totalPrice">&#8377;{{ product.cartPrice }}</div>
          </div>
        </div>
      </transition-group>
      <div class="message" v-if="!canPlaceOrder">No Products..</div>
    </div>

    <div class="grandTotal">
      <span>Grand Total</span>
      <span>&#8377;{{ grandtotal }}</span>
    </div>

    <div v-if="products.length" class="btnContainer">
      <TheButton @click="placeOrder()" type="btn-green">Place Order</TheButton>
    </div>
  </div>
  <confirmation-dialog text="Order Placed"></confirmation-dialog>
</template>

<style scoped>
.cartContainer {
  max-width: 100%;
  border-left: 0.6px solid #0f1841;
  padding-left: 3.6rem;
}

h2 {
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2.4rem;
  margin-top: 1.2rem;
  font-weight: 600;
}
.cart {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  column-gap: 1.8rem;
  font-size: 2rem;
  padding: 1.2rem;
  justify-items: center;
  align-items: center;
}
.cart:last-child {
  border-bottom: 0.1px solid #0f1841;
}
.flex {
  justify-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  /* justify-content: space-between; */
}
.flex.products {
  border: 2px solid #1111;
}
.flex-1 {
  display: flex;
  gap: 1rem;
}
.message {
  font-size: 2rem;
  align-self: center;
  margin-bottom: 2rem;
}
.items {
  margin-bottom: 2px;
}
.items {
  text-transform: uppercase;
}
img {
  /* width: 16rem;
  height: 12rem; */
  max-width: 100%;
  max-height: 100%;
}
.totalPrice {
  font-size: 2.4rem;
  font-weight: 500;
  color: #228be6;
}
.grandTotal {
  display: flex;
  justify-content: space-between;
  font-size: 2.4rem;
  /* margin-top: 1.6rem; */
  font-weight: 600;
  letter-spacing: 1px;
  padding: 1.6rem;
  /* transition: all 0.3s ease-in-out; */
}
.sml {
  font-size: 1.2rem;
}
.btnContainer {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-enter-active {
  transition: all 0.3s ease-out;
}

.product-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.product-enter-from,
.product-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media (max-width: 60em) {
  .cartContainer {
    padding-left: 0;
    border: none;
  }
}
@media (max-width: 34em) {
  .cart {
    column-gap: 1rem;
    font-size: 1.4rem;
    padding: 1rem 0.6rem;
  }
}
</style>

<script>
import TheButton from "../UI/TheButton.vue";
import QtyIncreaseDecreaseBtn from "../UI/QtyIncreaseDecreaseBtn.vue";
import ConfirmationDialog from "../UI/ConfirmationDialog.vue";
export default {
  components: {
    TheButton,
    QtyIncreaseDecreaseBtn,
    ConfirmationDialog,
  },
  data() {
    return {};
  },
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },
    grandtotal() {
      if (this.products.length > 0) {
        let sum = 0;
        for (const prod of this.products) {
          sum += prod.cartPrice;
        }
        return sum;
      } else {
        return 0;
      }
    },
    canPlaceOrder() {
      if (this.products.length > 0) return true;
      else return false;
    },
    showDialog() {
      return this.$store.getters.showDialogConfirmation;
    },
  },
  methods: {
    calcCartPrice(product) {
      let cartPrice = 0;
      if (product.weight === "1Kg") {
        cartPrice = product.price * 4 * product.quantity;
      } else if (product.weight === "500gm") {
        cartPrice = product.price * 2 * product.quantity;
      } else {
        cartPrice = product.price * product.quantity;
      }
      product.cartPrice = cartPrice;
    },
    increaseQty(product) {
      product.quantity++;
      this.calcCartPrice(product);
    },
    decreaseQty(product) {
      if (product.quantity > 1) {
        product.quantity--;
        this.calcCartPrice(product);
      } else if (product.quantity === 1) {
        // Removing that product from products array
        this.products.splice(this.products.indexOf(product), 1);
      } else return;
    },
    placeOrder() {
      if (!this.products.length) {
        return;
      }
      if (!this.$store.getters.currentUser.id) {
        this.$store.commit("showLoginSignupDialog");
        return;
      }
      this.$store.commit("toggleShowDialogConfirmation");

      const order = {
        products: this.products,
        grandTotal: this.grandtotal,
        userId: this.$store.getters.currentUser.id,
        date: new Date().toString().slice(4, 15),
      };
      this.$store.dispatch("placeOrder", order);
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>
