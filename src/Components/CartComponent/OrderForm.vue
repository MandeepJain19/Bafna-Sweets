<template>
  <div class="formContainer">
    <form ref="detailForm" @submit.prevent @submit="submitForm">
      <h2>Review your details</h2>

      <div class="grid">
        <label for="fullname" :class="{ invalidLabel: !firstName.isValid }"
          >Fullname</label
        >

        <input
          type="text"
          id="fullname"
          disabled="disabled"
          v-model="currentUser.fullname"
          :class="{ invalidInput: !firstName.isValid }"
          @focus="clearValid(firstName)"
        />
        <label for="number" :class="{ invalidLabel: !tel.isValid }"
          >Phone Number</label
        >
        <input
          type="tel"
          disabled="disabled"
          v-model="currentUser.tel"
          id="number"
          :class="{ invalidInput: !tel.isValid }"
          @focus="clearValid(tel)"
        />
      </div>
      <div class="grid">
        <label for="email" :class="{ invalidLabel: !email.isValid }"
          >Email Address</label
        >

        <input
          type="email"
          disabled="disabled"
          id="email"
          v-model="currentUser.email"
          :class="{ invalidInput: !email.isValid }"
          @focus="clearValid(email)"
        />
      </div>
      <h2>Review Delivery Details</h2>
      <div class="grid">
        <label for="address" :class="{ invalidLabel: !address.isValid }"
          >Address</label
        >
        <label for="city" :class="{ invalidLabel: !city.isValid }">City</label>
        <textarea
          id="address"
          disabled="disabled"
          v-model="currentUser.address"
          :class="{ invalidTextarea: !address.isValid }"
          @focus="clearValid(address)"
        ></textarea>
        <input
          type="text"
          disabled="disabled"
          v-model="currentUser.city"
          id="city"
          :class="{ invalidTextarea: !city.isValid }"
          @focus="clearValid(city)"
        />
      </div>
      <div class="grid">
        <label for="state" :class="{ invalidLabel: !state.isValid }"
          >State</label
        >
        <label for="pincode" :class="{ invalidLabel: !pin.isValid }"
          >Pin Code</label
        >
        <input
          type="text"
          disabled="disabled"
          v-model="currentUser.state"
          id="state"
          :class="{ invalidInput: !state.isValid }"
          @focus="clearValid(state)"
        />
        <input
          type="text"
          disabled="disabled"
          v-model="currentUser.pin"
          id="pincode"
          :class="{ invalidInput: !pin.isValid }"
          @focus="clearValid(pin)"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
        name: "firstName",
      },
      lastName: {
        val: "",
        isValid: true,
        name: "lastName",
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
      isFormValid: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    clearValid(ele) {
      ele.isValid = true;
    },
    checkValidity() {
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
      } else {
        this.firstName.isValid = true;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
      } else {
        this.lastName.isValid = true;
      }
      if (this.tel.val === "") {
        this.tel.isValid = false;
      } else {
        this.tel.isValid = true;
      }
      if (this.email.val === "") {
        this.email.isValid = false;
      } else {
        this.email.isValid = true;
      }
      if (this.address.val === "") {
        this.address.isValid = false;
      } else {
        this.address.isValid = true;
      }
      if (this.city.val === "") {
        this.city.isValid = false;
      } else {
        this.city.isValid = true;
      }
      if (this.state.val === "") {
        this.state.isValid = false;
      } else {
        this.state.isValid = true;
      }
      if (this.pin.val === "") {
        this.pin.isValid = false;
      } else {
        this.pin.isValid = true;
      }

      const email =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (this.email.val.match(email)) {
        this.email.isValid = true;
      } else {
        this.email.isValid = false;
      }

      const phoneno = /^\d{10}$/;
      if (this.tel.val.match(phoneno)) {
        this.tel.isValid = true;
      } else {
        this.tel.isValid = false;
      }

      const pincode = /^\d{6}$/;
      if (this.pin.val.match(pincode)) {
        this.pin.isValid = true;
      } else {
        this.pin.isValid = false;
      }

      if (
        this.firstName.isValid &&
        this.lastName.isValid &&
        this.tel.isValid &&
        this.email.isValid &&
        this.address.isValid &&
        this.city.isValid &&
        this.state.isValid &&
        this.pin.isValid
      ) {
        this.isFormValid = true;
        this.submitForm();
      }
    },
    submitForm() {
      if (this.isFormValid === false) return;

      let formData = {
        fullname: this.firstName.val,
        lastname: this.lastName.val,
        tel: this.tel.val,
        email: this.email.val,
        address: this.address.val,
        city: this.city.val,
        state: this.state.val,
        pin: this.pin.val,
      };
      this.$refs.detailForm.reset();
      this.$store.dispatch("addFormData", formData);
    },
    fillForm() {
      this.$store.getters.currentUser;
    },
  },
};
</script>

<style scoped>
.formContainer {
  max-width: 100%;
}
form {
  margin: 0 1.2rem 0 1.2rem;
  display: grid;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  padding: 1.8rem;
}
h2 {
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2.4rem;
  margin-top: 1.2rem;
  font-weight: 600;
}
label {
  font-size: 2rem;
  font-weight: 500;
}
input {
  padding: 0.8rem 0 0.8rem 0;
}
textarea {
  max-height: 100%;
  max-width: 100%;
  resize: none;
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

@media (max-width: 60em) {
  form {
    margin: 0;
  }
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    padding: 1rem;
  }
}
</style>
