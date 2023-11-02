<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">雷达图谱id</label>
        <el-input v-model="query.spectrumId" clearable placeholder="雷达图谱id" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">文件存储路径</label>
        <el-input v-model="query.fileUrl" clearable placeholder="文件存储路径" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">外键，关联tunel表</label>
        <el-input v-model="query.tunnelId" clearable placeholder="外键，关联tunel表" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark1" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark2" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark3" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark4" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark5" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark6" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark7" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark8" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
<!--          <el-form-item label="雷达图谱id" prop="spectrumId">-->
<!--            <el-input v-model="form.spectrumId" style="width: 370px;" />-->
<!--          </el-form-item>-->
          <el-form-item label="文件存储路径">
            <el-input v-model="form.fileUrl" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="外键，关联tunel表">
            <el-input v-model="form.tunnelId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="雷达图谱">
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="submit">上传照片</el-button>
            <el-input ref="inp" v-model="form.devicePhotos" style="width: 120px;" type="hidden" @input="changeVersion" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark1" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark2" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark3" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark4" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark5" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark6" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark7" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark8" style="width: 370px;" />
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
        <el-table-column prop="spectrumId" label="雷达图谱id" />
        <el-table-column prop="fileUrl" label="文件存储路径" />
        <el-table-column prop="tunnelId" label="外键，关联tunel表" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="remark1" label="备注" />
        <el-table-column prop="remark2" label="备注" />
        <el-table-column prop="remark3" label="备注" />
        <el-table-column prop="remark4" label="备注" />
        <el-table-column prop="remark5" label="备注" />
        <el-table-column prop="remark6" label="备注" />
        <el-table-column prop="remark7" label="备注" />
        <el-table-column prop="remark8" label="备注" />
        <el-table-column v-if="checkPer(['admin','pictureRadarSpectrum:edit','pictureRadarSpectrum:del'])" label="操作" width="150px" align="center">
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
          :action="radarSpectrumUploadApi+'?spectrumId='+form.spectrumId+'&&fileUrl='+form.fileUrl+'&&tunnelId='+form.tunnelId+'&&remark='+form.remark+'&&remark1='+form.remark1+'&&remark2='+form.remark2+'&&remark3='+form.remark3+'&&remark4='+form.remark4+'&&remark5='+form.remark5+'&&remark6='+form.remark6+'&&remark7='+form.remark7+'&&remark8='+form.remark8"
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
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb(一次最多上传2000张)</div>
        </el-upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import crudPictureRadarSpectrum from '@/api/pictureRadarSpectrum'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

const defaultForm = { spectrumId: null, fileUrl: null, tunnelId: null, remark1: null, remark2: null, remark3: null, remark4: null, remark5: null, remark6: null, remark7: null, remark8: null, remark: null }
export default {
  name: 'PictureRadarSpectrum',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'api/picture_radar_spectrum', url: 'api/pictureRadarSpectrum', idField: 'spectrumId', sort: 'spectrumId,desc', crudMethod: { ...crudPictureRadarSpectrum }})
  },
  data() {
    return {
      uploadFileDialog: false,
      headers: {
        'Authorization': getToken()
      },
      permission: {
        add: ['admin', 'pictureRadarSpectrum:add'],
        edit: ['admin', 'pictureRadarSpectrum:edit'],
        del: ['admin', 'pictureRadarSpectrum:del']
      },
      rules: {
        spectrumId: [
          { required: true, message: '雷达图谱id不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'spectrumId', display_name: '雷达图谱id' },
        { key: 'fileUrl', display_name: '文件存储路径' },
        { key: 'tunnelId', display_name: '外键，关联tunel表' },
        { key: 'remark1', display_name: '备注' },
        { key: 'remark2', display_name: '备注' },
        { key: 'remark3', display_name: '备注' },
        { key: 'remark4', display_name: '备注' },
        { key: 'remark5', display_name: '备注' },
        { key: 'remark6', display_name: '备注' },
        { key: 'remark7', display_name: '备注' },
        { key: 'remark8', display_name: '备注' },
        { key: 'remark', display_name: '备注' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'radarSpectrumUploadApi'
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
    beforeUpload(file) {
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      this.form.name = file.name
      console.log(file.name)
      return isLt2M
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
