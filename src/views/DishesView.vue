<script setup>
import { ref } from 'vue'
import { useFilterStore } from '@/stores/appState.js'
import data from '../../db.json'
import DishesLayout from '../components/dishesLayout.vue';

const filterStore = useFilterStore()

const dishes = data.dishes; // all dishes

const filteredDishes = () => {
  if(!filterStore.filterListState.length > 0) { return dishes; }
  else {
    let filtered = [];
    for (let filter of filterStore.filterListState) {
      filter = filter.toLowerCase().replace(" ", "-");
    // check Dietary Preferences and Allergens filter
      // clear and return filtered dishes (dietaryPreferences)
      let cleanDishes = dishes.filter((dietTag) => dietTag.tags.dietaryPreferences !== undefined && dietTag.tags.dietaryPreferences.length > 0);
      cleanDishes = cleanDishes.filter((cleanD) => filter !== "vegan" ? cleanD.tags.dietaryPreferences.includes(filter) : (cleanD.tags.dietaryPreferences.includes("vegetarian") || cleanD.tags.dietaryPreferences.includes("vegan")))

      // clear and return filtered dishes (allergens)
      let cleanAllergens = dishes.filter((allTag) => allTag.tags.allergens !== undefined && allTag.tags.allergens.length > 0);
      cleanAllergens = cleanAllergens.filter((cleanA) => cleanA.tags.allergens.includes(filter))

      // clear and return filtered dishes (tags)
      let cleanRowTag = dishes.filter((rowTag) => rowTag.tags !== undefined && rowTag.tags.length > 0);
      cleanRowTag = cleanRowTag.filter((cleanR) => cleanR.tags.includes(filter))

    // check price filter
      // aply price filters
      let clearPrice = filter.match(/\d+/g)
      if (clearPrice != null) {
        if(clearPrice.length === 1) {
        if(clearPrice[0] == 10) {
          clearPrice = dishes.filter(item => item.price < clearPrice[0])
        } else {
          clearPrice = dishes.filter(item => item.price > clearPrice[0])
        }
        } else if(clearPrice.length === 2) {
          clearPrice = dishes.filter(item => item.price >= clearPrice[0] && item.price < clearPrice[1])
        }
        filtered.push(...clearPrice)
      }
    
      filtered.push(...cleanDishes, ...cleanAllergens, ...cleanRowTag)
      }
      filtered = [...new Set(filtered.map((item) => item))]
      return filtered
    }
}

const dietFilters = ref([
  ["Vegan", false],
  ["Gluten-Free", false],
  ["Lactose-Free", false],
  ["Nut-Free", false]
])

const priceFilters = ref([
  ["Under €10", false],
  ["€10 - €20", false],
  ["€20 - €30", false],
  ["€30 - €40", false],
  ["Over €40", false]
])

const allergyFilters = ref([
  ["Contains Nuts", false],
  ["Contains Gluten", false],
  ["Contains Lactose", false],
  ["Other Allergens", false],
  ["Allergen-Free", false]
])

var isFilterOpen = ref(false);
const openFilter = () => { isFilterOpen.value = !isFilterOpen.value; }

// single filter tag toggle and update filterListState
const toggleFilter = (filterArray, filterName) => {
  filterArray.filter((item) => item[0] === filterName)[0][1] = !filterArray.filter((item) => item[0] === filterName)[0][1];
  if (filterArray.filter((item) => item[0] === filterName)[0][1]) {
    filterStore.pushFilterList(filterName)
  } else {
    filterStore.removeFilterList(filterName)
  }
}

// single filter tag, one filter toggle for price and update filterListState
const toggleFilterPrice = (filterName) => {
  let index = priceFilters.value.map((item, i) => item.includes(true) ? i : false)
  index = index.filter((item) => typeof item === "number")[0]

  let j = priceFilters.value.map((item, i) => item[0] === filterName ? i : false)
  j = j.filter((item) => typeof item === "number")[0]

  let priceList = priceFilters.value.map(item => item[0])
  priceList = priceList.map(item => item.match(/\d+/g)+"")
  
  if (priceFilters.value.map((price) => price[1])) {
    if (index === j) {
      priceFilters.value.map((price) => price[1] = false)
      priceList.map(item => filterStore.removeFilterList(item))
    } else {
      priceFilters.value.map((price) => price[1] = false)
      priceList.map(item => filterStore.removeFilterList(item))
      priceFilters.value.filter((item) => item[0] === filterName)[0][1] = !priceFilters.value.filter((item) => item[0] === filterName)[0][1];
      filterStore.pushFilterList(filterName.match(/\d+/g)+"")
    }
  } else {
    priceFilters.value.filter((item) => item[0] === filterName)[0][1] = !priceFilters.value.filter((item) => item[0] === filterName)[0][1];
    filterStore.pushFilterList(filterName.match(/\d+/g)+"")
  }
}

</script>

<template>
    <header class="bg-stone-700 sticky top-0 border-b rounded-b-md z-50">
    <div class="headerWrapper">
      <span id="logo" class="float-left self-center text-center">YummyGreek</span>
      <span class="text-rose-950 text-3xl font-black self-center">MENU</span>
    </div>
  </header>
    <div class="filterWrapper sticky top-10 flex-col rounded-b-md border-b" :class="{toggleFilterVisibility: isFilterOpen}">
      <div class="closeFilterBtnWrapper"><button class="closeFilterBtn font-black ml-2 mt-5 text-rose-950 rounded-full text-center flex items-center justify-center" @click="openFilter">◂</button></div>
      <div class="filters text-center flex flex-wrap justify-around">
        <div class="dietFilter">
          <span>Dietary Preferences</span>
          <table class="border-spacing-y-1 border-separate">
            <tr class="bg-rose-950" :class="{activeFilter: dietFilter[1]}" v-for="(dietFilter, index) of dietFilters" :key="index" @click="toggleFilter(dietFilters, dietFilter[0])">{{ dietFilter[0] }}</tr>
          </table>
        </div>
        <div class="priceFilter">
          <span>Price Range</span>
          <table class="border-spacing-y-1 border-separate">
            <tr class="bg-rose-950" :class="{activeFilter: priceFilter[1]}" v-for="(priceFilter, index) of priceFilters" :key="index" @click="toggleFilterPrice(priceFilter[0])">{{ priceFilter[0] }}</tr>
          </table>
        </div>
        <div class="allergyFilter">
          <span>Allergens</span>
          <table class="border-spacing-y-1 border-separate">
            <tr class="bg-rose-950" :class="{activeFilter: allergyFilter[1]}" v-for="(allergyFilter, index) of allergyFilters" :key="index" @click="toggleFilter(allergyFilters, allergyFilter[0])">{{ allergyFilter[0] }}</tr>
          </table>
        </div>
      </div>
    </div>
  <main class="p-0 m-0">
    <div class="mainView flex flex-col flex-wrap content-center justify-center bg-indigo-950 w-full p-0">
      <DishesLayout class="rounded" v-for="dish of filteredDishes()" v-bind:key="dish.id" :id="dish.id" :dishName="dish.name" :dishDesc="dish.description" :dishPrice="dish.price" :dishImage="dish.image" :dishTags="dish.tags"/>
    </div>
  </main>
  <footer>
    <router-link :to="{name: 'cart'}"><button class="cartBtn bg-rose-950 text-xl rounded-full text-center fixed right-10 top-20" @click="openFilter">Cart</button></router-link>
    <button class="filterBtn bg-rose-950 text-xl rounded-full text-center fixed bottom-5 right-10 " @click="openFilter">Filter</button>
  </footer>
</template>
  
<style scoped>
header {
    width: 80vw;
    height: 8vh;
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: center;
    align-self: start;
  }
  .headerWrapper {
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    justify-content: space-between;
  }
  .filterWrapper {
    display: none;
    background-color: rgba(30, 30, 30, 0.9);
  }
  .closeFilterBtnWrapper {
    width: 80vw;
  }
  .closeFilterBtn {
    font-size: 2rem;
    width: 4vw;
    height: 4vw;
  }
  .filters {
    width: 80vw;
  }
  .toggleFilterVisibility {
    display: flex;
  }
  .dietFilter, .priceFilter, .allergyFilter {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 20vw;
  }
  .activeFilter {
    background-color: rgb(136 19 55);
    box-shadow: 0px 0px 10px 1px black ;
  }
  table {
    width: 20vw;
  }
  tr {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
    width: 20vw;
    height: 4vw;
    box-shadow: 0px 0px 10px 1px black inset;
  }
  tr:hover {
    cursor: pointer;
  }
  .mainView {
    width: 80vw;
    background-color: rgba(0, 0, 0, 0);
  }
  .cartBtn {
    width: 5vw;
    height: 5vw;
    right: 10vw;
  }
  .filterBtn {
    width: 5vw;
    height: 5vw;
    right: 10vw;
  }
  @media (max-width: 900px) {
    .cartBtn {
      font-size: 1rem;
      width: 8vw;
      height: 8vw;
    }
    .filterBtn {
      font-size: 1rem;
      width: 8vw;
      height: 8vw;
    }
    .dietFilter, .priceFilter, .allergyFilter {
      font-size: .80rem;
    }
    span {
      font-size: .75rem;
    }
  }
</style>
  