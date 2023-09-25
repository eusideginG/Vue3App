<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router'
import { useToast } from "vue-toastification";
import { useQuanStore, useCartStore } from '@/stores/appState.js'

const quanStore = useQuanStore()
const cartStore = useCartStore()

const toast = useToast();

const props = defineProps({
    id: {type: Number, default: 0, required: true},
    dishName: {type: String, default: "", required: true},
    dishDesc: {type: String, default: "", required: true},
    dishPrice: {type: Number, default: 0, required: true},
    dishImage: {type: String, default: "", required: true},
    dishTags: {type: Object, default: () => {}, required: true},
});

const checkCart = (id, name, quan, price) => {
    if(cartStore.cart.filter(item => item.id === id).length === 0) {
        cartStore.pushToCart(id, name, quan, price)

        toast.success("Dish added", {
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
    } else {
        cartStore.cart.filter((item, index) => {
            if(item.id === id){
                if(item.price != price) {
                    cartStore.cart[index] = { id: id, name: name, quan: quan, price: price }
                } else {
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
            }
        })
    }
}
</script>

<template>
    <div class="dishItemWrapper grid place-items-center w-3/4 text-center bg-stone-700 p-1 px-2 my-2 font-serif">
        <router-link :to="{name: 'dish', params: {id: props.id}}" class="openDishBtn z-10 text-center self-start justify-self-end"><button class="openDishBtn z-10 bg-transparent rounded-full border-4 font-black text-center self-start justify-self-end border-rose-950 text-rose-950 text-3xl hover:border-rose-900 hover:text-rose-900 hover:bg-transparent">!</button></router-link>
        <img class="dishImage my-1 max-w-full h-auto rounded-md" v-bind:src="props.dishImage"/>
        <div class="dishName my-1 font-extrabold text-lg self-center justify-self-start">{{ props.dishName }}</div>
        <div class="dishDesc my-1 border rounded-md bg-rose-950 overflow-auto text-left p-1">{{ props.dishDesc }}</div>
        <div class="dishQuan my-1"><input class="quanInput p-1 text-rose-50 bg-rose-950 text-center border rounded" type="number" min="1" max="20" @change="quanStore.quanPriceChange(props.id, quanStore.quanListState[props.id - 1], props.dishPrice)" v-model="quanStore.quanListState[props.id - 1]"/></div>
        <div class="dishPrice my-1 font-bold">{{ quanStore.priceListState[props.id - 1] }} €</div>
        <div class="dishCart my-1 w-full"><button class="cartButton bg-rose-950 w-full border rounded-l-2xl" @click="checkCart(props.id, props.dishName, quanStore.getSingleOrder(props.id)[0], quanStore.getSingleOrder(props.id)[1])">Cart</button></div>
        <div class="dishBuy my-1 w-full"><router-link :to="{name: 'order', params: {id: props.id}}"><button class="buyButton bg-rose-950 w-full border rounded-r-2xl">Order</button></router-link></div>
    </div>
</template>

<style scoped>
.dishItemWrapper {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
    "image image"
    "name name"
    "desc desc"
    "quantity price"
    "cart buy";
}
.dishImage {
    grid-area: image;
}
.dishName {
    grid-area: name;
}
.dishDesc {
    grid-area: desc;
    max-height: 15vh;
}
.dishQuan {
    grid-area: quantity;
}
.dishPrice {
    grid-area: price;
}
.dishCart {
    grid-area: cart;
}
.dishBuy {
    grid-area: buy;
}
.quanInput {
    max-width: 10vw;
}
.cartButton, .buyButton {
    min-height: 5vh;
}
.openDishBtn {
    grid-area: image;
    width: 4vw;
    height: 4vw;
}
@media (max-width: 900px) {
    .openDishBtn {
        width: 8vw;
        height: 8vw;
        margin-top: 0.5rem;
        margin-right: 0.5rem;
    }
}
</style>