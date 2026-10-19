<template>
  <div>
    <h1>My account</h1>
    <div v-if="user" class="detail">
      <img v-if="user.image" :src="user.image" :alt="user.username" width="100" />
      <div>
        <p><strong>{{ user.firstName }} {{ user.lastName }}</strong></p>
        <p class="muted">Username: {{ user.username }}</p>
        <p class="muted">Email: {{ user.email }}</p>
        <button class="btn danger" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileView',
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  }
}
</script>