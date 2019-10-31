<template>
  <section>
    <van-nav-bar title="文件上传" right-text="开始上传" @click-right="submitUpload" />
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
    submitUpload() {
      let that = this;
      this.$api.music
        .uploadFile(this.fileList)
        .then(res => {
          console.log("res");
          console.log(res);
        })
        .catch(err => {
          console.log("err");
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.contain {
  text-align: center;
}
</style>