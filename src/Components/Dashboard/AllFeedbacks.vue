<template>
  <div class="tab-container">
    <div class="heading"><h2>All Feedbacks</h2></div>
    <the-spinner v-if="isLoading"></the-spinner>
    <div v-else-if="isFeedbacks">
      <tab-component
        v-for="feedback in feedbacks"
        :key="feedback.orderId"
        :order="feedback"
        :feedbackTab="true"
      ></tab-component>
    </div>
    <div class="noOrders" v-else>
      <h4>No Feedbacks!!</h4>
    </div>
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
</style>
<script>
import TabComponent from "./TabComponent.vue";
import TheSpinner from "../UI/TheSpinner.vue";
export default {
  data() {
    return {
      feedbacks: null,
    };
  },
  computed: {
    isFeedbacks() {
      return this.feedbacks?.length > 0;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  components: { TabComponent, TheSpinner },
  methods: {
    async getAllFeedbacks() {
      await this.$store.dispatch("getAllFeedbacks");
      console.log(this.$store.getters.getAllFeedbacks);
      this.feedbacks = this.$store.getters.getAllFeedbacks;
    },
  },
  beforeMount() {
    this.getAllFeedbacks();
  },
};
</script>
