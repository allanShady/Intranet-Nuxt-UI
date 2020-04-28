const logError = error => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);

    return error.response.status;
  }
};

const removeLocalStoreAuthData = () => {
  localStorage.removeItem("expiration_date");
  localStorage.removeItem("token");
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_id");
};

export const state = () => ({
  snackBar: {
    show: false,
    color: 'info',
    display_message: '',
    timeout: 3000,
    Bottom: true,
    left: true,
    right: false,
    top: false,
  }, 
  drawer: true,
  loginErrorMsg: null,
  branch: null,
  Branch: [],
  currentSelectedDocument: undefined,
  warehouse: null,
  Warehouse: [],
  productPagination: {}
});

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },

  SET_PRODUCT_PAGINATION(state, pagination) {
    state.productPagination = pagination;
  },

  ACTIVE_SNACK_BAR(state, snackBar) {
    state.snackBar.show = snackBar.show
    state.snackBar.display_message = snackBar.display_message
    state.snackBar.color = snackBar.color
    state.snackBar.timeout = snackBar.timeout
    state.snackBar.Bottom = snackBar.Bottom
    state.snackBar.left = snackBar.left
    state.snackBar.right = snackBar.right
    state.snackBar.top = snackBar.top
  },

  CLOSE_SNACK_BAR(state, snackBar) {
    state.snackBar.show = snackBar.show
  },

  SET_CURRENT_SELECTED_DOCUMENT(state, document) {
    state.currentSelectedDocument = document;
  },

  drawer(state, val) {
    state.drawer = val;
  },

  storeSignInErrorMsg(state, loginErrorMsg) {
    state.loginErrorMsg = loginErrorMsg;
  },

  setAuthData(state, user) {
    state.auth.temp_token = user.token;
    state.auth.loggedIn = true;
    state.auth.user = user.userEmail;
    state.auth.user_name = user.userName;
    state.auth.token_expires_in = user.expiresIn;
    state.auth.user_id = user.id;
  },

  clearAuthData(state) {
    state.auth.temp_token = null;
    state.auth.loggedIn = null;
    state.auth.user = null;
    state.auth.user_name = null;
    state.auth.token_expires_in = null;
    state.auth.user_id = null;
  }
};

export const actions = {
  async authenticateUser(vuexContext, user) {
    return await this.$axios
      .$post("/auth/login", {
        email: user.email,
        password: user.password
      })
      .then(result => {
        vuexContext.commit("setAuthData", result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("expiration_date", result.expiresIn);
        localStorage.setItem("user_email", result.userEmail);
        localStorage.setItem("user_name", result.userName);
        localStorage.setItem("user_id", result.id);
      })
      .catch(error => {
        logError(error);
        vuexContext.commit("storeSignInErrorMsg", error.response.data);
      });
  },

  activeSnackBar(vuexContext, snackBar){
    vuexContext.commit('ACTIVE_SNACK_BAR', snackBar);
  },

  closeSnackBar(vuexContext, showSnackBar){
    vuexContext.commit('CLOSE_SNACK_BAR', showSnackBar);
  },

  setCurrentDocument(vuexContext, document){
    vuexContext.commit('SET_CURRENT_SELECTED_DOCUMENT', document);
  },

  getDataAsync(vuexContext, resource) {
    return this.$axios
      .get(`/${resource}`)
      .then(response => {
        if (resource === "products")
          vuexContext.commit(
            "SET_PRODUCT_PAGINATION",
            response.headers["pagination"]
          );

        return response.data;
      })
      .catch(error => logError(error));
  },

  async postDataAsync(vuexContext, data) {
    return await this.$axios
      .$post(`/${data.api_resourse}`, data.post_data)
      .then(response => response)
      .catch(error => { logError(error) });
  },

  async postDataWithCustomHeaderAsync(vuexContext, data) {
    return await this.$axios
      .$post(`/${data.api_resourse}`, data.post_data, data.headers)
      .then(response => response)
      .catch(error => logError(error));
  },

  //Auth
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem("token");
    //If the token is not set
    if (!token) return;

    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const now = new Date();

    if (now > expirationDate) return;
  },

  logout(vuexContext) {
    vuexContext.commit("clearAuthData");
    removeLocalStoreAuthData();
  },

  requestPasswordReset(vuexContext) {
    vuexContext.commit("clearAuthData");
    removeLocalStoreAuthData();
  }
};

export const getters = {
  loginErrorMsg(state) {
    return state.loginErrorMsg;
  },

  loginErrorMsg(state) {
    return state.loginErrorMsg;
  },

  snackBar(state) {
    return state.snackBar;
  },

  selectedDocument(state) {
    return state.currentSelectedDocument;
  }

};
