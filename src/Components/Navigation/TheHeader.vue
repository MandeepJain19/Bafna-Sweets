<template>
  <header ref="nav" class="nav">
    <div class="logo">
      <router-link to="/home"> Bafna Sweets </router-link>
    </div>
    <div class="links big">
      <ul>
        <li @click="scrollTo()">
          <router-link to="/home">All Products</router-link>
        </li>
        <li><router-link to="/gallery">Gallery</router-link></li>
        <!-- <li><router-link to="#">Testimonials</router-link></li> -->
        <li><router-link to="/about">About</router-link></li>
        <li class="tools-tab">
          <a v-if="isAdmin" @click="toggleAdminTools()" class="flex"
            ><span>Admin Tools</span>
            <span v-if="adminTools"><i class="ph-bold ph-caret-up"></i></span>
            <span v-else><i class="ph-bold ph-caret-down"></i></span
          ></a>
          <div v-if="isAdmin" class="tools" :class="adminTools ? '' : 'hide'">
            <li v-if="isAdmin">
              <router-link to="/admin-dashboard/all-orders"
                >All Orders</router-link
              >
            </li>
            <li v-if="isAdmin">
              <router-link to="/admin-dashboard/all-feedbacks"
                >All Feedback</router-link
              >
            </li>
            <li v-if="isAdmin">
              <router-link to="/admin-dashboard/add-products"
                >Add Products</router-link
              >
            </li>
          </div>
        </li>
      </ul>
    </div>
    <div class="tail">
      <div class="cart" v-if="!isAdmin">
        <router-link to="/cart"
          ><i class="ph ph-shopping-cart"></i
        ></router-link>
      </div>
      <div v-if="isLoggedin && !isAdmin" class="orders">
        <router-link to="/orders"
          ><i class="ph ph-clipboard-text"></i>
        </router-link>
      </div>
      <div class="CTA">
        <div v-if="!isLoggedin">
          <the-button @click="LoginSignDialog()">Order now 😃</the-button>
        </div>
        <div class="logout-btn" v-else>
          <the-button @click="logout()"
            >Log out <i class="ph-bold ph-sign-out"></i
          ></the-button>
        </div>
      </div>
      <div class="small menu" @click="toogleSmallMenu()">
        <span v-if="smallMenu"
          ><the-button type="menu-btn"><i class="ph-bold ph-x"></i></the-button
        ></span>
        <span v-else
          ><the-button type="menu-btn"
            ><i class="ph-bold ph-list"></i></the-button
        ></span>
      </div>
    </div>
    <div
      class="background"
      :class="smallMenu ? '' : 'hide'"
      @click="toogleSmallMenu()"
    >
      <div class="links">
        <ul>
          <li @click="scrollTo()">
            <router-link to="/home">All Products</router-link>
          </li>
          <li class="tail-actions">
            <router-link to="/orders">All Orders</router-link>
          </li>
          <li><router-link to="/gallery">Gallery</router-link></li>
          <!-- <li><router-link to="#">Testimonials</router-link></li> -->
          <li><router-link to="/about">About</router-link></li>
          <li class="tail-actions">
            <router-link to="/cart">Cart</router-link>
          </li>
          <li class="tools-tab">
            <a v-if="isAdmin" @click="toggleAdminTools()" class="flex"
              ><span>Admin Tools</span>
              <span v-if="adminTools"><i class="ph-bold ph-caret-up"></i></span>
              <span v-else><i class="ph-bold ph-caret-down"></i></span
            ></a>
            <div v-if="isAdmin" class="tools" :class="adminTools ? '' : 'hide'">
              <li v-if="isAdmin">
                <router-link to="/admin-dashboard/all-orders"
                  >All Orders</router-link
                >
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin-dashboard/all-feedbacks"
                  >All Feedback</router-link
                >
              </li>
              <li v-if="isAdmin">
                <router-link to="/admin-dashboard/add-products"
                  >Add Products</router-link
                >
              </li>
            </div>
          </li>
        </ul>
      </div>
      <div class="CTA">
        <div v-if="!isLoggedin">
          <the-button @click="LoginSignDialog()">Order now 😃</the-button>
        </div>
        <div class="logout-btn" v-else>
          <the-button @click="logout()"
            >Log out <i class="ph-bold ph-sign-out"></i
          ></the-button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  /* background-color: aqua; */
  width: 100%;
  padding: 1.2rem;
  position: relative;
}
.nav.fixed {
  box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.3);
  background-color: #fffefb;
  position: sticky;
  top: 0;
  opacity: 0.9;
  z-index: 100;
}
header,
ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
ul {
  display: flex;
  gap: 2rem;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  font-size: 2.4rem;
  color: inherit;
  transition: all 2s ease-in;
}
.logo a {
  font-size: 3.6rem;
  text-transform: uppercase;
  text-decoration: underline;
}
/* .orders:link,
.orders:visited,
.cart:link,
.cart:visited*/
.orders .ph,
.cart .ph {
  font-size: 4.2rem;
  color: #e03131;
  /* font-weight: bolder; */
}

a:hover,
a:active {
  /* opacity: 0.6; */
  border-bottom: 2px solid #e03131;
}
.tail {
  display: flex;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
}
.tools-tab {
  position: relative;
}
.tools-tab a:hover {
  border-bottom: none;
  opacity: 0.6;
}
.tools {
  position: absolute;
  max-width: 100%;
  top: 105%;
  z-index: 1000;
  background-color: #fffefb;
  font-size: 2rem;
  padding: 0.8rem;
  box-shadow: 0 1.2rem 3.2rem rgba(0, 0, 0, 0.3);

  /* right: 0; */
}
.tools a {
  font-size: 2rem;
  line-height: 1.5;
}
.hide {
  display: none !important;
}
.flex {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

.background .links,
.small.menu,
.background .CTA {
  display: none;
}

/* 960px */
@media (max-width: 60em) {
  header {
    justify-content: space-between;
  }
  .links.big {
    display: none;
  }
  .small.menu {
    display: block;
  }
  .small.menu button {
    background-color: #fffefb;
  }
  .background {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    height: 100vh;
    background-color: #fffefbba;
    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .background .links {
    display: block;
  }
  .background .links ul {
    display: flex;
    flex-direction: column;
  }
  .background .links ul li a {
    font-size: 3.6rem;
    font-weight: 500;
  }
  .links .tail-actions {
    display: none;
  }
}

@media (max-width: 45em) {
  .tail .cart,
  .tail .orders {
    display: none;
  }
  .links .tail-actions {
    display: block;
  }
}

@media (max-width: 34em) {
  .CTA {
    display: none;
  }
  .background .CTA {
    display: block;
  }
  .background {
    display: flex;
    flex-direction: column;
  }
}
</style>
<script>
import TheButton from "../UI/TheButton.vue";

export default {
  components: {
    TheButton,
  },
  data() {
    return {
      adminTools: false,
      smallMenu: false,
    };
  },
  computed: {
    isLoggedin() {
      return this.$store.getters.isAuthenticated;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
      // return true;
    },
  },
  methods: {
    toogleSmallMenu() {
      this.smallMenu = !this.smallMenu;
    },
    toggleAdminTools() {
      this.adminTools = !this.adminTools;
    },
    scrollTo() {
      document
        .querySelector("#products")
        ?.scrollIntoView({ behavior: "smooth" });
    },
    LoginSignDialog() {
      this.$store.commit("showLoginSignupDialog");
    },

    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
};
</script>
