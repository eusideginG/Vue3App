<script setup>
import { useRoute } from "vue-router"
import ConfirmOrderLayout from '../components/confirmOrderLayout.vue';

const route = useRoute();

const id = Number(route.params.id);

</script>

<template>
    <div class="orderWrapper w-full flex flex-col justify-start">
      <h1 class="w-full text-center text-3xl h-fit">Confirm Order</h1>
      <ConfirmOrderLayout :id="id"/>
    </div>
</template>
  
<style scoped>

</style>
  