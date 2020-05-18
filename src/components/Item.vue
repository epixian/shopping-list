<template>
  <div class="flex items-center" :class="{ 'animate__animated animate__headShake': rejected }">

    <!-- Item name / inputs -->
    <div v-if="removing" class="flex-1 font-medium p-2 sm:text-sm sm:leading-5 text-red-500">
      Remove {{ myItem }}?
    </div>

    <div v-else class="flex-1">
      <span v-if="editing" class="rounded-md shadow-sm">
        <input v-on:keyup.enter="saveItem" v-model="myItem" class="form-input block w-full sm:text-sm sm:leading-5" placeholder="Item name" />
      </span>
      <span v-else @dblclick="editItem" class="block font-medium p-2 sm:text-sm sm:leading-5">
        {{ myItem }}
      </span>
    </div>

    <!-- Buttons -->
    <div>
      <div v-if="removing" class="space-x-2 ml-2">
        <button @click="removeItemConfirmed" type="button" class="inline-flex items-center text-gray-700 shover:text-gray-500 focus:outline-none active:text-gray-800 transition ease-in-out duration-150">
          <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
        </button>
        <button @click="removing = false" type="button" class="inline-flex items-center text-gray-700 shover:text-gray-500 focus:outline-none active:text-gray-800 transition ease-in-out duration-150">
          <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div v-else class="ml-2">
        <div v-if="editing" class="space-x-2">
          <button @click="saveItem" type="button" class="inline-flex items-center text-gray-700 shover:text-gray-500 focus:outline-none active:text-gray-800 transition ease-in-out duration-150">
            <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
          </button>
          <button @click="cancelEditing" type="button" class="inline-flex items-center text-gray-700 shover:text-gray-500 focus:outline-none active:text-gray-800 transition ease-in-out duration-150">
            <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div v-else class="space-x-2">
          <button @click="editItem" type="button" class="inline-flex items-center text-gray-700 shover:text-gray-500 focus:outline-none active:text-gray-800 transition ease-in-out duration-150">
            <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          </button>
          <button @click="removeItem" type="button" class="inline-flex items-center text-gray-700 shover:text-gray-500 focus:outline-none active:text-gray-800 transition ease-in-out duration-150">
            <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: ['item'],
  data() {
    return {
      myItem: '',
      originalItem: '',
      editing: false,
      removing: false,
      rejected: false,
    }
  },
  watch: {
    item: function(item) {
      // watch props for changes and update myItem as needed
      this.myItem = item;
    }
  },
  methods: {
    editItem() {
      this.originalItem = this.myItem;
      this.editing = true;
    },
    cancelEditing() {
      this.myItem = this.originalItem;
      this.editing = false;
    },
    saveItem() {
      this.myItem = this.myItem.trim();
      if (this.myItem !== '' && this.$store.state.items.indexOf(this.myItem) === -1) {
        this.editing = false;
        this.$store.commit('editItem', { old: this.originalItem, new: this.myItem });
        // reset myItem to the passed-in prop item in case the edit was rejected
        this.myItem = this.item;
      }
      else {
        this.rejectInput();
        this.myItem = this.originalItem;
      }
    },
    removeItem() {
      this.removing = true;
    },
    removeItemConfirmed() {
      this.$store.commit('removeItem', this.myItem);
      this.removing = false;
    },
    rejectInput() {
      this.rejected = true;
      setTimeout(() => {
        this.rejected = false;
      }, 500);
    }
  },
  created() {
    this.myItem = this.item;
  }
}
</script>
