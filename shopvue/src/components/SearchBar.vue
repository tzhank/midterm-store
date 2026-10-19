<template>
  <form class="search" @submit.prevent="submit">
    <input v-model="text" type="text" placeholder="Search products..." />
    <button class="btn" type="submit">Search</button>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: { type: String, default: '' }
  },
  data() {
    return { text: this.value }
  },
  watch: {
    // If the parent changes the search text (for example clears it), update the input
    value(newValue) {
      this.text = newValue
    }
  },
  methods: {
    submit() {
      this.$emit('search', this.text.trim())
    }
  }
}
</script>