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

      //前端解决未选择文件问题
      if (this.fileList.length == 0) {
        this.$toast.fail("请选择文件");
        return;
      }
      this.$api.music
        .uploadFile(this.fileList)
        .then(res => {
          if (res.code == 200) {
            console.log(200);
          }
        })
        .catch(err => {
          this.$toast.fail("上传失败");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.contain {
  position: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>