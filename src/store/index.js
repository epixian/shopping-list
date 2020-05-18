import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item);
    },
    editItem(state, data) {
      Vue.set(state.items, state.items.indexOf(data.old), data.new);
    },
    removeItem(state, data) {
      state.items.splice(state.items.indexOf(data), 1);
    }
  },
})
