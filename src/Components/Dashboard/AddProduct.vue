<template>
  <div class="addProduct-container">
    <div class="heading"><h2>Add Products</h2></div>
    <div class="form-container">
      <div class="warning" v-if="!form.isValid">
        <h3>Please enter correct information!!</h3>
      </div>
      <div class="form">
        <label :class="{ invalidLabel: !name.isValid }" class="label"
          >Product Name</label
        >
        <div class="input">
          <input
            v-model="name.val"
            :class="{ invalidInput: !name.isValid }"
            type="text"
            placeholder="Enter product name here..."
          />
        </div>
        <label :class="{ invalidLabel: !price.isValid }" class="label"
          >Price of 250g</label
        >
        <div class="input">
          <input
            v-model="price.val"
            :class="{ invalidInput: !price.isValid }"
            type="number"
            placeholder="Enter product price here..."
          />
        </div>
        <label :class="{ invalidLabel: !image.isValid }" class="label"
          >Product image Url</label
        >
        <div class="input">
          <input
            v-model="image.val"
            :class="{ invalidInput: !image.isValid }"
            type="text"
            placeholder="Enter product Url here..."
          />
        </div>
        <div class="submit-btn">
          <TheButton @click="submitForm()" type="small-btn btn-green"
            >Submit</TheButton
          >
        </div>
      </div>
    </div>
  </div>
  <ConfirmationDialog :add-product="this.name.val"></ConfirmationDialog>
</template>

<style scoped>
.addProduct-container {
  max-width: 120rem;
  margin: 0 auto;
  margin-top: 3.6rem;
  padding: 3.2rem;
  padding-top: 0;
  border: 1px solid #1111;
}

.addProduct-container .heading {
  margin: 3.2rem 0 3.2rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.form-container {
  box-shadow: 0 0 4px 4px #1111;
  margin: 0 auto;
  padding: 2rem;
}
.form {
  padding: 2rem;
  padding-bottom: 0.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* gap: 2rem; */
  row-gap: 2rem;
  justify-items: stretch;
  align-items: center;
}
.form .label {
  font-size: 2rem;
  font-weight: 500;
  justify-self: center;
}
.input input {
  width: 80%;
  padding: 0.8rem 2.4rem;
  font-size: 2rem;
  border-radius: 4px;
}
.form .submit-btn {
  margin-top: 0.6rem;

  justify-self: end;
  align-self: end;
}

.warning {
  display: flex;
  justify-content: center;
  align-items: center;
}
.warning h3 {
  font-weight: 500;
  font-size: 1.6rem;
  color: red;
}
.red,
.invalidLabel {
  color: red;
}
.invalidTextarea,
.invalidInput {
  border: 1px solid red;
}
</style>
<script>
import TheButton from "../UI/TheButton.vue";
import ConfirmationDialog from "../UI/ConfirmationDialog.vue";
export default {
  data() {
    return {
      name: {
        val: "",
        isValid: true,
      },
      price: {
        val: "",
        isValid: true,
      },
      image: {
        val: "",
        isValid: true,
      },
      form: {
        isValid: true,
      },
    };
  },
  components: { TheButton, ConfirmationDialog },
  methods: {
    isFormValid() {
      if (this.name.val === "") this.name.isValid = false;
      if (this.price.val === "") this.price.isValid = false;
      if (this.image.val === "") this.image.isValid = false;
      if (this.name.isValid && this.price.isValid && this.image.isValid) {
        this.form.isValid = true;
      } else this.form.isValid = false;
    },
    submitForm() {
      this.isFormValid();
      if (!this.form.isValid) return;

      const product = {
        name: this.name.val,
        price: this.price.val,
        img: this.image.val,
        isAvailable: true,
      };
      this.$store.commit("toggleAddProductConfirmation");
      this.$store.dispatch("addProduct", product);
    },
  },
};
</script>
