// export const state = () => ({
//   drawer: true
// })

// export const mutations = {
//   toggleDrawer(state) {
//     state.drawer = !state.drawer
//   },
//   drawer(state, val) {
//     state.drawer = val
//   }
// }

//mongodb+srv://mahotag:<password>@cluster0-5qt2r.mongodb.net/test?retryWrites=true&w=majority

import Vuex from 'vuex'
import firebase, {auth, GoogleProvider} from '@/services/fireinit.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
      }
    },
    actions: {
      autoSignIn ({commit}, payload) {
        commit('setUser', payload)
      },

      signInWithGoogle ({commit}) {
        return new Promise((resolve, reject) => {
          auth.signInWithRedirect(GoogleProvider)
          resolve()
        })
      },

      signOut ({commit}) {
        auth.signOut().then(() => {
          commit('setUser', null)
        }).catch(err => console.log(error))
      }
    }
  })
}

export default createStore