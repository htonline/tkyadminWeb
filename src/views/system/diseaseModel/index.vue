<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">模型Id</label>
        <el-input v-model="query.modelId" clearable placeholder="模型Id" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">模型存放路径</label>
        <el-input v-model="query.mdelUrl" clearable placeholder="模型存放路径" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">模型对应的病害序号</label>
        <el-input v-model="query.disNumber" clearable placeholder="模型对应的病害序号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">预留字段1</label>
        <el-input v-model="query.spare1" clearable placeholder="预留字段1" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">预留字段2</label>
        <el-input v-model="query.spare2" clearable placeholder="预留字段2" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">预留字段3</label>
        <el-input v-model="query.spare3" clearable placeholder="预留字段3" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">预留字段4</label>
        <el-input v-model="query.spare4" clearable placeholder="预留字段4" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">预留字段5</label>
        <el-input v-model="query.spare5" clearable placeholder="预留字段5" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">预留字段6</label>
        <el-input v-model="query.spare6" clearable placeholder="预留字段6" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
<!--          <el-form-item label="模型Id" prop="modelId">-->
<!--            <el-input v-model="form.modelId" style="width: 370px;" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="模型存放路径">-->
<!--            <el-input v-model="form.mdelUrl" style="width: 370px;" />-->
<!--          </el-form-item>-->
          <el-form-item label="模型对应的病害序号">
            <el-input v-model="form.disNumber" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="模型文件">
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="submit">上传模型文件</el-button>
            <el-input ref="inp" v-model="form.diseaseModel" style="width: 120px;" type="hidden" @input="changeVersion" />
          </el-form-item>
<!--          <el-form-item label="预留字段1">-->
<!--            <el-input v-model="form.spare1" style="width: 370px;" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="预留字段2">-->
<!--            <el-input v-model="form.spare2" style="width: 370px;" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="预留字段3">-->
<!--            <el-input v-model="form.spare3" style="width: 370px;" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="预留字段4">-->
<!--            <el-input v-model="form.spare4" style="width: 370px;" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="预留字段5">-->
<!--            <el-input v-model="form.spare5" style="width: 370px;" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="预留字段6">-->
<!--            <el-input v-model="form.spare6" style="width: 370px;" />-->
<!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="modelId" label="模型Id" />
        <el-table-column prop="mdelUrl" label="模型存放路径" />
        <el-table-column prop="disNumber" label="模型对应的病害序号" />
        <el-table-column prop="spare1" label="预留字段1" />
        <el-table-column prop="spare2" label="预留字段2" />
        <el-table-column prop="spare3" label="预留字段3" />
        <el-table-column prop="spare4" label="预留字段4" />
        <el-table-column prop="spare5" label="预留字段5" />
        <el-table-column prop="spare6" label="预留字段6" />
        <el-table-column v-if="checkPer(['admin','diseaseModel:edit','diseaseModel:del'])" label="操作" width="150px" align="center">
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
          :action="diseaseModelUploadApi+'?modelId='+form.modelId+'&&mdelUrl='+form.mdelUrl+'&&disNumber='+form.disNumber+'&&spare1='+form.spare1+'&&spare2='+form.spare2+'&&spare3='+form.spare3+'&&spare4='+form.spare4+'&&spare5='+form.spare5+'&&spare6='+form.spare6"
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
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb(一次最多上传1350张)</div>
        </el-upload>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import crudDiseaseModel from '@/api/diseaseModel'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

const defaultForm = { modelId: null, mdelUrl: null, disNumber: null, spare1: null, spare2: null, spare3: null, spare4: null, spare5: null, spare6: null }
export default {
  name: 'DiseaseModel',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'api/disease_model', url: 'api/diseaseModel', idField: 'modelId', sort: 'modelId,desc', crudMethod: { ...crudDiseaseModel }})
  },
  data() {
    return {
      uploadFileDialog: false,
      headers: {
        'Authorization': getToken()
      },
      permission: {
        add: ['admin', 'diseaseModel:add'],
        edit: ['admin', 'diseaseModel:edit'],
        del: ['admin', 'diseaseModel:del']
      },
      rules: {
        // modelId: [
        //   { required: true, message: '模型Id不能为空', trigger: 'blur' }
        // ]
      },
      queryTypeOptions: [
        { key: 'modelId', display_name: '模型Id' },
        { key: 'mdelUrl', display_name: '模型存放路径' },
        { key: 'disNumber', display_name: '模型对应的病害序号' },
        { key: 'spare1', display_name: '预留字段1' },
        { key: 'spare2', display_name: '预留字段2' },
        { key: 'spare3', display_name: '预留字段3' },
        { key: 'spare4', display_name: '预留字段4' },
        { key: 'spare5', display_name: '预留字段5' },
        { key: 'spare6', display_name: '预留字段6' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'diseaseModelUploadApi'
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
        this.form.diseaseModel = newVersion
        this.uploadFileDialog = false
      }
    }

  }
}
</script>

<style scoped>

</style>
