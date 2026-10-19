<template>
  <div>
    <button class="btn secondary" @click="$router.back()">Back</button>

    <LoadingSpinner v-if="loading" text="Loading product..." />
    <ErrorMessage v-else-if="error" :message="error" @retry="load" />
    <div v-else-if="product" class="detail">
      <img :src="product.thumbnail" :alt="product.title" class="detail-img" />
      <div>
        <h1>{{ product.title }}</h1>
        <p class="muted">
          <span v-if="product.brand">{{ product.brand }} · </span>
          {{ product.category }} · rating {{ product.rating }}
        </p>
        <p>{{ product.description }}</p>
        <p class="price">{{ product.price | money }}</p>

        <div v-if="product.stock > 0">
          <p class="muted">In stock: {{ product.stock }}</p>
          <QuantityControl :value="quantity" :max="product.stock" @change="quantity = $event" />
          <br />
          <button class="btn" @click="addToCart">Add {{ quantity }} to cart</button>
        </div>
        <p v-else class="error">Out of stock</p>

        <p v-if="toast" class="toast">{{ toast }}</p>
        <router-link to="/cart">Go to cart</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import QuantityControl from '../components/QuantityControl.vue'

export default {
  name: 'ProductView',
  components: { LoadingSpinner, ErrorMessage, QuantityControl },
  props: {
    // comes from the dynamic route /product/:id
    id: { type: String, required: true }
  },
  data() {
    return { quantity: 1, toast: '', toastTimer: null }
  },
  computed: {
    ...mapState('products', { product: 'current', loading: 'loading', error: 'error' })
  },
  watch: {
    // If the id in the URL changes, load the new product
    id() {
      this.quantity = 1
      this.load()
    }
  },
  created() {
    this.load()
  },
  beforeDestroy() {
    clearTimeout(this.toastTimer)
  },
  methods: {
    load() {
      return this.$store.dispatch('products/fetchProduct', this.id)
    },
    addToCart() {
      this.$store.dispatch('cart/addToCart', { product: this.product, quantity: this.quantity })
      this.toast = `Added ${this.quantity} item(s) to cart`
      this.quantity = 1
      clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.toast = ''
      }, 2000)
    }
  }
}
</script>