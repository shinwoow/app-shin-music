<template>
  <div id="app">
    <!-- <keep-alive> -->
    <music-bar v-show="showBar" />
    <music-button v-show="!showBar" />
    <!-- </keep-alive> -->
    <transition name="fade">
      <router-view />
    </transition>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
