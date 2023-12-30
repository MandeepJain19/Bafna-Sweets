<template>
  <Teleport to="body">
    <div v-if="showDialog" class="backdrop" @click="closeDialog()"></div>
    <Transition name="dialog">
      <div
        v-if="showDialog"
        :class="isLoading ? 'flex' : ''"
        class="container-dialog"
      >
        <div v-if="error" class="message red">
          <!-- <div class="message-text">Registered Successfully</div> -->
          <div class="message-text">{{ error }}</div>
        </div>
        <div v-if="isLoading" class="spinner">
          <the-spinner></the-spinner>
        </div>
        <div v-else>
          <div class="btn">
            <button @click="toggle()" :class="onSignup ? 'active' : ''">
              SignUp
            </button>
            <button @click="toggle()" :class="!onSignup ? 'active' : ''">
              Login
            </button>
          </div>

          <div v-if="onSignup" class="form signup">
            <form ref="signupForm" @submit.prevent @submit="signup()">
              <h2>Fill your details</h2>

              <div class="signup grid">
                <label
                  for="fullname"
                  :class="{ invalidLabel: !fullname.isValid }"
                  >Full Name*</label
                >
                <label
                  for="number"
                  :class="{ invalidLabel: !tel.isValid }"
                  class="rowChange"
                  >Phone Number*</label
                >

                <input
                  type="text"
                  id="fullname"
                  v-model="fullname.val"
                  :class="{ invalidInput: !fullname.isValid }"
                  @focus="clearValid(fullname)"
                />
                <input
                  type="tel"
                  v-model="tel.val"
                  id="number"
                  :class="{ invalidInput: !tel.isValid }"
                  @focus="clearValid(tel)"
                />
              </div>
              <div class="grid">
                <label for="email" :class="{ invalidLabel: !email.isValid }"
                  >Email Address*</label
                >

                <label
                  for="password"
                  :class="{ invalidLabel: !password.isValid }"
                  class="rowChange"
                  >Create Password*</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="email.val"
                  :class="{ invalidInput: !email.isValid }"
                  @focus="clearValid(email)"
                />
                <input
                  type="text"
                  id="password"
                  v-model="password.val"
                  :class="{ invalidInput: !password.isValid }"
                  @focus="clearValid(password)"
                />
              </div>
              <h2>Enter Delivery Details</h2>
              <div class="grid">
                <label for="address" :class="{ invalidLabel: !address.isValid }"
                  >Address*</label
                >
                <label
                  for="city"
                  :class="{ invalidLabel: !city.isValid }"
                  class="rowChange"
                  >City*</label
                >
                <textarea
                  id="address"
                  v-model="address.val"
                  :class="{ invalidTextarea: !address.isValid }"
                  @focus="clearValid(address)"
                ></textarea>
                <input
                  type="text"
                  v-model="city.val"
                  id="city"
                  :class="{ invalidTextarea: !city.isValid }"
                  @focus="clearValid(city)"
                />
              </div>
              <div class="grid">
                <label for="state" :class="{ invalidLabel: !state.isValid }"
                  >State*</label
                >
                <label
                  for="pincode"
                  :class="{ invalidLabel: !pin.isValid }"
                  class="rowChange"
                  >Pin Code*</label
                >
                <input
                  type="text"
                  v-model="state.val"
                  id="state"
                  :class="{ invalidInput: !state.isValid }"
                  @focus="clearValid(state)"
                />
                <input
                  type="text"
                  v-model="pin.val"
                  id="pincode"
                  :class="{ invalidInput: !pin.isValid }"
                  @focus="clearValid(pin)"
                />
                <!-- <div class="green" v-if="isFormValid">
            <h3>Now you can place order</h3>
          </div>
          <div class="red" v-else-if="!isFormValid">
            <h3>Please fill form correctly to place order</h3>
          </div> -->
              </div>
              <the-button class="btn-submit" type="submit-btn"
                >Register</the-button
              >
            </form>
          </div>
          <div v-else class="form login">
            <form ref="loginForm" @submit.prevent @submit="submitForm">
              <div class="login flex">
                <label for="email" :class="{ invalidLabel: !email.isValid }"
                  >Email Address*</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="loginEmail.val"
                  :class="{ invalidInput: !email.isValid }"
                  @focus="clearValid(email)"
                />
                <label
                  for="password"
                  :class="{ invalidLabel: !password.isValid }"
                  >Password*</label
                >
                <input
                  type="text"
                  id="password"
                  v-model="loginPassword.val"
                  :class="{ invalidInput: !password.isValid }"
                  @focus="clearValid(password)"
                />
                <the-button
                  class="btn-submit"
                  type="submit-btn"
                  @click="login()"
                  >Login</the-button
                >
              </div>
            </form>

            <div class="greeting">
              <span> Welcome Back 😊 </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import TheButton from "../UI/TheButton.vue";
import TheSpinner from "./TheSpinner.vue";
export default {
  components: {
    TheButton,
    TheSpinner,
  },
  data() {
    return {
      onSignup: true,
      fullname: {
        val: "",
        isValid: true,
        name: "fullname",
      },
      password: {
        val: "",
        isValid: true,
        name: "password",
      },
      tel: {
        val: "",
        isValid: true,
        name: "tel",
      },
      email: {
        val: "",
        isValid: true,
        name: "email",
      },
      address: {
        val: "",
        isValid: true,
        name: "address",
      },
      city: {
        val: "",
        isValid: true,
        name: "city",
      },
      state: {
        val: "",
        isValid: true,
        name: "state",
      },
      pin: {
        val: "",
        isValid: true,
        name: "pin",
      },
      loginEmail: {
        val: "",
        isValid: true,
        name: "loginEmail",
      },
      loginPassword: {
        val: "",
        isValid: true,
        name: "loginPassword",
      },
      isFormValid: true,
      error: null,
    };
  },
  computed: {
    showDialog() {
      return this.$store.getters.showLoginSignupDialog;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    clearValid(ele) {
      ele.isValid = true;
    },
    toggle() {
      this.error = "";
      this.onSignup = !this.onSignup;
    },
    checkValidity() {
      if (this.fullname.val === "") {
        this.fullname.isValid = false;
        this.isFormValid = false;
      }
      if (this.password.val === "") {
        this.password.isValid = false;
        this.isFormValid = false;
      }
      if (this.tel.val === "") {
        this.tel.isValid = false;
        this.isFormValid = false;
      }
      if (this.email.val === "") {
        this.email.isValid = false;
        this.isFormValid = false;
      }
      if (this.address.val === "") {
        this.address.isValid = false;
        this.isFormValid = false;
      }
      if (this.city.val === "") {
        this.city.isValid = false;
        this.isFormValid = false;
      }
      if (this.state.val === "") {
        this.state.isValid = false;
        this.isFormValid = false;
      }
      if (this.pin.val === "") {
        this.pin.isValid = false;
        this.isFormValid = false;
      }

      const email =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (this.email.val.match(email)) {
        this.email.isValid = true;
      } else {
        this.email.isValid = false;
        this.isFormValid = false;
      }

      const phoneno = /^\d{10}$/;
      if (this.tel.val.match(phoneno)) {
        this.tel.isValid = true;
      } else {
        this.tel.isValid = false;
        this.isFormValid = false;
      }

      const pincode = /^\d{6}$/;
      if (this.pin.val.match(pincode)) {
        this.pin.isValid = true;
      } else {
        this.pin.isValid = false;
        this.isFormValid = false;
      }

      if (this.password.val.length < 6) {
        this.password.isValid = false;
        this.isFormValid = false;
      }
      if (
        this.fullname.isValid &&
        this.password.isValid &&
        this.tel.isValid &&
        this.email.isValid &&
        this.address.isValid &&
        this.city.isValid &&
        this.state.isValid &&
        this.pin.isValid
      ) {
        this.isFormValid = true;
      }
    },
    async signup() {
      this.checkValidity();
      if (this.isFormValid) {
        let formData = {
          fullname: this.fullname.val,
          password: this.password.val,
          tel: this.tel.val,
          email: this.email.val,
          address: this.address.val,
          city: this.city.val,
          state: this.state.val,
          pin: this.pin.val,
          orders: [],
        };
        this.$refs.signupForm.reset();
        try {
          await this.$store.dispatch("signup", formData);
          this.closeDialog();
          this.email.val = "";
          this.fullname.val = "";
          this.tel.val = "";
          this.password.val = "";
          this.city.val = "";
          this.state.val = "";
          this.address.val = "";
          this.pin.val = "";
        } catch (err) {
          this.error = err.message || "Something went wrong try again later...";
          console.log(err);
          this.$store.commit("toggleIsLoading");
        } finally {
          // this.closeDialog();
        }
      }
    },
    async login() {
      const email =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (this.loginEmail.val.match(email)) {
        this.loginEmail.isValid = true;
      } else {
        this.loginEmail.isValid = false;
      }
      if (this.loginPassword.val === "") {
        this.loginPassword.isValid = false;
        this.isFormValid = false;
      }
      const loginDetails = {
        email: this.loginEmail.val,
        password: this.loginPassword.val,
      };
      this.$refs.loginForm.reset();

      try {
        await this.$store.dispatch("login", loginDetails);
        this.closeDialog();
        this.loginPassword.val = "";
        this.loginEmail.val = "";
      } catch (err) {
        this.error = err.message || "Check email or password";
        this.$store.commit("toggleIsLoading");
      }
    },
    closeDialog() {
      this.error = "";
      this.$store.commit("showLoginSignupDialog");
    },
  },
};
</script>

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
.container-dialog {
  background-color: #fffefb;
  /* height: 58rem; */
  /* width: 52rem; */
  max-width: 100%;
  max-height: 100%;
  min-height: 25rem;
  min-width: 35rem;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 1.2rem;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease-in-out;
  z-index: 3000;
  /* border-radius: 18px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.container-dialog.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-dialog .message {
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}
.container-dialog .dialog-header {
  display: flex;
  justify-content: center;
}
.btn {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
}
.btn button {
  padding: 1.2rem 2rem;
  font-size: 2.4rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  color: inherit;
  text-decoration: none;
  transition: all 1s ease-in-out;
}

.btn button.active,
.btn button:hover {
  background-color: #ffe066;
  /* outline: 1px solid; */
}

form {
  margin: 0 1.2rem 0 1.2rem;
  display: grid;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.6rem;
  /* padding: 1.2rem; */
}
.login.flex {
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}
h2 {
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2.4rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
}
label {
  font-size: 2rem;
  font-weight: 500;
}
input {
  padding: 0.8rem 0 0.8rem 0.8rem;
  border-radius: 12px;
  border: solid 1px;
}
textarea {
  max-height: 100%;
  max-width: 100%;
  border-radius: 12px;
  border: solid 1px;
  padding: 0.6rem 0 0.2rem 0.6rem;
  resize: none;
}
.btn-submit {
  align-self: center;
  justify-self: center;
}
.greeting {
  margin-top: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2rem;
  font-weight: 600;
  letter-spacing: 1px;
}
.green {
  color: green;
}
.red,
.invalidLabel {
  color: red;
}
.invalidTextarea,
.invalidInput {
  border: 1px solid red;
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

/* 544px */
@media (max-width: 34em) {
  .container-dialog {
    height: 58rem;
    width: 95%;
    padding: 1.2rem;
    overflow: scroll;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .rowChange {
    grid-row: 3;
  }
}
</style>
