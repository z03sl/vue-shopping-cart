<script setup>
import { onMounted, watch } from 'vue'
import { useCartStore } from './stores/cart'
import { CART_STORAGE_KEY } from './stores/cart'
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'

const cart = useCartStore()

onMounted(() => {
  cart.loadFromStorage()
})

watch(
  () => cart.cartItems,
  (val) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true },
)
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>购物车列表应用</h1>
    </header>
    <main class="main">
      <ProductList />
      <Cart />
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  min-height: 100vh;
  box-sizing: border-box;
}
.header {
  margin-bottom: 1.5rem;
}
.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}
.main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
