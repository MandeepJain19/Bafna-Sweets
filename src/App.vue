<template>
  <the-header></the-header>
  <router-view></router-view>
  <register-dialog></register-dialog>
  <the-footer></the-footer>
</template>

<script>
import theHeader from "./Components/Navigation/TheHeader.vue";
import RegisterDialog from "./Components/UI/RegisterDialog.vue";
import TheFooter from "./Components/Navigation/TheFooter.vue";
export default {
  components: {
    theHeader,
    RegisterDialog,
    TheFooter,
  },
};
</script>
