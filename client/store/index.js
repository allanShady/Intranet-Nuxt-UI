export const state = () => ({
  drawer: true
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  }
}

export const actions = {
  authenticateUser(vuexContext, user) {
    console.log('vue context', vuexContext);
    return this.$axios.$post('/auth/login', {
      email: user.email,
      password: user.password
  })
  .then(result => { 
    console.log('THE USER TOKEN: ', result.token)
    
    vuexContext.commit("setToken", result.token);
    localStorage.setItem("token", result.token);
    localStorage.setItem(
      "tokenExpiration",
      new Date().getTime() + result.expiresIn * 1000
    );

    vuexContext.dispatch("setLogoutTimer", result.expiresIn * 1000);
  })
  .catch(error => {console.log(error)}); 
  },

  async getDataAsync(vuexContext, resource) {
    return await this.$axios
     .$get(`/${resource}`)
     .then(response => response)
     .catch(error => console.log(error));
  },

  setLogoutTimer(vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit("clearToken");
    }, duration);
  },
} 
//mongodb+srv://mahotag:<password>@cluster0-5qt2r.mongodb.net/test?retryWrites=true&w=majority
