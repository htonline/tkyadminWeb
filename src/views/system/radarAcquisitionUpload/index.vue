<template>
  <div>
    <a-button @click="uploadFile"> 资源上传 </a-button>
    <a-drawer
      title="资源上传"
      placement="right"
      width="640"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <upload></upload>
    </a-drawer>
  </div>
</template>

<script>
import Upload from '@/components/Uploader/Index'
export default {
  name: 'WelcomePage',
  data() {
    return {
      visible: true
    }
  },
  components: {
    Upload
  },
  methods: {
    uploadFile() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
