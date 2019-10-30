/**
 * store of the music bar statu
 */
const state = {
  showBar: false,
  top: -1,
  left: -1
}
const getters = {}
const actions = {}
const mutations = {
  changeBar(state) {
    state.showBar = !state.showBar;
  },
  setTop(state, item) {
    state.top = item;
  },
  setLeft(state, item) {
    state.left = item;
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
