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
    <van-cell
      v-for="item in musicList"
      :title="item.music_name"
      icon="music"
      :key="item.id"
      ref="scroll"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-icon @click="handleLove" name="like-o" class="icon" />
      <van-icon name="play-circle-o" class="icon" @click="handlePlay(item.music_name)" />
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
export default {
  data() {
    return {
      searchValue: "",
      musicList: [],
      offsetTop: 0
    };
  },
  watch: {},
  created() {
    this.getUser();
  },
  methods: {
    onSearch() {},
    getUser() {
      var that = this;
      this.$api.music
        .getMusicList()
        .then(res => {
          that.musicList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleLove(e) {
      console.log(e.path[2].outerText.toString());
    },
    handlePlay(item) {
      console.log("play: " + item);
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
</style>