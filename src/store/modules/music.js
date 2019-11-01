const audio = new Audio();

const state = {
  musicList: [],
  currentMusic: {
    music_name: '',
    music_path: '',
    index: 0
  },
  playing: false,
  time: 0
}

// getters
const getters = {

}

// actions
const actions = {
  updateMusicList({
    commit
  }, items) {
    commit('updateMusicList', items);
  },
}

// mutations
const mutations = {
  updateMusicList(state,
    items
  ) {
    state.musicList.push(...items);
  },

  play(state) {
    console.log(audio.src)
    audio.play();
    state.time = audio.duration;
    state.playing = true;
  },
  pause(state) {
    console.log(audio.src)
    audio.pause();
    
    state.playing = false;

  },
  setAudio(state, item) {
    console.log(item)
    console.log(typeof item)
    if (typeof item == 'object') {
      state.currentMusic.music_name = item.music_name;
      state.currentMusic.music_path = item.music_path;
      state.currentMusic.index = item.id;
      audio.src = item.music_path;
    } else {
      audio.src = item
    }

  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
