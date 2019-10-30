<template>
  <section>
    <van-nav-bar title="文件上传" right-text="开始上传" @click-right="uploading" />
    <van-uploader v-model="fileList" class="contain" multiple />
  </section>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    onClickRight() {},
    uploading() {
      let that = this;
    }
  }
};
</script>
<style lang="less" scoped>
.contain {
  text-align: center;
}
</style>