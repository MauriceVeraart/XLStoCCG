import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  selected: {},
  raw: {},
  conState: false,
  update: new Date().getTime(),
  filename: ''
}

const mutations = {
  changeStuff (state, x) {
    state[x.tochange] = x.change
  },
  changeArr (state, x) {
    Vue.set(state[x.tochange], x.index, x.change)
    // state[x.tochange][x.index] = x.change
  }
}

const actions = {
}

const getters = {
  updateChange: state => {
    return state.update
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters/* ,
    plugins: [vuexLocalStorage.plugin] */
})
