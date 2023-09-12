<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">文件id</label>
        <el-input v-model="query.id" clearable placeholder="文件id" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">文件名</label>
        <el-input v-model="query.fileName" clearable placeholder="文件名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">文件存储路径</label>
        <el-input v-model="query.filePath" clearable placeholder="文件存储路径" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">创建时间</label>
        <el-input v-model="query.creatTime" clearable placeholder="创建时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">更新时间</label>
        <el-input v-model="query.updateTime" clearable placeholder="更新时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">上传者</label>
        <el-input v-model="query.byUser" clearable placeholder="上传者" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!--        <label class="el-form-item-label">备注1</label>-->
        <!--        <el-input v-model="query.beizhu1" clearable placeholder="备注1" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <!--        <label class="el-form-item-label">备注2</label>-->
        <!--        <el-input v-model="query.beizhu2" clearable placeholder="备注2" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <!--        <label class="el-form-item-label">备注3</label>-->
        <!--        <el-input v-model="query.beizhu3" clearable placeholder="备注3" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <!--          <el-form-item label="文件id" prop="id">-->
          <!--            <el-input v-model="form.id" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="文件名">-->
          <!--            <el-input v-model="form.fileName" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="文件存储路径">-->
          <!--            <el-input v-model="form.filePath" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="创建时间">-->
          <!--            <el-input v-model="form.creatTime" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="更新时间">-->
          <!--            <el-input v-model="form.updateTime" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <el-form-item label="上传者">
            <el-input v-model="form.byUser" style="width: 370px;" />
          </el-form-item>
          <!--          <el-form-item label="备注1">-->
          <!--            <el-input v-model="form.beizhu1" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="备注2">-->
          <!--            <el-input v-model="form.beizhu2" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="备注3">-->
          <!--            <el-input v-model="form.beizhu3" style="width: 370px;" />-->
          <!--          </el-form-item>-->
          <el-form-item label="设备照片">
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="submit">上传文件</el-button>
            <el-input ref="inp" v-model="form.devicePhotos" style="width: 120px;" type="hidden" @input="changeVersion" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="文件id" />
        <el-table-column prop="fileName" label="文件名" />
        <el-table-column prop="filePath" label="文件存储路径" />
        <el-table-column prop="creatTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="byUser" label="上传者" />
        <el-table-column prop="beizhu1" label="备注1" />
        <el-table-column prop="beizhu2" label="备注2" />
        <el-table-column prop="beizhu3" label="备注3" />
        <el-table-column v-if="checkPer(['admin','radarAcquisitionUpload:edit','radarAcquisitionUpload:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
      <!--上传文件Dialog-->
      <el-dialog title="附件材料" :visible.sync="uploadFileDialog">
        <el-upload
          ref="upload"
          multiple
          class="upload-demo"
          :action="radarFileUploadApi+'?author='+form.byUser"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :file-list="fileList"
          :limit="2000"
          :show-file-list="true"
          :before-upload="beforeUpload"
          :headers="headers"
          :on-success="handleSuccess"
          :on-error="handleError"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传文件(限2000份)</div>
        </el-upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import crudRadarAcquisitionUpload from '@/api/radarAcquisitionUpload'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

const defaultForm = { id: null, fileName: null, filePath: null, creatTime: null, updateTime: null, byUser: null, beizhu1: null, beizhu2: null, beizhu3: null }
export default {
  name: 'RadarAcquisitionUpload',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'api/radar_acquisition_upload', url: 'api/radarAcquisitionUpload', idField: 'id', sort: 'id,desc', crudMethod: { ...crudRadarAcquisitionUpload }})
  },
  data() {
    return {
      radarPictureDialog: false,
      uploadFileDialog: false,
      chunkSize: 5 * 1024 * 1024, // 每个分片的大小，这里设置为5MB
      headers: {
        'Authorization': getToken()
      },
      permission: {
        add: ['admin', 'radarAcquisitionUpload:add'],
        edit: ['admin', 'radarAcquisitionUpload:edit'],
        del: ['admin', 'radarAcquisitionUpload:del']
      },
      rules: {
        // id: [
        //   { required: true, message: '文件id不能为空', trigger: 'blur' }
        // ]
      },
      queryTypeOptions: [
        { key: 'id', display_name: '文件id' },
        { key: 'fileName', display_name: '文件名' },
        { key: 'filePath', display_name: '文件存储路径' },
        { key: 'creatTime', display_name: '创建时间' },
        { key: 'updateTime', display_name: '更新时间' },
        { key: 'byUser', display_name: '上传者' },
        { key: 'beizhu1', display_name: '备注1' },
        { key: 'beizhu2', display_name: '备注2' },
        { key: 'beizhu3', display_name: '备注3' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'baseApi',
      'pictureUploadApi',
      'radarFileUploadApi'
    ])
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    submit() {
      // 点击上传文件之后，会出现选取文件的Dialog
      this.uploadFileDialog = true
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleAvatarSuccess(file) {
      console.log(file)
    },
    // 上传文件
    upload() {
      this.$refs.upload.submit()
    },
    async beforeUpload(file) {
      // 将文件切分成分片
      const chunks = []
      let start = 0
      while (start < file.size) {
        const end = Math.min(start + this.chunkSize, file.size)
        const chunk = file.slice(start, end)
        chunks.push(chunk)
        start = end
      }

      // 上传分片
      const promises = chunks.map((chunk, index) => {
        const formData = new FormData()
        formData.append('file', chunk)
        formData.append('index', index)
        formData.append('totalChunks', chunks.length)
        return this.uploadChunk(formData)
      })

      // 等待所有分片上传完成
      await Promise.all(promises)
    },
    beforesubmit(response, file, fileList) {
      this.$refs.upload.clearFiles()
    },
    handleSuccess(response, file, fileList) {
      this.crud.notify('上传成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
      this.changeVersion(response, 0)
      this.$refs.upload.clearFiles()
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    },
    changeVersion(newVersion, id) {
      console.log('newVersion', newVersion)
      if (id === 0) {
        this.form.devicePhotos = newVersion
        this.uploadFileDialog = false
      }
    }
  }
}
</script>

<style scoped>

</style>
