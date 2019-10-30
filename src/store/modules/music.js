const audio = new Audio();

const state = {
  musicList: [],
  currentMusic: {
    name: '',
    index: 0
  },
  playing: false
}

// getters
const getters = {

}

// actions
const actions = {
  updateMusicList({
    commit
  }, items) {
    commit('updateMusicList', items)
  },
}

// mutations
const mutations = {
  updateMusicList(state,
    items
  ) {
    state.musicList.push(...items)
  },

  play(state) {
    audio.play();
    state.playing = true;
  },
  pause(state) {
    audio.pause();
    state.playing = false;
  },
  setSrc(state, item) {
    audio.src = item;
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
