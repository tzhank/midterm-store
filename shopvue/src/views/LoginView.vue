<template>
  <div>
    <h1>Login</h1>
    <form class="form" @submit.prevent="submit">
      <label>
        Username
        <input v-model="username" type="text" required />
      </label>
      <label>
        Password
        <input v-model="password" type="password" required />
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <button class="btn" type="submit" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>
    <p class="muted">Demo account: emilys / emilyspass</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return { username: 'emilys', password: 'emilyspass' }
  },
  computed: {
    ...mapState('auth', ['loading', 'error'])
  },
  created() {
    this.$store.commit('auth/SET_ERROR', null)
  },
  methods: {
    async submit() {
      const ok = await this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password
      })
      if (ok) {
        this.$router.push(this.$route.query.redirect || '/')
      }
    }
  }
}
</script>
