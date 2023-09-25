<script setup>
import { useQuanStore, useCartStore } from '@/stores/appState.js'
import { useToast } from "vue-toastification";

const orderStore = useQuanStore()
const cartStore = useCartStore()

const toast = useToast();

const props = defineProps({
    id: {type: Number, default: 0, required: true},
    dishName: {type: String, default: "", required: true},
    quan: {type: Number, default: 1, required: true}
});

const removeOrderItem = (id) => {
  cartStore.removeFromCart(id)

  toast.warning("Dish removed", {
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


</script>

<template>
  <div class="cartWrapper bg-stone-700 w-full p-2 mt-5 rounded-xl grid place-items-center">
    <span class="amount justify-self-start">Dish:</span>
    <span class="num justify-self-start">{{ quan }}</span>
    <span class="name">{{ props.dishName }}</span>
    <span class="total">Total: {{ orderStore.getSingleTotal(props.id) }}€</span>
    <span class="justify-self-end bg-rose-950 rounded-lg px-2 my-2 border"><button @click="removeOrderItem(props.id)">Remove</button></span>
  </div>
</template>
  
<style scoped>
  .cartWrapper {
    grid-template-areas: 
    "amount num name price remove";
  }
</style>
  