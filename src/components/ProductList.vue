<script setup>
import { goodsList } from '../data/goods'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>

<template>
  <section class="product-list">
    <h2>商品列表</h2>
    <ul class="grid">
      <li v-for="g in goodsList" :key="g.id" class="card">
        <img :src="g.image" :alt="g.name" width="120" height="120" />
        <h3>{{ g.name }}</h3>
        <p class="price">¥{{ g.price }}</p>
        <p class="stock">库存 {{ g.stock }}</p>
        <button type="button" class="btn" @click="cart.addToCart(g)">加入购物车</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.product-list h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}
.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}
.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
}
.card img {
  border-radius: 6px;
  object-fit: cover;
}
.card h3 {
  margin: 0.5rem 0 0.25rem;
  font-size: 0.95rem;
}
.price {
  margin: 0;
  color: #dc2626;
  font-weight: 600;
}
.stock {
  margin: 0.25rem 0 0.5rem;
  font-size: 0.8rem;
  color: #6b7280;
}
.btn {
  margin-top: auto;
  padding: 0.4rem 0.75rem;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
}
.btn:hover {
  background: #1d4ed8;
}
</style>
