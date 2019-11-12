<template>
  <section>
    <!-- 内容显示区域 -->
    <keep-alive>
      <router-view />
    </keep-alive>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active">
      <van-tabbar-item name="Home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item name="Search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item name="UploadMusic" icon="friends-o">上传</van-tabbar-item>
      <van-tabbar-item name="Setting" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      active: "Home"
    };
  },
  watch: {
    active: function(newV, oldV) {
      this.$router.push({
        name: newV
      });
    }
  },
  created() {},
  methods: {},
  // beforeUpdate() {
  //   console.log(this.active);
  //   console.log(this.$route);
  //   this.active = this.$route.name
  // }
};
</script>

<style lang="less" scoped>
</style>