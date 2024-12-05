interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: {
    url: string
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    total: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },

  actions: {
    addItem(item: CartItem) {
      const existingItem = this.items.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        this.items.push(item)
      }
    },

    removeItem(item: CartItem) {
      const index = this.items.findIndex(i => i.id === item.id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    clearCart() {
      this.items = []
    }
  }
})