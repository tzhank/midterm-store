import http, { errorText } from '../api/http'

// On page load we try to restore the login from localStorage
const saved = localStorage.getItem('auth')
const initial = saved ? JSON.parse(saved) : { user: null, token: null }

export default {
  namespaced: true,
  state: {
    user: initial.user,
    token: initial.token,
    loading: false,
    error: null
  },
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  mutations: {
    SET_AUTH(state, { user, token }) {
      state.user = user
      state.token = token
      if (token) {
        localStorage.setItem('auth', JSON.stringify({ user, token }))
      } else {
        localStorage.removeItem('auth')
      }
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, value) {
      state.error = value
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const res = await http.post('/auth/login', { username, password })
        const data = res.data
        const token = data.accessToken || data.token
        const user = {
          id: data.id,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          image: data.image
        }
        commit('SET_AUTH', { user, token })
        return true
      } catch (e) {
        commit('SET_ERROR', errorText(e))
        return false
      } finally {
        commit('SET_LOADING', false)
      }
    },
    logout({ commit }) {
      commit('SET_AUTH', { user: null, token: null })
    }
  }
}