<template>
  <section>
    <!-- 顶部搜索栏 -->
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <!--music list-->
    <!-- icon="music" -->
    <van-cell
      v-for="item in musicList"
      :title="item.music_name"
      :key="item.ID"
      ref="scroll"
      :class="{'played': playing && (currentIndex == item.ID - 1)}"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-icon @click="handleLove" name="like-o" class="icon" />
      <van-icon
        name="play-circle-o"
        v-show="(!playing) || (playing && currentIndex !== item.ID - 1)"
        class="icon"
        @click="handlePlay(item)"
      />
      <van-icon
        name="pause-circle-o"
        v-show="playing && (currentIndex == item.ID - 1)"
        class="icon"
        @click="handlePause"
      />
      <van-icon
        slot="right-icon"
        name="add-o"
        class="icon"
        @click="handlePlayList(item.music_name)"
      />
    </van-cell>
    <br />
    <br />
  </section>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      searchValue: "",
      musicList: [],
      offsetTop: 0
    };
  },
  computed: {
    ...mapState({
      playing: state => state.music.playing,
      currentIndex: state => state.music.currentMusic.index
    })
  },
  created() {
    this.getMusicList();
  },
  methods: {
    ...mapMutations(["play", "pause", "setAudio", "updateMusicList"]),
    onSearch() {},
    getMusicList() {
      var that = this;
      this.$api.music
        .getMusicList()
        .then(res => {
          that.updateMusicList(res.data);
          that.musicList = that.$store.getters.getMusicList;
        })
        .catch(err => {
          console.log(err);
        });
      this.setAudio();
    },
    handleLove(e) {
      console.log(e.path[2].outerText.toString());
    },
    handlePlay(item) {
      this.setAudio(item);
      this.play();
    },
    handlePause() {
      this.pause();
    },
    handlePlayList(item) {
      console.log("list: " + item);
    }
  },
  activated() {
    // keep-alive组件 页面进入的时候设置滚动高度
    // this.$refs["scroll"].scrollTop = this.offsetTop;
    if (this.$refs["scroll"]) {
      document.documentElement.scrollTop = this.offsetTop;
    }
  },

  beforeRouteLeave(to, from, next) {
    // 组件离开的时候，获取页面滚动高度
    // this.offsetTop = this.$refs["scroll"].scrollTop;
    this.offsetTop = document.documentElement.scrollTop;
    next();
  }
};
</script>
<style lang="less" scoped>
.icon {
  line-height: inherit;
  width: 30px;
  text-align: center;
}
.played {
  background-color: #ebecee;
}
</style>