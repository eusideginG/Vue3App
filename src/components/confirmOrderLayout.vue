<script setup>
import { useQuanStore } from '@/stores/appState.js'
import data from '../../db.json'
import { useToast } from "vue-toastification";

const orderStore = useQuanStore()

const toast = useToast();

const dishes = data.dishes; // all dishes
const prices = {}
dishes.map(item => prices[item.id] = [item.name, item.price]) // get prices

const props = defineProps({
    id: {type: Number, default: 0, required: true},
});

const jsonOrder = {}
const submitOrder = () => {
    const order = {}

    order.name = prices[props.id][0]
    order.amount = orderStore.quanListState[props.id - 1]
    order.totalPrice = orderStore.getSingleTotal(props.id)

    jsonOrder.table = "table 1"
    jsonOrder.order = order

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

</script>

<template>
  <div class="confirmWrapper bg-stone-700 w-full p-2 mt-5 rounded-xl grid place-items-center">
    <span class="amount justify-self-start">Amount: <input class="quanInput p-1 text-rose-50 bg-rose-950 text-center border rounded" type="number" min="1" max="20" @change="orderStore.quanPriceChange(props.id, orderStore.quanListState[props.id - 1], prices[props.id][1])" v-model="orderStore.quanListState[props.id - 1]"/></span>
    <span class="name">{{ prices[props.id][0] }}</span>
    <span class="total justify-self-end">Total: {{ orderStore.getSingleTotal(props.id) }}€</span>
    <router-link :to="{name: 'review'}" class="orderBtn justify-self-end"><button class="orderBtn bg-rose-950 rounded-lg px-2 my-2 border" @click="submitOrder">Place Order</button></router-link>
  </div>
</template>

<style scoped>
.confirmWrapper {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
    "amount name total"
    "btn btn btn";
    height: 30vh;
    font-size: 1.5rem;
}
.amount {
    grid-area: amount;
}
.name {
    grid-area: name;
}
.total {
    grid-area: total;
}
.orderBtn {
    grid-area: btn;
}
@media (max-width: 900px) {
    .confirmWrapper {
        font-size: 1rem;
    }
}
</style>