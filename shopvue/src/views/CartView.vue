<template>
  <div>
    <h1>Shopping cart</h1>

    <div v-if="order" class="success">
      Order placed! Order id: {{ order.id }}, total: {{ order.total | money }}.
      <router-link to="/">Continue shopping</router-link>
    </div>

    <p v-if="items.length === 0 && !order">
      Your cart is empty. <router-link to="/">Go to catalog</router-link>
    </p>

    <div v-else-if="items.length > 0">
      <div v-for="item in items" :key="item.id" class="cart-row">
        <img :src="item.thumbnail" :alt="item.title" />
        <div class="grow">
          <router-link :to="{ name: 'product', params: { id: item.id } }">{{ item.title }}</router-link>
          <p class="muted">{{ item.price | money }} each</p>
        </div>
        <QuantityControl :value="item.quantity" @change="changeQuantity(item.id, $event)" />
        <strong>{{ item.price * item.quantity | money }}</strong>
        <button class="btn danger small" @click="remove(item.id)">Remove</button>
      </div>

      <div class="summary">
        <p>Items: {{ totalItems }}</p>
        <p class="price">Total: {{ totalPrice | money }}</p>
        <p v-if="error" class="error">{{ error }}</p>
        <button class="btn" :disabled="loading" @click="checkout">
          {{ loading ? 'Sending order...' : 'Checkout' }}
        </button>
        <button class="btn secondary" @click="clear">Clear cart</button>
        <p v-if="!isLoggedIn" class="muted">You need to log in to checkout.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import QuantityControl from '../components/QuantityControl.vue'

export default {
  name: 'CartView',
  components: { QuantityControl },
  computed: {
    ...mapState('cart', { items: 'items', loading: 'loading', error: 'error', order: 'lastOrder' }),
    ...mapGetters('cart', ['totalItems', 'totalPrice']),
    ...mapGetters('auth', ['isLoggedIn'])
  },
  created() {
    // Hide an old "order placed" message when the page is opened again
    this.$store.commit('cart/SET_ORDER', null)
    this.$store.commit('cart/SET_ERROR', null)
  },
  methods: {
    changeQuantity(id, quantity) {
      this.$store.dispatch('cart/setQuantity', { id, quantity })
    },
    remove(id) {
      this.$store.dispatch('cart/removeFromCart', id)
    },
    clear() {
      this.$store.dispatch('cart/clearCart')
    },
    async checkout() {
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'login', query: { redirect: '/cart' } })
        return
      }
      await this.$store.dispatch('cart/checkout')
    }
  }
}
</script>