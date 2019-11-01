<template>
  <section>
    <button @click="handlePlay">播放</button>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      musicList: ["http://127.0.0.1:3000/mp3/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.mp3", "http://cloud.hunger-valley.com/music/玫瑰.mp3"],
      palyStatu: false
    };
  },
  computed: {
    ...mapState({
      playing: state => state.music.playing
    })
  },
  created() {
    console.log("playing:" + this.playing);
    this.$store.dispatch("updateMusicList", this.musicList);
    this.setSrc(this.musicList[0]);
  },
  methods: {
    handlePlay() {
      let audio = document.getElementById("music");
      if (!this.playing) {
        this.play();
      } else {
        this.pause();
      }
    },
    ...mapMutations(["play", "pause", "setSrc"])
  }
};
</script>
<style lang="less" scoped>
</style>