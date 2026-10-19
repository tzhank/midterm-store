import http, { errorText } from '../api/http'

const saved = localStorage.getItem('cart')

function save(items) {
  localStorage.setItem('cart', JSON.stringify(items))
}

export default {
  namespaced: true,
  state: {
    items: saved ? JSON.parse(saved) : [],
    loading: false,
    error: null,
    lastOrder: null
  },
  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: (state) => {
      const total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      return Math.round(total * 100) / 100
    }
  },
  mutations: {
    ADD_ITEM(state, { product, quantity }) {
      const found = state.items.find((i) => i.id === product.id)
      if (found) {
        found.quantity += quantity
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity
        })
      }
      save(state.items)
    },
    SET_QUANTITY(state, { id, quantity }) {
      const item = state.items.find((i) => i.id === id)
      if (item) {
        item.quantity = quantity
        save(state.items)
      }
    },
    REMOVE_ITEM(state, id) {
      state.items = state.items.filter((i) => i.id !== id)
      save(state.items)
    },
    CLEAR(state) {
      state.items = []
      save(state.items)
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, value) {
      state.error = value
    },
    SET_ORDER(state, order) {
      state.lastOrder = order
    }
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('ADD_ITEM', payload)
    },
    setQuantity({ commit }, payload) {
      commit('SET_QUANTITY', payload)
    },
    removeFromCart({ commit }, id) {
      commit('REMOVE_ITEM', id)
    },
    clearCart({ commit }) {
      commit('CLEAR')
    },
    // POST request: sends the cart to the server (the mock server only simulates saving)
    async checkout({ commit, state, rootState }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const res = await http.post('/carts/add', {
          userId: rootState.auth.user.id,
          products: state.items.map((i) => ({ id: i.id, quantity: i.quantity }))
        })
        commit('SET_ORDER', res.data)
        commit('CLEAR')
        return true
      } catch (e) {
        commit('SET_ERROR', errorText(e))
        return false
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}