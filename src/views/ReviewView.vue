<script setup>
import { ref } from 'vue'
import { useToast } from "vue-toastification";
import { RouterLink } from 'vue-router'

const reviewInput = ref("")

const toast = useToast();

const submit = () => {
    const JsonReview = {}
    JsonReview.table = "table 1"
    JsonReview.review = reviewInput.value

    toast.success("Review submited", {
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
    <div class="reviewWrapper w-full flex flex-col justify-center items-center">
        <h1 class="title mt-1">Thank You for Being Our Valued Customer</h1>
        <div>Your opinion matters, share it with us</div>
        <div class="w-full flex items-center justify-center mt-2">
            <textarea class="w-full rounded-md bg-stone-700 p-2" rows="10" v-model="reviewInput"></textarea>
        </div>
        <router-link :to="{name: 'dishes'}" class="self-end"><button id="submitReview" class="bg-rose-950 px-2 rounded-md mt-2" @click="submit()">Submit</button></router-link>
    </div>
</template>

<style scoped>
    .title {
        font-size: 2rem;
    }
    @media (max-width: 900px) {
        .title {
            font-size: 1rem;
        }
    }
</style>