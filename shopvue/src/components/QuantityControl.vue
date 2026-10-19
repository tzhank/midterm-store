<template>
  <div class="qty">
    <button class="btn small" :disabled="value <= min" @click="$emit('change', value - 1)">-</button>
    <span>{{ value }}</span>
    <button class="btn small" :disabled="value >= max" @click="$emit('change', value + 1)">+</button>
  </div>
</template>

<script>
export default {
  name: 'QuantityControl',
  props: {
    value: { type: Number, required: true },
    min: { type: Number, default: 1 },
    max: { type: Number, default: 99 }
  }
}
</script>