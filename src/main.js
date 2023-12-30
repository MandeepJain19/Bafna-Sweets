import { createApp } from "vue";

import router from "./Router.js";
import App from "./App.vue";
import store from "./Store.js";
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
