<!--
  全局播放按键模块
  支持拖动、滑动手势
  点击切换形态
  长按可拖动模块位置
  左滑、右滑切换上下曲
  上滑
  下滑
-->
<template>
  <section class="music-button">
    <div class="content" ref="content" @click="changeBar"></div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      timeOutEvent: 0, //定时器
      /**
       * @param [touch事件切换] touchStatus [
       * @param 0:点击事件
       * @param 1:长按拖拽事件
       * @param 2:滑动事件
       * ]
       * **/
      touchStatus: 0,
      contentButton: false
    };
  },
  mounted() {
    this.TouchMove();
    console.log(this.top);
    let el = document.getElementsByClassName("music-button")[0];
    if (this.top != -1 || this.left != -1) {
      el.style.top = this.top + "px";
      el.style.left = this.left + "px";
    }
  },
  computed: {
    ...mapState({
      playing: state => state.music.playing,
      top: state => state.bar.top,
      left: state => state.bar.left
    })
  },
  methods: {
    ...mapMutations(["play", "pause", "changeBar", "setTop", "setLeft"]),
    /**
     * [TouchMove 监听touch事件]
     */
    TouchMove() {
      this.$refs["content"].addEventListener(
        "touchstart",
        this.handleTouchStart,
        false
      );
      this.$refs["content"].addEventListener(
        "touchmove",
        this.handleTouchMove,
        false
      );
      this.$refs["content"].addEventListener(
        "touchend",
        this.handleTouchtouchend,
        false
      );
    },

    /**
     * [handleTouchStart 记录Touch开始的Y轴数值]
     */
    handleTouchStart(event) {
      let that = this;
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(function() {
        //定义长按事件
        that.touchStatus = 1;
        console.log("long  touch，move the model");
      }, 555);
    },

    /**
     * [handleTouchMove 监听touchmove时Y轴的数值]
     */
    handleTouchMove(event) {
      let that = this;
      event.stopPropagation(); //阻止冒泡
      event.preventDefault(); //阻止默认行为
      clearTimeout(this.timeOutEvent);
      this.touchStatus = this.touchStatus == 0 ? 3 : this.touchStatus;

      if (this.touchStatus === 1) {
        that.moveButton(
          event.touches[0].clientX,
          event.touches[0].clientY,
          document.getElementsByClassName("music-button")[0]
        );
      }
    },

    handleTouchtouchend(event) {
      clearTimeout(this.timeOutEvent);
      if (this.touchStatus == 3)
        this.handleGesture(
          event.changedTouches[0].clientX - this.startX,
          event.changedTouches[0].clientY - this.startY
        );
      this.timeOutEvent = 0;
      this.touchStatus = 0;

      //获取并保存当前元素位置
      let el = document.getElementsByClassName("music-button")[0];
      this.setTop(
        getComputedStyle(el, null)
          .getPropertyValue("top")
          .split("p")[0]
      );
      this.setLeft(
        getComputedStyle(el, null)
          .getPropertyValue("left")
          .split("p")[0]
      );
      console.log(
        getComputedStyle(el, null)
          .getPropertyValue("width")
          .split("p")[0]
      );
    },

    /**
     * [移动MusicButton]
     * @param [Number] targetX [按钮移动的最终x坐标]
     * @param [Number] targetY [按钮移动的最终y坐标]
     * @param [Object] el [需要移动的按键]
     * 限制悬浮球的位置不能超过边界
     * **/
    moveButton(targetX, targetY, el) {
      var that = this;
      console.log(
        getComputedStyle(el, null)
          .getPropertyValue("height")
          .split("p")[0]
          .split("p")[0]
      );
      el.style.top =
        (targetY >
        getComputedStyle(el, null)
          .getPropertyValue("height")
          .split("p")[0] /
          2
          ? targetY <
            document.documentElement.clientHeight -
              getComputedStyle(el, null)
                .getPropertyValue("height")
                .split("p")[0] /
                2
            ? targetY -
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
        (targetX >
        getComputedStyle(el, null)
          .getPropertyValue("width")
          .split("p")[0] /
          2
          ? targetX <
            document.documentElement.clientWidth -
              getComputedStyle(el, null)
                .getPropertyValue("width")
                .split("p")[0] /
                2
            ? targetX -
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

    /**
     * [手势处理]
     * @param [Number] directionX [x轴移动距离]
     * @param [Number] directionY [y轴移动距离]
     * **/
    handleGesture(directionX, directionY) {
      let angle = (Math.atan2(directionY, directionX) * 180) / Math.PI;
      console.log(angle);
      let gesture =
        angle < 30 && angle > -30
          ? 1
          : angle > 60 && angle < 120
          ? 2
          : angle < -60 && angle > -120
          ? 0
          : angle > 120 || angle < -120
          ? 3
          : 4;
      switch (gesture) {
        case 0:
          console.log("up");
          this.$store.dispatch("music/updateMusicList", [1, 2, 3]);
          break;
        case 1:
          console.log("right");
          this.play();
          break;
        case 2:
          console.log("down");
          console.log(this.$store.getters["music/getMusicList"]);
          break;
        case 3:
          this.pause();
          console.log("left");
          break;
        case 4:
          console.log("err");
          break;
        default:
          console.log("error");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.music-button {
  position: fixed;
  top: 500px;
  left: 292px;
  border: solid 1px #ff55dd;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  color: #ff55dd;
  background-color: #ff55dd;
  opacity: 0.7;
  text-align: center;
  font-size: 15px;
  overflow: hidden;
  z-index: 999;
}

.content {
  height: 100%;
  width: 100%;
}

.play {
  height: 100%;
  width: 100%;
  background-color: #ff0033;
  opacity: 0.7;
}
</style>