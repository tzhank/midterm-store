<template>
  <div>
    <h1>Product catalog</h1>

    <div class="toolbar">
      <SearchBar :value="search" @search="onSearch" />
      <CategoryFilter :categories="categories" :selected="category" @select="onCategory" />
    </div>

    <p v-if="toast" class="toast">{{ toast }}</p>

    <LoadingSpinner v-if="loading" text="Loading products..." />
    <ErrorMessage v-else-if="error" :message="error" @retry="load" />
    <p v-else-if="items.length === 0">No products found.</p>
    <div v-else class="grid">
      <ProductCard
        v-for="p in items"
        :key="p.id"
        :product="p"
        @add-to-cart="addToCart"
      />
    </div>

    <div v-if="totalPages > 1 && !loading" class="pager">
      <button class="btn secondary" :disabled="page === 1" @click="page--">Previous</button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button class="btn secondary" :disabled="page === totalPages" @click="page++">Next</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

export default {
  name: 'CatalogView',
  components: { SearchBar, CategoryFilter, ProductCard, LoadingSpinner, ErrorMessage },
  data() {
    return {
      search: '',
      category: '',
      page: 1,
      toast: '',
      toastTimer: null
    }
  },
  computed: {
    ...mapState('products', ['items', 'total', 'categories', 'loading', 'error', 'limit']),
    totalPages() {
      return Math.ceil(this.total / this.limit)
    },
    // One object that collects everything that changes the product list
    query() {
      return { search: this.search, category: this.category, page: this.page }
    }
  },
  watch: {
    // When search, category or page changes, load products again
    query() {
      this.load()
    }
  },
  created() {
    this.$store.dispatch('products/fetchCategories')
    this.load()
  },
  beforeDestroy() {
    clearTimeout(this.toastTimer)
  },
  methods: {
    load() {
      return this.$store.dispatch('products/fetchProducts', {
        search: this.search,
        category: this.category,
        page: this.page
      })
    },
    onSearch(text) {
      this.search = text
      this.category = ''
      this.page = 1
    },
    onCategory(slug) {
      this.category = slug
      this.search = ''
      this.page = 1
    },
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', { product, quantity: 1 })
      this.toast = `${product.title} added to cart`
      clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.toast = ''
      }, 2000)
    }
  }
}
</script>