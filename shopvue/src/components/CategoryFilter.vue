<template>
  <select class="select" :value="selected" @change="$emit('select', $event.target.value)">
    <option value="">All categories</option>
    <option v-for="c in categories" :key="c.slug" :value="c.slug">{{ c.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    categories: { type: Array, default: () => [] },
    selected: { type: String, default: '' }
  }
}
</script>