<script setup>
import { useRoute } from "vue-router"
import DishLayout from '../components/dishLayout.vue'
import data from '../../db.json'

const route = useRoute();

const dish = data.dishes[route.params.id - 1]; // all dishes

</script>

<template>
  <div class="dishWrapper flex flex-wrap w-full justify-center">
    <DishLayout :id="dish.id" :dishName="dish.name" :dishDesc="dish.description" :dishPrice="dish.price" :dishImage="dish.image" :dishIngredients="dish.ingredients" :dishTags="dish.tags"/>
  </div>
</template>

<style scoped>

</style>