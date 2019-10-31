<template>
  <section>
    <van-nav-bar title="文件上传" right-text="开始上传" @click-right="uploading" />
    <van-uploader v-model="fileList" class="contain" multiple />
    <input type="file" name="img" />
    <button @click="test">上传</button>
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
    async uploading(event) {
      // 拿到 input 的 files 对象
      const formDate = new FormData();
      // 遍历对象中的每一个文件，并逐一添加到 formDate 实例对象中
      this.fileList.forEach(item => {
        console.log(item);
        formDate.append("avatar", item.file);
      });
      this.$api.music
        .uploadFilds(formDate)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    test() {
      let files = document.getElementsByClassName();
    }
  }
};
</script>
<style lang="less" scoped>
.contain {
  text-align: center;
}
</style>