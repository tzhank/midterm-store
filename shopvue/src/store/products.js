import http, { errorText } from '../api/http'

const LIMIT = 12

export default {
  namespaced: true,
  state: {
    items: [],
    total: 0,
    categories: [],
    current: null,
    loading: false,
    error: null,
    limit: LIMIT
  },
  mutations: {
    SET_ITEMS(state, data) {
      state.items = data.products
      state.total = data.total
    },
    SET_CATEGORIES(state, list) {
      state.categories = list
    },
    SET_CURRENT(state, product) {
      state.current = product
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, value) {
      state.error = value
    }
  },
  actions: {
    async fetchProducts({ commit }, { search, category, page }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        let url = '/products'
        const params = { limit: LIMIT, skip: (page - 1) * LIMIT }
        if (search) {
          url = '/products/search'
          params.q = search
        } else if (category) {
          url = `/products/category/${category}`
        }
        const res = await http.get(url, { params })
        commit('SET_ITEMS', res.data)
      } catch (e) {
        commit('SET_ERROR', errorText(e))
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchCategories({ commit }) {
      try {
        const res = await http.get('/products/categories')
        // The API may return strings or objects, so we handle both
        const list = res.data.map((c) =>
          typeof c === 'string' ? { slug: c, name: c } : c
        )
        commit('SET_CATEGORIES', list)
      } catch (e) {
        commit('SET_CATEGORIES', [])
      }
    },
    async fetchProduct({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      commit('SET_CURRENT', null)
      try {
        const res = await http.get(`/products/${id}`)
        commit('SET_CURRENT', res.data)
      } catch (e) {
        commit('SET_ERROR', errorText(e))
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}