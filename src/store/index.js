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
//mongodb+srv://mahotag:<password>@cluster0-5qt2r.mongodb.net/test?retryWrites=true&w=majority
