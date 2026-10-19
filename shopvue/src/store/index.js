import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import products from './products'
import cart from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, products, cart }
})