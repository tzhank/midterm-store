<template>
  <header class="header">
    <router-link to="/" class="logo">ShopVue</router-link>
    <nav>
      <router-link to="/" exact>Catalog</router-link>
      <router-link to="/cart">
        Cart <span v-if="totalItems > 0" class="badge">{{ totalItems }}</span>
      </router-link>
      <template v-if="isLoggedIn">
        <router-link to="/profile">{{ user.firstName }}</router-link>
        <a href="#" @click.prevent="logout">Logout</a>
      </template>
      <router-link v-else to="/login">Login</router-link>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapGetters('cart', ['totalItems'])
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/')
      }
    }
  }
}
</script>