/**
 * 音乐相关状态
 */
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
  getMusicList(state) {
    return state.musicList;
  }
}

// actions
const actions = {
  /**
   * 更新歌曲列表
   */
  updateMusicList({
    commit
  }, items) {
    commit('updateMusicList', items);
  },
  /**
   * 下一曲
   */
  setAfter({
    commit,
    state
  }) {
    commit('setAudio', state.musicList[state.currentMusic.index + 1 >= state.musicList.length ? 0 : state.currentMusic.index + 1]);
    commit('play');
  },
  /**
   * 上一曲
   */
  setBefore({
    commit,
    state
  }) {
    commit('setAudio', state.musicList[state.currentMusic.index - 1 < 0 ? state.musicList.length - 1 : state.currentMusic.index - 1]);
    commit('play');

  }
}

// mutations
const mutations = {
  /**
   * 获取音乐列表
   * @param {Array} items 音乐列表
   */
  updateMusicList(state,
    items
  ) {
    state.musicList.push(...items);
  },

  /**
   * 音乐播放
   */
  play(state) {
    audio.play();
    state.time = audio.duration;
    state.playing = true;
  },

  /**
   * 音乐暂停
   */
  pause(state) {
    audio.pause();
    state.playing = false;

  },

  /**
   * 设置当前播放歌曲信心
   * @param {Object} item 新歌曲信息
   */
  setAudio(state, item) {
    if (!!item) {
      state.currentMusic.music_name = item.music_name;
      state.currentMusic.music_path = item.music_path;
      state.currentMusic.index = item.ID - 1;
      audio.src = item.music_path;
      localStorage.setItem('currentMusic', JSON.stringify(state.currentMusic));
    // } else if (localStorage.getItem('currentMusic')) {
    //   console.log('get localstroge')
    //   state.currentMusic = localStorage.getItem('currentMusic');
    //   audio.src = state.currentMusic.music_path;
    // } else {
    //   state.currentMusic = state.musicList[0];
    //   console.log(state.currentMusic)
    //   audio.src = state.currentMusic.music_path;
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
