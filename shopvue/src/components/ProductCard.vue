<template>
  <div class="card">
    <router-link :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.thumbnail" :alt="product.title" />
      <h3>{{ product.title }}</h3>
    </router-link>
    <p class="muted">{{ product.category }} · rating {{ product.rating }}</p>
    <p class="price">{{ product.price | money }}</p>
    <button class="btn" @click="$emit('add-to-cart', product)">Add to cart</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true }
  }
}
</script>