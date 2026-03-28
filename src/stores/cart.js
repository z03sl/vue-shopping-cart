import { defineStore } from 'pinia'

export const CART_STORAGE_KEY = 'vue-cart-cartItems'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    /** 购物车项：含 checked 用于勾选、stock 用于库存校验；初始在 mounted 中从 LocalStorage 读取 */
    cartItems: [],
  }),

  getters: {
    /** 已勾选商品总金额 */
    cartTotalPrice(state) {
      return state.cartItems
        .filter((i) => i.checked)
        .reduce((sum, i) => sum + i.price * i.quantity, 0)
    },
    /** 已勾选商品总件数 */
    cartTotalCount(state) {
      return state.cartItems
        .filter((i) => i.checked)
        .reduce((sum, i) => sum + i.quantity, 0)
    },
    /** 全选：有商品且全部勾选 */
    isAllSelected(state) {
      if (state.cartItems.length === 0) return false
      return state.cartItems.every((i) => i.checked)
    },
  },

  actions: {
    /** 在 mounted 中调用：从 LocalStorage 恢复购物车 */
    loadFromStorage() {
      this.cartItems = loadCart()
    },

    /** 添加：已在购物车则数量+1（受库存限制），否则新项数量为 1 */
    addToCart(product) {
      const found = this.cartItems.find((i) => i.id === product.id)
      if (found) {
        if (found.quantity >= found.stock) {
          alert('该商品库存不足，无法继续增加数量')
          return
        }
        found.quantity += 1
        return
      }
      if (product.stock < 1) {
        alert('该商品暂无库存')
        return
      }
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        quantity: 1,
        checked: true,
      })
    },

    incrementQty(id) {
      const item = this.cartItems.find((i) => i.id === id)
      if (!item) return
      if (item.quantity >= item.stock) {
        alert('已达到库存上限')
        return
      }
      item.quantity += 1
    },

    /** 数量 -1；数量为 1 时由 UI 禁用「−」，移除请用 removeFromCart */
    decrementQty(id) {
      const item = this.cartItems.find((i) => i.id === id)
      if (!item || item.quantity <= 1) return
      item.quantity -= 1
    },

    /** 按 ID 从购物车数组移除 */
    removeFromCart(id) {
      const idx = this.cartItems.findIndex((i) => i.id === id)
      if (idx !== -1) this.cartItems.splice(idx, 1)
    },

    setItemChecked(id, checked) {
      const item = this.cartItems.find((i) => i.id === id)
      if (item) item.checked = checked
    },

    setAllChecked(checked) {
      this.cartItems.forEach((i) => {
        i.checked = checked
      })
    },

    /** 直接设置数量（输入框校验后） */
    setQuantity(id, value) {
      const item = this.cartItems.find((i) => i.id === id)
      if (!item) return
      const n = parseInt(String(value), 10)
      if (Number.isNaN(n) || n < 1) {
        alert('请输入不小于 1 的整数')
        return
      }
      if (n > item.stock) {
        alert(`数量不能超过库存（${item.stock}）`)
        return
      }
      item.quantity = n
    },
  },
})
