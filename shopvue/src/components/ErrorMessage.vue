<template>
  <div class="error-box">
    <p class="error">{{ message }}</p>
    <button class="btn" @click="$emit('retry')">Try again</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: { type: String, required: true }
  }
}
</script>