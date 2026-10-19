<template>
  <div class="spinner-wrap">
    <div class="spinner"></div>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    text: { type: String, default: 'Loading...' }
  }
}
</script>