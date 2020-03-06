export const state = () => ({
  drawer: true,
  loginErrorMsg: null,
  branch:null,
  Branch: [],
  warehouse:null,
  Warehouse:[]
})

const logError = error => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  }
}

const removeLocalStoreAuthData = () => {
  localStorage.removeItem('expiration_date')
  localStorage.removeItem('token')
  localStorage.removeItem('user_email')
  localStorage.removeItem('user_name')
  localStorage.removeItem('user_id')
}

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },

  drawer(state, val) {
    state.drawer = val
  },

  storeSignInErrorMsg(state, loginErrorMsg) {
    state.loginErrorMsg = loginErrorMsg
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
  },


}

export const actions = {
  async authenticateUser(vuexContext, user) {

    return await this.$axios.$post('/auth/login', {
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
    vuexContext.commit('storeSignInErrorMsg', error.response.data);
  });
  },

  async getDataAsync(vuexContext, resource) {
    return await this.$axios
     .$get(`/${resource}`)
     .then(response => response)
     .catch(error => logError(error));
  },

  async postDataAsync(vuexContext, data) {
    return await this.$axios
     .$post(`/${data.api_resourse}`, data.post_data)
     .then(response => response)
     .catch(error => logError(error));
  },

  //Auth
  tryAutoLogin({
    commit
  }) {
    const token = localStorage.getItem('token')
    //If the token is not set
    if (!token) return

    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    const now = new Date()

    if (now > expirationDate) return

  },

  logout(vuexContext) {
    vuexContext.commit('clearAuthData')
    removeLocalStoreAuthData();
  },

  requestPasswordReset(vuexContext) 
  { 
    vuexContext.commit('clearAuthData')
    removeLocalStoreAuthData();
  }
} 

export const getters = {
  loginErrorMsg(state) {
    return state.loginErrorMsg;
  }
}
