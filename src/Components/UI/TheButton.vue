<template>
  <div>
    <router-link v-if="isLink" class="btn" :class="type" :to="to">
      <slot></slot>
    </router-link>
    <a v-else-if="isExternalLink" class="btn" :href="to" target="_blank"
      ><slot></slot
    ></a>
    <button :disabled="isDisable" v-else class="btn" :class="type">
      <slot></slot>
    </button>
  </div>
</template>

<script>
import routerLink from "vue-router";
export default {
  components: {
    routerLink,
  },
  props: {
    type: {
      type: String,
      required: false,
      default: null,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    isLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDisable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isExternalLink: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    goto() {
      return "/" + this.link;
    },
  },
};
</script>

<style scoped>
.btn {
  background-color: #ffe066;
  color: inherit;
  /* add border inside  */
  box-shadow: inset 0 0 0 1px #fff;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  padding: 1.2rem 2.4rem;
  letter-spacing: 1px;
  font-size: 2.4rem;
  transition: all 1s ease-in-out;
  border: none;
  border-radius: 15px;
}
.menu-btn {
  background-color: #e03131;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  color: #ffff;
}
.small-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
}
.btn-green {
  background-color: #2b8a3e;
  color: #ffff;
}
.btn:hover,
.btn:active {
  opacity: 0.6;
  box-shadow: inset 0 0 0 1px #0f1841;
}

.submit-btn {
  background-color: #fffefb;
  box-shadow: inset 0 0 0 1px #0f1841;
  align-self: center;
  justify-self: center;
}
.submit-btn:hover {
  background-color: #0f1841;
  color: #fffefb;
}

@media (max-width: 39em) {
  .btn {
    font-weight: 600;
    padding: 0.8rem 1.8rem;
    font-size: 2rem;
    border-radius: 15px;
  }
}
</style>
