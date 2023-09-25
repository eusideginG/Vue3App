import { defineStore } from 'pinia'

export const useFilterStore = defineStore({
  id: "filterFunction",
  state: () => ({
    filterListState: [],
  }),
  actions: {
    pushFilterList(filterName) {
      if (!this.filterListState.includes(filterName)) {
        this.filterListState.push(filterName);
      }
    },
    removeFilterList(filterName) {
      if (this.filterListState.includes(filterName)) {
        this.filterListState = this.filterListState.filter((item) => item !== filterName);
      }
    },
  },
  getters: {

  }
})

export const useQuanStore = defineStore({
  id: "QuantityFunction",
  state: () => ({
    quanListState: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    priceListState: [15.99, 10.99, 12.99, 9.99, 7.99, 8.99, 14.99, 18.99, 11.99, 16.99],
  }),
  actions: {
    quanPriceChange(id, quan, price) {
      this.quanListState[id - 1] = quan;
      this.priceListState[id - 1] = ((quan * (price * 1000)) / 1000).toFixed(2);
    },
    getSingleOrder(id) {
      return [this.quanListState[id - 1], this.priceListState[id - 1]]
    },
    getSingleTotal(id) {
      return this.priceListState[id - 1]
    },
    resetQuanAndPirce(id, price) {
      this.quanListState[id - 1] = 1
      this.priceListState[id - 1] = price
    }
  },
})

export const useCartStore = defineStore("CartFunction", {
  state: () => ({
    cart: []
  }),
  actions: {
    pushToCart(id, name, quan, totalPricePerFood) {
      this.cart.push({
        id: id,
        name: name,
        quan: quan,
        price: totalPricePerFood
      })
      this.getGrandTotal()
    },
    removeFromCart(id) {
      const dish = this.cart.filter(item => item.id === id)
      let quan = dish.map(item => item.quan)
      let price = dish.map(item => item.price)
      quan = quan[0]
      price = Number(price[0])
      price = ((price * 1000) / (quan * 1000))

      this.cart = this.cart.filter(item => item.id !== id)
      const quanStore = useQuanStore()
      quanStore.resetQuanAndPirce(id, price)
      this.getGrandTotal()
    },
    getGrandTotal() {
      let grandTotal = 0;
      this.cart.map((item) => grandTotal += Number(item.price))
      return grandTotal.toFixed(2)
    }
  }
})
