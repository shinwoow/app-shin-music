<template>
  <section>
    <div class="bar">
      <div>歌曲名</div>
      <div>
        <i class="fa fa-backward fa-1g" @click="handleBefore"></i>&nbsp;
        <i class="fa fa-play fa-1g" v-show="!playing" @click="handlePlay"></i>
        <i class="fa fa-pause fa-1g" v-show="playing" @click="handlePlay"></i>
        <i class="fa fa-forward fa-1g" @click="handleLast"></i>&nbsp;
        <i class="fa fa-compress fa-1g" @click="changeBar"></i>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      playing: state => state.music.playing,
      top: state => state.bar.top,
      left: state => state.bar.left
    })
  },
  mounted() {
    //调整bar的位置
    let el = document.getElementsByClassName("bar")[0];
    el.style.top =
      (this.top >
      getComputedStyle(el, null)
        .getPropertyValue("height")
        .split("p")[0] /
        2
        ? this.top <
          document.documentElement.clientHeight -
            getComputedStyle(el, null)
              .getPropertyValue("height")
              .split("p")[0] /
              2
          ? this.top -
            getComputedStyle(el, null)
              .getPropertyValue("height")
              .split("p")[0] /
              2
          : document.documentElement.clientHeight -
            getComputedStyle(el, null)
              .getPropertyValue("height")
              .split("p")[0]
        : 0) + "px";
    el.style.left =
      (this.left >
      getComputedStyle(el, null)
        .getPropertyValue("width")
        .split("p")[0] /
        2
        ? this.left <
          document.documentElement.clientWidth -
            getComputedStyle(el, null)
              .getPropertyValue("width")
              .split("p")[0] /
              2
          ? this.left -
            getComputedStyle(el, null)
              .getPropertyValue("width")
              .split("p")[0] /
              2
          : document.documentElement.clientWidth -
            getComputedStyle(el, null)
              .getPropertyValue("width")
              .split("p")[0]
        : 0) + "px";
  },
  methods: {
    handlePlay() {
      this.playing ? this.pause() : this.play();
    },
    handleLast() {},
    handleBefore() {},
    handleSize() {},
    ...mapMutations(["play", "pause", "changeBar"])
  },
  beforeDestroy() {}
};
</script>
<style lang="less" scoped>
.bar {
  position: absolute;
  z-index: 999;
  height: 50px;
  width: 177px;
  text-align: center;
  border: 1px #e16b8c solid;
  border-radius: 10px;
  background-color: #dc9fb4;
}

i {
  width: 22px;
  text-align: center;
}
</style>