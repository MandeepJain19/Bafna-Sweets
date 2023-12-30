<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        class="confirmation"
        v-if="showDialog"
        :class="!text ? 'confirmation--feedback' : ''"
      >
        <div>
          <div class="closebtn">
            <i @click="closeDialog()" class="ph ph-x"></i>
          </div>
          <div class="feedback-title" v-if="!text && !addProduct">
            <h3>Your Feedback matter to us !!</h3>
          </div>
        </div>
        <div class="confirmation--flex">
          <the-spinner v-if="isLoading"></the-spinner>
          <div v-else class="text">
            <div v-if="text" class="flex">
              <p class="text--1">{{ text }} ✅</p>
              <p class="text--2">Bafna Sweets will Contact you soon😊...</p>
            </div>
            <div v-if="addProduct">
              <p class="text--1">{{ addProduct }} ✅</p>
              <p class="text--2">Added successfully 😎...</p>
            </div>
            <div v-if="!text && !addProduct" class="feedback">
              <div v-if="!feedbackCnf">
                <div class="feedback-input">
                  <input
                    type="text"
                    v-model="title"
                    placeholder="Feedback Title"
                  />
                  <textarea
                    rows="4.5"
                    cols="45"
                    placeholder="Enter your feedback here..."
                    v-model="message"
                  ></textarea>
                </div>
                <div class="feedback-btn">
                  <the-button
                    type="small-btn btn-green"
                    @click="
                      $emit('submitFeedback', { title, message }),
                        showFeedbackCnf()
                    "
                    >Submit</the-button
                  >
                </div>
              </div>
              <div class="feedback-cnf" v-else>
                <h2>Your Feedback received..</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirmation {
  background-color: #cfd1d9;
  /* background-color: #ffff; */
  /* height: 25rem;
  width: 50rem; */
  min-width: 25rem;
  min-height: 25rem;
  max-width: 100%;
  padding: 1rem 1.6rem;
  position: fixed;
  top: 50%;
  left: 50%;
  /* top: 35%;
  left: 40%; */
  transform: translate(-50%, -50%);
  z-index: 3000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.confirmation--feedback {
  background-color: #fffefb;
}
.feedback-title {
  padding: 1rem;
}
.closebtn {
  position: absolute;
  top: 2px;
  right: 2px;
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
/* .close-icon {
  font-size: 3.6rem;
  display: flex;
  margin-left: auto;
  padding-bottom: 1rem;
}
.close-icon i {
  cursor: pointer;
  display: inline-block;
  margin-left: auto;
} */
.confirmation--flex {
  /* margin-top: 2.4rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  /* padding-left: 2rem; */
}
.confirmation--flex:first-child {
  max-width: 100%;
}
.text {
  line-height: 1.3;
}
.flex {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
}
.text .text--1 {
  font-size: 4.8rem;
  font-weight: 700;
  color: #0f1841;
}
.text .text--2 {
  font-size: 2.4rem;
  font-weight: 600;
  color: #0f1841;
}

.confirmation h3 {
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.feedback .feedback-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}
.feedback .feedback-input input {
  padding: 4px 10px;
  letter-spacing: 0.8px;
  font-weight: 600;
}
.feedback .feedback-input textarea {
  padding: 10px;
  line-height: 1.5;

  /* box-shadow: 1px 1px 1px #999; */
}
.feedback .feedback-input input,
.feedback .feedback-input textarea {
  max-width: 100%;
  font-size: 1.6rem;
  border-radius: 5px;
  background-color: #ffec99;
  color: #0f1841;
  border: 1px solid #0f1841;
}
.feedback-btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
}

.feedback .feedback-cnf {
  max-width: 100%;
  font-size: 2.2rem;
  background-color: green;
  color: #ffec99;
  padding: 0 4px 0 4px;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
  transform: translate(-50%, -50%);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
  transform: translate(-50%, -50%);
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

@media (max-width: 39em) {
  .text .text--1 {
    font-size: 3.6rem;
    font-weight: 700;
    color: #0f1841;
  }
  .text .text--2 {
    font-size: 1.8rem;
    font-weight: 600;
  }
}
@media (max-width: 34em) {
  .confirmation {
    min-width: 34rem;
  }
  .confirmation h3,
  .feedback .feedback-cnf {
    font-size: 1.6rem;
  }
}
</style>

<script>
import TheSpinner from "./TheSpinner.vue";
import TheButton from "./TheButton.vue";
export default {
  emits: ["submitFeedback"],
  data() {
    return {
      title: null,
      message: null,
      feedbackCnf: false,
    };
  },
  props: ["text", "orderId", "addProduct"],
  components: {
    TheSpinner,
    TheButton,
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    showDialog() {
      return (
        this.$store.getters.showDialogConfirmation ||
        this.$store.getters.showDialogFeedback ||
        this.$store.getters.showAddProductConfirmation
      );
    },
  },
  methods: {
    closeDialog() {
      if (this.$store.getters.showDialogConfirmation)
        this.$store.commit("toggleShowDialogConfirmation");
      if (this.$store.getters.showDialogFeedback)
        this.$store.commit("toggleShowDialogFeedback");
      if (this.$store.getters.showAddProductConfirmation)
        this.$store.commit("toggleAddProductConfirmation");
    },
    showFeedbackCnf() {
      this.feedbackCnf = true;
    },
  },
};
</script>
