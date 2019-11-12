<template>
  <section>
    <div class="bar">
      <div>歌曲名</div>
      <div>
        <i class="fa fa-backward fa-1g" @click="handleBefore"></i>&nbsp;
        <i class="fa fa-play fa-1g" v-show="!playing" @click="handlePlay"></i>
        <i class="fa fa-pause fa-1g" v-show="playing" @click="handlePlay"></i>
        <i class="fa fa-forward fa-1g" @click="handleAfter"></i>&nbsp;
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
    //调整bar的位置不超出屏幕
    let el = document.getElementsByClassName("bar")[0];
    let clientH = this.getStyle(el, "height");
    let clientW = this.getStyle(el, "width");
    let h = document.documentElement.clientHeight;
    let w = document.documentElement.clientWidth;

    el.style.top =
      (this.top > clientH / 2
        ? this.top < h - clientH / 2
          ? this.top - clientH / 2
          : h - clientH
        : 0) + "px";
    el.style.left =
      (this.left > clientW / 2
        ? this.left < w - clientW / 2
          ? this.left - clientW / 2
          : w - clientW
        : 0) + "px";
  },
  methods: {
    handlePlay() {
      this.playing ? this.pause() : this.play();
    },
    handleAfter() {
      this.$store.dispatch("setAfter");
    },
    handleBefore() {
      this.$store.dispatch("setBefore");
    },
    handleSize() {},
    getStyle(el, position) {
      return parseInt(getComputedStyle(el, null).getPropertyValue(position));
    },
    ...mapMutations(["play", "pause", "changeBar"])
  },
  beforeDestroy() {}
};
</script>
<style lang="less" scoped>
.bar {
  position: fixed;
  z-index: 999;
  height: 50px;
  width: 180px;
  text-align: center;
  border: 1px #ff55dd solid;
  border-radius: 10px;
  background-color: #ff55dd;
}

i {
  width: 22px;
  text-align: center;
}
</style>