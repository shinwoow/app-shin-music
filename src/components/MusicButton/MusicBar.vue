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
  created() {
    console.log(this.top);
    if (this.top != -1 || this.left != -1) {
      let el = document.getElementsByClassName("bar")[0];
      // el.style.top = this.top;
      // el.style.left = this.left;
    }
  },
  methods: {
    handlePlay() {
      this.playing ? this.pause() : this.play();
    },
    handleLast() {},
    handleBefore() {},
    handleSize() {},
    ...mapMutations(["play", "pause", "changeBar", "setTop", "setLeft"])
  },
  beforeDestroy() {
    
  }
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