<template>
  <div id="app">
    <transition name="fade">
      <music-bar v-if="showBar" />
      <music-button v-if="!showBar" />
    </transition>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import MusicButton from "cmpts/MusicButton/MusicButton";
import MusicBar from "cmpts/MusicButton/MusicBar";
export default {
  name: "App",
  components: { MusicButton, MusicBar },
  computed: {
    ...mapState({
      showBar: state => state.bar.showBar
    })
  }
};
</script>

<style lang="less" scoped>
@import "./style/reset.less";
</style>
