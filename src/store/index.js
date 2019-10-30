import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import music from './modules/music'
import bar from './modules/bar'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    music,
    bar
  },
  strict: debug,
  plugins: debug ? [] : []
})
