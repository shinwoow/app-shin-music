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
  /**
   * 切换悬浮窗
   */
  changeBar(state) {
    state.showBar = !state.showBar;
  },

  /**
   * 设置悬浮窗上边距
   * @param {Number} item 边距值
   */
  setTop(state, item) {
    state.top = item;
  },

  /**
   * 设置悬浮窗左边距
   * @param {Number} item 边距值
   */
  setLeft(state, item) {
    state.left = item;
  }
}

/**
 * 导出当前store
 */
export default {
  state,
  getters,
  actions,
  mutations
}
