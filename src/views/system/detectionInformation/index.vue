<template>
  <!--  检测数据管理-->
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">ID</label>
        <el-input v-model="query.detectionId" clearable placeholder="ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">项目名称</label>
        <el-input v-model="query.projectName" clearable placeholder="项目名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">标段名称</label>
        <el-input v-model="query.sectionName" clearable placeholder="标段名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">道路编号</label>
        <el-input v-model="query.tunnelId" clearable placeholder="道路编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">道路名称</label>
        <el-input v-model="query.tunnelName" clearable placeholder="道路名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">工点名称</label>
        <el-input v-model="query.worksiteName" clearable placeholder="工点名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">数据新增时间</label>
        <el-input v-model="query.time" clearable placeholder="数据新增时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">报检号</label>
        <el-input v-model="query.testId" clearable placeholder="报检号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">测线编号</label>
        <el-input v-model="query.detectionLineBiaohao" clearable placeholder="测线编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">检测数据-上传/下载</label>
        <el-input v-model="query.detectionData" clearable placeholder="检测数据-上传/下载" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">现场照片-上传/下载</label>
        <el-input v-model="query.detectionPhotos" clearable placeholder="现场照片-上传/下载" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">雷达图谱-上传/下载</label>
        <el-input v-model="query.radarPhotos" clearable placeholder="雷达图谱-上传/下载" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">检测报告_上传/下载</label>
        <el-input v-model="query.detectionSummary" clearable placeholder="检测报告_上传/下载" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">其他附件_上传/下载</label>
        <el-input v-model="query.others" clearable placeholder="其他附件_上传/下载" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="ID">
            <el-input v-model="form.detectionId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="form.projectName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="标段名称">
            <el-input v-model="form.sectionName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路编号">
            <el-input v-model="form.tunnelId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路名称">
            <el-input v-model="form.tunnelName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="工点名称">
            <el-input v-model="form.worksiteName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测起点">
            <el-input v-model="form.detectionStartingDistance" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测终点">
            <el-input v-model="form.detectionEndingDistance" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测长度">
            <el-input v-model="form.detectionLength" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="数据新增时间">
            <el-input v-model="form.time" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="报检号">
            <el-input v-model="form.testId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="测线编号">
            <el-input v-model="form.detectionLineBiaohao" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测数据-上传/下载">
            <el-input v-model="form.detectionData" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="现场照片-上传/下载">
            <el-input v-model="form.detectionPhotos" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="雷达图谱-上传/下载">
            <el-input v-model="form.radarPhotos" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测报告_上传/下载">
            <el-input v-model="form.detectionSummary" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="其他附件_上传/下载">
            <el-input v-model="form.others" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu1">
            <el-input v-model="form.beizhu1" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu2">
            <el-input v-model="form.beizhu2" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu3">
            <el-input v-model="form.beizhu3" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu4">
            <el-input v-model="form.beizhu4" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu5">
            <el-input v-model="form.beizhu5" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu6">
            <el-input v-model="form.beizhu6" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu7">
            <el-input v-model="form.beizhu7" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu8">
            <el-input v-model="form.beizhu8" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu9">
            <el-input v-model="form.beizhu9" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu10">
            <el-input v-model="form.beizhu10" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu11">
            <el-input v-model="form.beizhu11" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu12">
            <el-input v-model="form.beizhu12" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu13">
            <el-input v-model="form.beizhu13" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu14">
            <el-input v-model="form.beizhu14" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="beizhu15">
            <el-input v-model="form.beizhu15" style="width: 370px;" />
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
        <el-table-column prop="detectionId" label="ID" />
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="sectionName" label="标段名称" />
        <el-table-column prop="tunnelId" label="道路编号" />
        <el-table-column prop="tunnelName" label="道路名称" />
        <el-table-column prop="worksiteName" label="工点名称" />
        <el-table-column prop="detectionStartingDistance" label="检测起点" />
        <el-table-column prop="detectionEndingDistance" label="检测终点" />
        <el-table-column prop="detectionLength" label="检测长度" />
        <el-table-column prop="time" label="数据新增时间" />
        <el-table-column prop="testId" label="报检号" />
        <el-table-column prop="detectionLineBiaohao" label="测线编号" />
        <el-table-column prop="detectionData" label="检测数据-上传/下载" />
        <el-table-column prop="detectionPhotos" label="现场照片-上传/下载" />
        <el-table-column prop="radarPhotos" label="雷达图谱-上传/下载">
          <template slot-scope="scope">
            <el-button mutilline="true" type="text" @click="updateRadarPhotosDialog(scope.row)">上传</el-button>
            <el-button mutilline="true" type="text" @click="downloadRadarPhotos(scope.row,scope.row.radarPhotos)">下载</el-button>
            {{ scope.row.radarPhotos }}
            <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="uploadRadarDialogIs" :title="crud.status.add ? '文件上传' : '编辑文件'" width="500px">
              <el-form ref="form" :model="form" size="small" label-width="80px">
                <el-form-item label="上传">
                  <!--   上传文件   -->
                  <el-upload
                    ref="upload"
                    :limit="1"
                    :before-upload="beforeUpload"
                    :auto-upload="false"
                    :headers="headers"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :action="updateRadarPhotoPath"
                    :data="{data:dataid}"
                  >
                    <div class="eladmin-upload" onclick=""><i class="el-icon-upload" /> 添加文件</div>
                    <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancel()">取消</el-button>
                <el-button type="primary" @click="uploadRadarPhotos">确认</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column ref="docn" prop="detectionSummary" label="检测报告_上传/下载">
          <template slot-scope="scope">
            <el-button mutilline="true" type="text" @click="updateDetectionSummaryDialog(scope.row)">上传</el-button>
            <el-button mutilline="true" type="text" @click="downloadDetectionSummary(scope.row,scope.row.detectionSummary)">下载</el-button>
            {{ scope.row.detectionSummary }}
            <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="uploadDetectionSummaryDialogIs" :title="crud.status.add ? '文件上传' : '编辑文件'" width="500px">
              <el-form ref="form" :model="form" size="small" label-width="80px">
                <el-form-item label="上传">
                  <!--   上传文件   -->
                  <el-upload
                    ref="upload"
                    :limit="1"
                    :before-upload="beforeUpload"
                    :auto-upload="false"
                    :headers="headers"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :action="updateDetectionSummaryPath"
                    :data="{data:dataid}"
                  >
                    <div class="eladmin-upload" onclick=""><i class="el-icon-upload" /> 添加文件</div>
                    <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancel()">取消</el-button>
                <el-button type="primary" @click="upload">确认</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column prop="others" label="其他附件_上传/下载">
          <template slot-scope="scope">
            <el-button mutilline="true" type="text" @click="uploadOthersDialog(scope.row)">上传</el-button>
            <el-button mutilline="true" type="text" @click="downloadOthers(scope.row,scope.row.others)">下载</el-button>
            {{ scope.row.others }}
            <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="uploadOthersDialogIs" :title="crud.status.add ? '文件上传' : '编辑文件'" width="500px">
              <el-form ref="form" :model="form" size="small" label-width="80px">
                <el-form-item label="上传">
                  <!--   上传文件   -->
                  <el-upload
                    ref="upload"
                    :limit="1"
                    :before-upload="beforeUpload"
                    :auto-upload="false"
                    :headers="headers"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :action="uploadOthersPath"
                    :data="{data:dataid}"
                  >
                    <div class="eladmin-upload" onclick=""><i class="el-icon-upload" /> 添加文件</div>
                    <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancel()">取消</el-button>
                <el-button type="primary" @click="upload">确认</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column prop="beizhu1" label="beizhu1" />
        <el-table-column prop="beizhu2" label="beizhu2" />
        <el-table-column prop="beizhu3" label="beizhu3" />
        <el-table-column prop="beizhu4" label="beizhu4" />
        <el-table-column prop="beizhu5" label="beizhu5" />
        <el-table-column prop="beizhu6" label="beizhu6" />
        <el-table-column prop="beizhu7" label="beizhu7" />
        <el-table-column prop="beizhu8" label="beizhu8" />
        <el-table-column prop="beizhu9" label="beizhu9" />
        <el-table-column prop="beizhu10" label="beizhu10" />
        <el-table-column prop="beizhu11" label="beizhu11" />
        <el-table-column prop="beizhu12" label="beizhu12" />
        <el-table-column prop="beizhu13" label="beizhu13" />
        <el-table-column prop="beizhu14" label="beizhu14" />
        <el-table-column prop="beizhu15" label="beizhu15" />
        <el-table-column v-if="checkPer(['admin','detectionInformation:edit','detectionInformation:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <el-button
              slot="right"
              class="filter-item"
              size="mini"
              type="info"
              style="border-color: #FFBA00;color: #FFBA00"
              @click="downloadData(scope.row)"
            ><svg-icon icon-class="download" style="color: #FFBA00" />下载数据</el-button>
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
      <!--表单组件-->
    </div>
  </div>
</template>

<script>
import crudDetectionInformation from '@/api/system/detectionInformation'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { downloadFile } from '@/utils/index'
import { downloadFileRaw } from '@/utils/index'
import { generator } from '@/api/system/detectionInformation'
import { edit } from '@/api/system/detectionInformation'
import { getToken } from '@/utils/auth'
const defaultForm = { detectionId: null, projectName: null, sectionName: null, tunnelId: null, tunnelName: null, worksiteName: null, detectionStartingDistance: null, detectionEndingDistance: null, detectionLength: null, time: null, testId: null, detectionLineBiaohao: null, detectionData: null, detectionPhotos: null, radarPhotos: null, detectionSummary: null, others: null, beizhu1: null, beizhu2: null, beizhu3: null, beizhu4: null, beizhu5: null, beizhu6: null, beizhu7: null, beizhu8: null, beizhu9: null, beizhu10: null, beizhu11: null, beizhu12: null, beizhu13: null, beizhu14: null, beizhu15: null }
const baseUrl = process.env.VUE_APP_BASE_API === '/' ? '' : process.env.VUE_APP_BASE_API
export default {
  name: 'DetectionInformation',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'api/detectionInformation', url: 'api/detectionInformation', idField: 'detectionId', sort: 'detectionId,desc', crudMethod: { ...crudDetectionInformation }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'detectionInformation:add'],
        edit: ['admin', 'detectionInformation:edit'],
        del: ['admin', 'detectionInformation:del']
      },
      headers: { 'Authorization': getToken() },
      updateRadarPhotoPath: baseUrl + '/api/detectionInformation/updateRadarPhoto',
      updateDetectionSummaryPath: baseUrl + '/api/detectionInformation/updateDetectionSummary',
      uploadOthersPath: baseUrl + '/api/detectionInformation/uploadOthers',
      uploadRadarDialogIs: false,
      uploadDetectionSummaryDialogIs: false,
      uploadOthersDialogIs: false,
      dataid: -1,
      rules: {
      },
      queryTypeOptions: [
        { key: 'detectionId', display_name: 'ID' },
        { key: 'projectName', display_name: '项目名称' },
        { key: 'sectionName', display_name: '标段名称' },
        { key: 'tunnelId', display_name: '道路编号' },
        { key: 'tunnelName', display_name: '道路名称' },
        { key: 'worksiteName', display_name: '工点名称' },
        { key: 'time', display_name: '数据新增时间' },
        { key: 'testId', display_name: '报检号' },
        { key: 'detectionLineBiaohao', display_name: '测线编号' },
        { key: 'detectionData', display_name: '检测数据-上传/下载' },
        { key: 'detectionPhotos', display_name: '现场照片-上传/下载' },
        { key: 'radarPhotos', display_name: '雷达图谱-上传/下载' },
        { key: 'detectionSummary', display_name: '检测报告_上传/下载' },
        { key: 'others', display_name: '其他附件_上传/下载' }
      ]
      // uploadPhotoPath: baseUrl+'/api/upload/updateFile'
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    downloadData(data) {
      // 打包下载
      generator(data, 2).then(data => {
        downloadFile(data, data, 'zip')
      })
    },
    downloadRadarPhotos(data, name) {
      // 打包下载
      generator(data, -1).then(data => {
        downloadFileRaw(data, name)
      })
    },
    downloadDetectionSummary(data, name) {
      // 打包下载
      generator(data, -2).then(data => {
        downloadFileRaw(data, name)
      })
    },
    downloadOthers(data, name) {
      // 打包下载
      generator(data, -3).then(data => {
        downloadFileRaw(data, name)
      })
    },
    updateRadarPhotosDialog(data) {
      this.dataid = data.detectionId
      this.uploadRadarDialogIs = true
    },
    updateDetectionSummaryDialog(data) {
      this.dataid = data.detectionId
      this.uploadDetectionSummaryDialogIs = true
    },
    uploadOthersDialog(data) {
      this.dataid = data.detectionId
      this.uploadOthersDialogIs = true
    },
    upload() {
      this.$refs.upload.submit()
    },
    uploadRadarPhotos() {
      this.$refs.upload.submit()
    },
    uploadOthers() {
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
    // beforesubmit(response, file, fileList) {
    //   this.$refs.upload.clearFiles()
    // },
    handleSuccess(response, file, data) {
      // data.detectionPhotos = response.data
      // edit(data)
      this.crud.notify('上传成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
      // this.changeVersion(response, 1)
      this.$refs.upload.clearFiles()
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = '上传失败'
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    },
    cancel() {
      this.uploadPhotoDialog = false
    }
  }
}
</script>

<style scoped>

</style>
