import { createStore } from "vuex";
import { timeOut } from "./helper";
const store = createStore({
  state() {
    return {
      showProductDetails: false,
      showProductIndex: -1,
      products: [],
      // products: [
      //   {
      //     id: 101,
      //     name: "Ghevar",
      //     price: 100,
      //     img: "first",
      //   },
      //   {
      //     id: 102,
      //     name: "Soan Papdi",
      //     price: 80,
      //     img: "second",
      //   },
      //   {
      //     id: 103,
      //     name: "Ladoo",
      //     price: 50,
      //     img: "third",
      //   },
      //   {
      //     id: 104,
      //     name: "Mishri",
      //     price: 30,
      //     img: "forth",
      //   },
      //   {
      //     id: 105,
      //     name: "Ghevar",
      //     price: 100,
      //     img: "first",
      //   },
      //   {
      //     id: 106,
      //     name: "Soan Papdi",
      //     price: 80,
      //     img: "second",
      //   },
      //   {
      //     id: 107,
      //     name: "Ladoo",
      //     price: 50,
      //     img: "third",
      //   },
      //   {
      //     id: 108,
      //     name: "Mishri",
      //     price: 30,
      //     img: "first",
      //   },
      // ],
      cart: [],
      allUsers: [],
      currentUser: {},
      currentUserOrders: {},
      orders: [],
      showDialogConfirmation: false,
      showDialogFeedback: false,
      showLoginSignupDialog: false,
      showAddProductConfirmation: false,
      tokenExpiration: null,
      userId: null,
      token: null,
      isLoading: false,
      feedbackOrderId: null,
      allFeedbacks: [],
      isAdmin: false,
    };
  },
  getters: {
    showProductDetails(state) {
      return state.showProductDetails;
    },
    products(state) {
      return state.products;
    },
    showProductIndex(state) {
      return state.showProductIndex;
    },
    cartProducts(state) {
      return state.cart;
    },
    currentUser(state) {
      return state.currentUser;
    },
    currentUserOrders(state) {
      return state.currentUserOrders;
    },
    orders(state) {
      return state.orders;
    },
    showDialogConfirmation(state) {
      return state.showDialogConfirmation;
    },
    showDialogFeedback(state) {
      return state.showDialogFeedback;
    },
    showAddProductConfirmation(state) {
      return state.showAddProductConfirmation;
    },
    showLoginSignupDialog(state) {
      return state.showLoginSignupDialog;
    },
    isAuthenticated(state) {
      return state.token;
    },
    isLoading(state) {
      return state.isLoading;
    },
    allUsers(state) {
      return state.allUsers;
    },
    getFeedbackOrderId(state) {
      return state.feedbackOrderId;
    },
    getAllFeedbacks(state) {
      return state.allFeedbacks;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
  },
  mutations: {
    showProductDetails(state, prodIndex) {
      state.showProductIndex = prodIndex;
      state.showProductDetails = true;
    },
    closeProductDetails(state) {
      state.showProductDetails = false;
    },
    addProductToCart(state, product) {
      // if product is already in cart increase its quantity
      for (const prod of state.cart) {
        if (prod.name === product.name && prod.weight === product.weight) {
          prod.quantity += product.quantity;
          return;
        }
      }
      // otherwise directly push in cart
      state.cart.push(product);
    },
    setCurrentUser(state, payload) {
      if (payload?.isAdmin === true) state.isAdmin = true;
      state.currentUser = { ...payload };
    },
    setCurrentUserOrders(state, payload) {
      state.currentUserOrders = payload;
    },
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
    },
    addOrders(state, order) {
      state.orders = order;
      state.cart = [];
    },
    toggleShowDialogConfirmation(state) {
      state.showDialogConfirmation = !state.showDialogConfirmation;
    },
    toggleShowDialogFeedback(state) {
      state.showDialogFeedback = !state.showDialogFeedback;
    },
    toggleAddProductConfirmation(state) {
      state.showAddProductConfirmation = !state.showAddProductConfirmation;
    },
    showLoginSignupDialog(state) {
      state.showLoginSignupDialog = !state.showLoginSignupDialog;
    },
    toggleIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    addAllUsers(state, allusers) {
      state.allUsers = allusers;
    },
    setFeedbackOrderId(state, payload) {
      state.feedbackOrderId = payload;
    },
    setAllFeedbacks(state, payload) {
      state.allFeedbacks = payload;
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    setIsAdmin(state, payload) {
      state.isAdmin = payload;
    },
  },
  actions: {
    // set index of product which user want to see in details
    // Recive payload as index of that product
    showProducts(context, payload) {
      context.commit("showProductDetails", payload);
    },

    // add product to cart state
    // payload -> product object
    addToCart(context, payload) {
      context.commit("addProductToCart", payload);
    },

    // Generic function to call api.
    // payload -> object containing url, method, body etc..
    // return -> fetched data
    async apiCall(context, payload) {
      const response = await Promise.race([
        fetch(`${payload.url}`, {
          method: payload.method,
          body: payload.body,
          returnSecureToken: payload.returnSecureToken,
        }),
        timeOut(30),
      ]);
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }
      return responseData;
    },

    // Validate user id password and get current user details form DB.
    // Payload-> emailId and password.
    async login(context, payload) {
      context.commit("toggleIsLoading");

      // Validate user id entered by user with firebase authetication
      let apiCallArguments = {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA91pFY_erLyHMtRQ1rnXIXgPrz7kLh8Tw",
        method: "POST",
        body: JSON.stringify(payload),
        returnSecureToken: true,
      };
      const responseData = await context.dispatch("apiCall", apiCallArguments);
      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });

      //get logged in user details from firebase database and set to currentUser state
      apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/users/${responseData.localId}.json`,
        method: "GET",
        body: null,
        returnSecureToken: false,
      };
      const data = await context.dispatch("apiCall", apiCallArguments);
      context.commit("setCurrentUser", { ...data, id: responseData.localId });

      context.commit("toggleIsLoading");
    },

    //create new Authentication in firebase
    //create new user with its details in DB
    //Payload -> Object of user entered details
    async signup(context, payload) {
      context.commit("toggleIsLoading");

      // Create new user with email and password for Authenticating in firebase
      // Save user details in firebase DB
      const emailPassword = {
        email: payload.email,
        password: payload.password,
      };
      let apiCallArguments = {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA91pFY_erLyHMtRQ1rnXIXgPrz7kLh8Tw",
        method: "POST",
        body: JSON.stringify(emailPassword),
        returnSecureToken: true,
      };
      const data = await context.dispatch("apiCall", apiCallArguments);
      context.commit("setUser", {
        token: data.idToken,
        userId: data.localId,
        tokenExpiration: data.expiresIn,
      });

      //Saving user details in Database
      apiCallArguments.url = `https://bafnasweets-default-rtdb.firebaseio.com/users/${data.localId}.json`;
      apiCallArguments.method = "PUT";
      apiCallArguments.body = JSON.stringify(payload);
      apiCallArguments.tokenExpiration = false;
      await context.dispatch("apiCall", apiCallArguments);

      context.commit("setCurrentUser", { ...payload, id: data.localId });

      context.commit("toggleIsLoading");
    },
    //Log out user and clear all related State data
    logout(context) {
      context.commit("setUser", {
        token: null,
        userId: null,
        tokenExpiration: null,
      });
      context.commit("setCurrentUser", null);
      context.commit("setCurrentUserOrders", null);
      context.commit("setIsAdmin", false);
    },

    // Store order details in firebase orders DB
    // Updating Users DB with new orderID in Firebase.
    // Payload-> orderDetails with currentUserId
    async placeOrder(context, payload) {
      context.commit("toggleIsLoading");

      //Saving order in firebase orders DB
      let apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/orders.json`,
        method: "POST",
        body: JSON.stringify(payload),
        returnSecureToken: false,
      };
      const orderId = await context.dispatch("apiCall", apiCallArguments);

      // Updating Users DB with new orderID in Firebase.
      const currentUser = context.getters.currentUser;
      if (currentUser.orders) currentUser.orders.push(orderId);
      else {
        currentUser.orders = [orderId];
      }
      apiCallArguments.url = `https://bafnasweets-default-rtdb.firebaseio.com/users/${payload.userId}.json`;
      apiCallArguments.method = "PUT";
      apiCallArguments.body = JSON.stringify(currentUser);
      apiCallArguments.tokenExpiration = false;
      const userData = await context.dispatch("apiCall", apiCallArguments);
      context.commit("addOrders", payload);
      context.commit("setCurrentUser", userData);
      context.commit("toggleIsLoading");
    },

    // Get allUsers orders for Admin purpose
    async getAllUsersNOrders(context) {
      context.commit("toggleIsLoading");

      let apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/orders.json`,
        method: "GET",
        body: null,
        returnSecureToken: false,
      };
      let allOrders = await context.dispatch("apiCall", apiCallArguments);

      // Formating allOrders in array
      allOrders = Object.keys(allOrders).map((key) => {
        const order = {
          ...allOrders[key],
          orderId: key,
        };
        return order;
      });

      // Getting all Users
      apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/users.json`,
        method: "GET",
        body: null,
        returnSecureToken: false,
      };
      let allUsers = await context.dispatch("apiCall", apiCallArguments);

      // Populating users in orders
      const orderNUser = allOrders.map((order) => {
        const orders = {
          ...order,
          customerDetails: allUsers[order.userId],
        };
        return orders;
      });
      // Sort by Latest order
      if (orderNUser.length > 0) {
        orderNUser.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
      }
      context.commit("addOrders", orderNUser);
      context.commit("toggleIsLoading");
    },
    // Get all Orders for CurrentUser
    async getCurrentUserOrders(context) {
      context.commit("toggleIsLoading");

      //Check if user is logged in or not
      const currentUser = context.getters.currentUser;
      if (!currentUser.id) return;

      // Check if Currentuser have orders.
      if (!currentUser.orders || currentUser.orders?.length === 0) {
        // console.log("no orders");
        context.commit("toggleIsLoading");
        return;
      }

      // fetch all orders
      let apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/orders.json`,
        method: "GET",
        body: null,
        returnSecureToken: false,
      };
      let allOrders = await context.dispatch("apiCall", apiCallArguments);

      // format orders in users
      const currentUserOrders = currentUser.orders.map((key) => {
        return {
          ...allOrders[key.name],
          orderId: key.name,
        };
      });

      // Sort by Latest order
      if (currentUserOrders.length > 0) {
        currentUserOrders.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
      }
      // console.log(currentUserOrders);
      context.commit("setCurrentUserOrders", currentUserOrders);
      context.commit("toggleIsLoading");
    },
    // Submit Feedback for order
    async submitFeedback(context, payload) {
      context.commit("toggleIsLoading");
      const apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/feedback.json`,
        method: "POST",
        body: JSON.stringify(payload),
        returnSecureToken: false,
      };
      await context.dispatch("apiCall", apiCallArguments);
      context.commit("toggleIsLoading");
    },
    // Get all Feedback -> Admin
    async getAllFeedbacks(context) {
      context.commit("toggleIsLoading");

      // Fetch all feedbacks
      let apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/feedback.json`,
        method: "GET",
        body: null,
        returnSecureToken: false,
      };
      const allFeedbacks = await context.dispatch("apiCall", apiCallArguments);

      // Fetch All orders
      apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/orders.json`,
        method: "GET",
        body: null,
        returnSecureToken: false,
      };
      const allOrders = await context.dispatch("apiCall", apiCallArguments);

      // Fetch all users
      apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/users.json`,
        method: "GET",
        body: null,
        returnSecureToken: false,
      };
      const allUsers = await context.dispatch("apiCall", apiCallArguments);

      // format feedback
      const formatFeedback = Object.keys(allFeedbacks).map((feedback) => {
        const newFeedback = {
          id: feedback,
          message: allFeedbacks[feedback].message,
          title: allFeedbacks[feedback].title,
          date: allFeedbacks[feedback].date,
          order: allOrders[allFeedbacks[feedback].orderId],
          customerDetails: allUsers[allFeedbacks[feedback].userId],
          // ...allFeedbacks[feedback],
        };
        return newFeedback;
      });
      context.commit("setAllFeedbacks", formatFeedback);
      context.commit("toggleIsLoading");
    },
    // Post product to firebase -> Admin
    // Payload - product object
    async addProduct(context, payload) {
      context.commit("toggleIsLoading");
      const apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/products.json`,
        method: "POST",
        body: JSON.stringify(payload),
        returnSecureToken: false,
      };
      await context.dispatch("apiCall", apiCallArguments);
      context.commit("toggleIsLoading");
    },
    async getAllProducts(context) {
      let apiCallArguments = {
        url: `https://bafnasweets-default-rtdb.firebaseio.com/products.json`,
        method: "GET",
        body: null,
        returnSecureToken: false,
      };
      const products = await context.dispatch("apiCall", apiCallArguments);
      // Fprmat Products
      const allProducts = Object.keys(products).map((key) => {
        const product = {
          ...products[key],
          orderId: key,
        };
        return product;
      });
      context.commit("setProducts", allProducts);
    },
  },
});

export default store;
