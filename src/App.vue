<template>
  <div id="app" class="font-sans mx-auto max-w-md">
    <h1 class="text-center font-bold text-xl">A simple shopping list</h1>
    <div class="space-y-2 p-4">
      <Item v-for="(item, index) in items" :key="index" :item="item" />
      <NewItem />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Item from './components/Item.vue';
import NewItem from './components/NewItem.vue';

export default {
  name: 'App',

  components: {
    Item,
    NewItem,
  },

  computed: mapState([
    'items'
  ])
}
</script>
