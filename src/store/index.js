import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
  },
  mutations: {
    addItem(state, item) {
      // ensure item doesn't exist already, otherwise edits/removals
      // won't work as expected
      if (state.items.indexOf(item) === -1)
        state.items.push(item);
    },
    editItem(state, data) {
      // ensure item doesn't exist already
      if (state.items.indexOf(data.new) === -1)
        Vue.set(state.items, state.items.indexOf(data.old), data.new);
    },
    removeItem(state, data) {
      state.items.splice(state.items.indexOf(data), 1);
    }
  },
})
