<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import CartItem from './CartItem.vue'

const cart = useCartStore()

/** 全选：与每个 cartItem.checked 联动 */
const selectAll = computed({
  get: () => cart.isAllSelected,
  set: (v) => cart.setAllChecked(v),
})
</script>

<template>
  <section class="cart">
    <h2>购物车</h2>

    <div v-if="cart.cartItems.length === 0" class="empty">购物车为空，请从上方添加商品</div>

    <template v-else>
      <div class="toolbar">
        <label class="check-all">
          <input type="checkbox" v-model="selectAll" />
          全选
        </label>
        <span class="summary">
          已选 {{ cart.cartTotalCount }} 件，合计
          <strong>¥{{ cart.cartTotalPrice.toFixed(2) }}</strong>
        </span>
      </div>

      <transition-group name="list" tag="ul" class="cart-list">
        <CartItem v-for="item in cart.cartItems" :key="item.id" :item="item" />
      </transition-group>
    </template>
  </section>
</template>

<style scoped>
.cart h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}
.empty {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px dashed #e5e7eb;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
}
.check-all {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  user-select: none;
}
.summary {
  font-size: 0.95rem;
}
.summary strong {
  color: #dc2626;
  font-size: 1.1rem;
}
.cart-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
.list-move {
  transition: transform 0.2s ease;
}
</style>
