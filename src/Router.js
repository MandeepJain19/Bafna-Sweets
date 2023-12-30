import { createWebHistory, createRouter } from "vue-router";
import Landingpage from "./Components/Pages/LandingPage.vue";
import ProductCart from "./Components/Pages/ProductCart.vue";
import NotFound from "./Components/Pages/NotFound.vue";
import AdminDashboardAllOrders from "./Components/Dashboard/AdminDashboard.vue";
import AllOrders from "./Components/CurrentUserOrders/AllOrders.vue";
import AllFeedbacks from "./Components/Dashboard/AllFeedbacks.vue";
import AddProduct from "./Components/Dashboard/AddProduct.vue";
import TheAbout from "./Components/Pages/TheAbout.vue";
// import Gallery from "./Components/GalleryComponent/HWGallery.vue";
import Gallery from "./Components/GalleryComponent/HowItWorks.vue";
import store from "./Store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Landingpage },
    { path: "/cart", component: ProductCart },
    { path: "/gallery", component: Gallery },
    { path: "/about", component: TheAbout },
    {
      path: "/admin-dashboard/all-orders",
      component: AdminDashboardAllOrders,
      meta: { requireAdminAuth: true },
    },
    {
      path: "/admin-dashboard/all-feedbacks",
      component: AllFeedbacks,
      meta: { requireAdminAuth: true },
    },
    {
      path: "/admin-dashboard/add-products",
      component: AddProduct,
      meta: { requireAdminAuth: true },
    },
    { path: "/orders", component: AllOrders, meta: { requireUserAuth: true } },
    { path: "/notfound{.*}", component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requireUserAuth && !store.getters.isAuthenticated) {
    next("/");
  } else if (
    to.meta.requireAdminAuth &&
    !store.getters.isAuthenticated &&
    !store.getters.isAdmin
  ) {
    next("/");
  } else next();
});
export default router;
