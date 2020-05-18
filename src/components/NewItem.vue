<template>
  <div class="flex items-center">
    <span class="flex-1 rounded-md shadow-sm">
      <input v-on:keyup.enter="addItem" v-model="item" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Add an item" />
    </span>
    <button @click="addItem" type="button" class="ml-2 inline-flex items-center text-gray-700 shover:text-gray-500 focus:outline-none active:text-gray-800 transition ease-in-out duration-150">
      <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data() {
    return {
      item: '',
    }
  },
  methods: {
    addItem() {
      this.$store.commit('addItem', this.item);
      this.item = '';
    }
  }
}
</script>
