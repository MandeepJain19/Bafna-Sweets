<template>
  <Teleport to="body">
    <div v-if="showDetail" class="backdrop" @click="close()"></div>
    <Transition name="dialog">
      <dialog v-if="showDetail">
        <div class="flex">
          <!-- <div class="part1"> -->
          <div class="image">
            <img :src="`${showProduct.img}`" />
          </div>
          <div class="addToCart-btn">
            <div class="cartButton">
              <!-- <div class="addLessBtn">
                <the-button @click="decreaseQty()">-</the-button>
                <span class="qty">{{ quantity }} </span>
                <the-button @click="increaseQty()">+</the-button>
              </div> -->
              <QtyIncreaseDecreaseBtn
                @increaseQty="increaseQty()"
                @decreaseQty="decreaseQty()"
                >{{ quantity }}</QtyIncreaseDecreaseBtn
              >
              <the-button
                v-if="!addToCartBtnClicked"
                class="addToCartbtn"
                @click="addToCart(productIndex)"
                >Add To Cart</the-button
              >
              <div v-else class="goToCart">
                <div>
                  <the-button type="btn-green" to="/cart" :isLink="true"
                    >Go to Cart</the-button
                  >
                </div>

                <div class="countDown">
                  <p>{{ countDownNumber }}</p>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
          <div class="closebtn" @click="close()">
            <i class="ph ph-x"></i>
          </div>
          <div class="details">
            <div class="name">{{ showProduct.name }}</div>
            <div class="price">
              &#8377; {{ price }}
              <span class="per">({{ this.weight || `250gm` }})</span>
            </div>
            <div class="choose">
              <h3>Choose One</h3>
              <div class="radioButton">
                <div>
                  <input
                    type="radio"
                    v-model="weight"
                    name="weight"
                    id="250gm"
                    value="250gm"
                    checked="checked"
                  />
                  <label for="250gm"> 250gm.</label>
                </div>
                <div>
                  <input
                    type="radio"
                    v-model="weight"
                    name="weight"
                    value="500gm"
                    id="500gm"
                  />
                  <label for="500gm"> 500gm.</label>
                </div>
                <div>
                  <input
                    type="radio"
                    v-model="weight"
                    name="weight"
                    value="1Kg"
                    id="1Kg"
                  />
                  <label for="1Kg"> 1Kg.</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>
<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.515);
  z-index: 1;
  width: 100%;
  height: 100%;

  transition: all 5s ease-in;
}
dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* top: 10vh;
  left: 10%; */

  /* width: 80%;
  position: absolute;
  top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */

  width: 80%;
  z-index: 2;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

  background-color: #fffefb;
  padding: 2.4rem 0;
  margin: 0;

  display: flex;
  justify-content: space-evenly;
  overflow: hidden;
  /* max-width: 1200px;
  max-height: 700px; */
}
.flex {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 0.2fr;
  gap: 1rem;
  row-gap: 1.2rem;
  justify-items: center;
  padding: 0 0.5rem;
  /* display: flex;
  justify-content: space-evenly;
  width: 100%; */
  /* align-items: center; */
}
.addToCart-btn {
  grid-row: 2;
  grid-column: 1/-1;
  /* align-self: center; */
}
.cartButton {
  display: flex;
  gap: 2rem;
}
.goToCart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
}
.goToCart .countDown {
  height: 3.2rem;
  width: 3rem;
  transition: all 3s ease-in;
  padding: 1.2rem;
  background-color: #0f1841;
  color: #ffec99;
  outline: 0.5px solid #ffec99;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
}

.part1 {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.per {
  font-size: 1.6rem;
}
.details {
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-top: 2.4rem;
  /* justify-content: space-between; */
}
.name {
  font-size: 4.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  align-self: self-start;
}
.price {
  font-size: 3.6rem;
  color: #228be6;
}

h3 {
  font-size: 2rem;
  padding: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.radioButton {
  padding-left: 3.2rem;
  font-size: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
label:hover,
input {
  cursor: pointer;
}
input {
  height: 2.4rem;
  width: 2.4rem;
}
label {
  font-size: 2.8rem;
}
.closebtn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1.6px 1.2px 0 0;
  /* margin-top: 1.6px;
  margin-right: 1.2px; */
  padding: 0.4rem;
  font-size: 2.4rem;
  background-color: #0f1841;
  color: #fffefb;
  border-radius: 50%;
  cursor: pointer;
}

img {
  height: 450px;
  max-width: 100%;
  border-radius: 12px;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
  transform: translate(-50%, -50%);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
  transform: translate(-50%, -50%);
}
.dialog-leave-from,
.dialog-enter-to {
  opacity: 1;
  transform: scale(1);
  transform: translate(-50%, -50%);
}

/* 1088px */
@media (max-width: 68em) {
  /* .part1 {
    width: 80%;
  } */
  img {
    height: 400px;
    max-width: 100%;
    border-radius: 12px;
  }
}

/* 864 px */
@media (max-width: 54em) {
  /* .part1 {
    width: 80%;
  } */
  img {
    height: 300px;
    max-width: 100%;
  }
  input {
    height: 2rem;
    width: 2rem;
  }
  label {
    font-size: 2.4rem;
  }
  .name {
    font-size: 3.6rem;
  }
  .price {
    font-size: 2.4rem;
  }
  h3 {
    font-size: 1.6rem;
    letter-spacing: 1px;
  }
  /* .addToCart-btn {
    font-size: 1rem;
  } */
}

@media (max-width: 39em) {
  dialog {
    width: 95%;
  }
  img {
    height: 200px;
    max-width: 95%;
    border-radius: 12px;
  }
  input {
    height: 1.8rem;
    width: 1.8rem;
  }
  label {
    font-size: 2rem;
  }
  .name {
    font-size: 2.8rem;
  }
  .price {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1rem;
    letter-spacing: 1px;
    padding: 0.5rem;
  }
  .details {
    gap: 1.2rem;
    padding-top: 1rem;
    /* justify-content: space-between; */
  }
  .radioButton {
    gap: 1.2rem;
  }
}
</style>

<script>
import TheButton from "./TheButton.vue";
import QtyIncreaseDecreaseBtn from "./QtyIncreaseDecreaseBtn.vue";
export default {
  components: {
    TheButton,
    QtyIncreaseDecreaseBtn,
  },
  data() {
    return {
      weight: "",
      quantity: 1,
      addToCartBtnClicked: false,
      countDownNumber: 7,
    };
  },
  computed: {
    productIndex() {
      return this.$store.getters.showProductIndex;
    },
    showDetail() {
      // using in v-if of this template
      return this.$store.getters.showProductDetails;
    },
    products() {
      return this.$store.getters.products;
    },
    showProduct() {
      return this.$store.getters.products[this.productIndex];
    },
    price() {
      if (this.weight == "250gm") {
        return this.showProduct.price;
      } else if (this.weight == "500gm") {
        return this.showProduct.price * 2;
      } else {
        return this.showProduct.price * 4;
      }
    },
  },
  methods: {
    close() {
      this.$store.commit("closeProductDetails");
      this.reset();
    },
    reset() {
      this.weight = "";
      this.quantity = 1;
      this.addToCartBtnClicked = false;
      this.countDownNumber = 7;
    },
    deacreseCountDown() {
      const intervalID = setInterval(() => {
        this.countDownNumber--;
        if (this.countDownNumber == 0) {
          window.clearInterval(intervalID);
        }
      }, 1000);
    },
    addToCart(index) {
      this.addToCartBtnClicked = true;
      this.deacreseCountDown();
      const selectedProduct = {
        ...this.products[index],
      };

      // this.products[index];

      selectedProduct.weight = this.weight || "250gm";
      selectedProduct.quantity = this.quantity;
      let cartPrice = 0;
      if (this.weight === "1Kg") {
        cartPrice = selectedProduct.price * 4 * this.quantity;
      } else if (this.weight === "500gm") {
        cartPrice = selectedProduct.price * 2 * this.quantity;
      } else {
        cartPrice = selectedProduct.price * this.quantity;
      }
      selectedProduct.cartPrice = cartPrice;
      this.$store.dispatch("addToCart", selectedProduct);

      setTimeout(() => {
        this.addToCartBtnClicked = false;
        this.countDownNumber = 7;
      }, 7000);
    },
    increaseQty() {
      this.quantity++;
    },
    decreaseQty() {
      if (this.quantity > 1) this.quantity--;
      else return;
    },
  },
};
</script>
