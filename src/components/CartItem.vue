<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const cart = useCartStore()

function onQtyBlur(e) {
  cart.setQuantity(props.item.id, e.target.value)
}
</script>

<template>
  <li class="cart-item">
    <label class="check">
      <input
        type="checkbox"
        :checked="item.checked"
        @change="cart.setItemChecked(item.id, $event.target.checked)"
      />
    </label>
    <img :src="item.image" :alt="item.name" width="72" height="72" />
    <div class="meta">
      <span class="name">{{ item.name }}</span>
      <span class="price">¥{{ item.price }}</span>
    </div>
    <div class="qty">
      <button
        type="button"
        class="qty-btn"
        :disabled="item.quantity <= 1"
        aria-label="减少数量"
        @click="cart.decrementQty(item.id)"
      >
        −
      </button>
      <input
        class="qty-input"
        type="number"
        :min="1"
        :max="item.stock"
        :value="item.quantity"
        @blur="onQtyBlur"
        @keydown.enter="($event.target).blur()"
      />
      <button
        type="button"
        class="qty-btn"
        :disabled="item.quantity >= item.stock"
        aria-label="增加数量"
        @click="cart.incrementQty(item.id)"
      >
        +
      </button>
    </div>
    <button type="button" class="remove" @click="cart.removeFromCart(item.id)">移除</button>
  </li>
</template>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: auto 72px 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
}
.cart-item:last-child {
  border-bottom: none;
}
.check {
  display: flex;
  align-items: center;
}
.cart-item img {
  border-radius: 6px;
  object-fit: cover;
}
.meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.name {
  font-weight: 500;
}
.price {
  color: #dc2626;
  font-size: 0.9rem;
}
.qty {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.qty-btn {
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  line-height: 1;
}
.qty-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.qty-input {
  width: 3rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.25rem;
}
.remove {
  border: none;
  background: transparent;
  color: #2563eb;
  cursor: pointer;
  font-size: 0.875rem;
}
.remove:hover {
  text-decoration: underline;
}
</style>
