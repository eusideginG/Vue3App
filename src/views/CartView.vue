<script setup>
import CartItem from '../components/cartItem.vue'
import { useCartStore } from '@/stores/appState.js'
import { useToast } from "vue-toastification";
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const toast = useToast();

const cartStore = useCartStore()

let jsonOrder = {}
const submitOrder = () => {
  jsonOrder.table = "table 1"
  jsonOrder.order = cartStore.cart

  toast.success("Your order is on the way", {
  position: "top-right",
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
});
}

let isBtnActive = ref(!Object.values(cartStore.cart).length > 0);

</script>

<template>
    <div class="cartWrapper bg-stone-700 w-full p-2 mt-5 rounded-xl flex flex-col justify-center items-center">
      <h1 class="cartTitle">Cart</h1>
      <CartItem v-for="cartItem of cartStore.cart" v-bind:key="cartItem.id" :id="cartItem.id" :dishName="cartItem.name" :quan="cartItem.quan" :price="cartItem.price" />
      <span class="self-end">{{ cartStore.getGrandTotal() }}€</span>
      <router-link :to="{name: 'review'}" class="self-end" :class="{active: isBtnActive}"><button  class="orderBtn bg-rose-950 rounded-lg px-2 my-2 border" @click="submitOrder" :disabled="isBtnActive.value">Place Order</button></router-link>
    </div>
</template>
  
<style scoped>
  .cartTitle {
    font-size: 2rem;
  }
  .orderBtn {
    width: 20vw;
  }
  .active {
    pointer-events: none;
  }
</style>
  