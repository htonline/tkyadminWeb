<template>
  <div class="app-container">
    <!--工具栏-->
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" title="隧道信息" append-to-body width="1300px" @close="cancel">
    <div class="head-container">
      <div >
        <label class="el-form-item-label">隧道名称</label>
        <el-input v-model="query.tunnelName" clearable placeholder="隧道名称" style="width: 185px;" class="filter-item" ref="tunnelName"/>
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="serach()">搜索</el-button>
      </div>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    </div>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="Data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="sectionName" label="标段名称" />
        <el-table-column prop="tunnelId" label="隧道编号" />
        <el-table-column prop="tunnelName" label="隧道名称" />
        <el-table-column prop="worksiteName" label="工点名称" />
        <el-table-column prop="tunnelStartingDistance" label="隧道起始里程" />
        <el-table-column prop="tunnelEndingDistance" label="隧道结束里程" />
        <el-table-column prop="tunnelLength" label="隧道长度" />
        <el-table-column  label="附件材料" width="150px" align="center">
          <template slot-scope="scopes">
            <el-button
              class="filter-item"
              size="mini"
              type="info"
              icon="el-icon-search"
              style="color: #f3ecec"
              @click="look(scopes.row)"
            >查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="170px" align="center" prop="beizhu4">
          <template slot-scope="scope">
            <el-button     v-permission="['admin','tunnelInformation:updateStatus']" style="margin-left: 3px" type="text"  @click="updateStatus(scope.row,scope.row.beizhu4)">
                {{ scope.row.beizhu4}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="150px" align="center">
          <template slot-scope="scopes">
            <el-button
              class="filter-item"
              size="mini"
              type="success"
              icon="el-icon-tickets"
              style="color: #7d4119"
              @click="askBaojian(scopes.raw)"
            >申请报检</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
      </el-dialog>
      <el-dialog title="附件材料" :visible.sync="TunnelDialog">
        <el-table ref="table" v-loading="crud.loading" :data=DataList style="width: 100%;" @selection-change="crud.selectionChangeHandler">
          <el-table-column prop="name" label="文件名">
            <template slot-scope="scope">
              <el-popover
                :content="'点击下载文件'"
                placement="top-start"
                title=""
                width="200"
                trigger="hover"
              >
                <a
                  slot="reference"
                  :href="baseApi + '/file/' + scope.row.type + '/' + scope.row.realName"
                  class="el-link--primary"
                  style="word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color: #1890ff;font-size: 13px;"
                  target="_blank"
                >
                  {{ scope.row.realName}}
                </a>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="path" label="预览图">
            <template slot-scope="{row}">
              <el-image
                :src=" baseApi + '/file/' + row.type + '/' + row.realName"
                :preview-src-list="[baseApi + '/file/' + row.type + '/' + row.realName]"
                fit="contain"
                lazy
                class="el-avatar"
              >
                <div slot="error">
                  <i class="el-icon-document" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类别" />
          <el-table-column prop="createTime" label="上传日期" />
        </el-table>
      </el-dialog>
      <el-dialog :close-on-click-modal="false"  :visible.sync="BaojianDialog" title="新增报检单" width="1000px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-row>
            <div>
              <el-divider>隧道基本信息</el-divider>
            </div>
          </el-row>
          <el-row >
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">项目名称</div>
                <el-input v-model="form.projectName" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">标段名称</div>
                <el-input v-model="form.sectionName" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">隧道名称</div>
                <el-input v-model="form.tunnelName" style="width: 250px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">工点名称</div>
                <el-input v-model="form.worksiteName" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">待检区段起始里程</div>
                <el-input v-model="form.testStartingDistance" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">待检区段结束里程</div>
                <el-input v-model="form.testEndingDistance" style="width: 250px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item >
                <div class="sub-title">待检区段长度</div>
                <el-input v-model="form.testLength" style="width: 250px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div>
              <el-divider>初始化基本信息</el-divider>
            </div>
          </el-row>
          <el-row >
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">围岩类型</div>
                <el-input v-model="form.wallRockType" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">初支厚度(cm)</div>
                <el-input v-model="form.supportTickness" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">间距(m/榀)</div>
                <el-input v-model="form.separationDistance" style="width: 250px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">钢筋网间距(cm)</div>
                <el-input v-model="form.meshDistance" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">环向钢筋间距(cm)</div>
                <el-input v-model="form.annularBarDistance" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">钢筋保护厚度(mm)</div>
                <el-input v-model="form.reinforPrtTickness" style="width: 150px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row title="二次衬砌厚度">
            <el-col :span="6">
            <el-form-item label="">
              <div class="sub-title">二次衬砌厚度(cm):拱部</div>
              <el-input v-model="form.secLineArchTickness" style="width: 150px;" />
            </el-form-item>
            </el-col>
              <el-col :span="6">
            <el-form-item label="">
              <div class="sub-title">二次衬砌厚度(cm):边墙</div>
              <el-input v-model="form.secLineWallTickness" style="width: 150px;" />
            </el-form-item>
              </el-col>
                <el-col :span="6">
            <el-form-item label="">
              <div class="sub-title">二次衬砌厚度(cm):仰拱</div>
              <el-input v-model="form.secLineInverArchTickness" style="width: 150px;" />
            </el-form-item>
                </el-col>
            <el-col :span="6">
            <el-form-item label="">
              <div class="sub-title">二次衬砌厚度(cm):填充</div>
              <el-input v-model="form.secLineFilerTickness" style="width: 150px;" />
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div>
              <el-divider>衬砌报检基本信息</el-divider>
            </div>
          </el-row>
          <el-row >
            <el-col :span="5">
              <el-form-item >
                <div class="sub-title">施工单位</div>
                <el-input v-model="form.sectionName" style="width: 180px;" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item >
                <div class="sub-title">联系人</div>
                <el-input v-model="form.tunnelName" style="width: 180px;" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item >
                <div class="sub-title">联系方式</div>
                <el-input v-model="form.worksiteName" style="width: 180px;" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item >
                <div class="sub-title">检测单位</div>
                <el-input v-model="form.worksiteName" style="width: 170px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
              <el-col :span="5">
                <el-form-item >
                  <div class="sub-title">监理单位</div>
                  <el-input v-model="form.testStartingDistance" style="width: 180px;" />
                </el-form-item>
              </el-col>
            <el-col :span="4">
              <el-form-item >
                <div class="sub-title">检测方法</div>
                <el-input v-model="form.testEndingDistance" style="width: 150px;" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item >
                <div class="sub-title">检测方式</div>
                <el-input v-model="form.testStartingDistance" style="width: 150px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">申请检测时间</div>
                <el-date-picker
                  v-model="form.testTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <el-form-item label="起始里程">
                <el-input  style="width: 60px;" disabled value="DK" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="">
              <el-input v-model="form.beizhu1" style="width: 60px;" />
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-input v-model="form.beizhu5" style="width: 60px;" />
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="4">
            <el-form-item label="">
              <div class="sub-title">起始里程</div>
              <el-input  style="width: 60px;" disabled value="DK" /> <el-input v-model="form.beizhu1" style="width: 60px;" /><span> + </span><el-input v-model="form.beizhu5" style="width: 60px;" />
            </el-form-item>
            </el-col>
            <el-col :span="4">
            <el-form-item label="">
              <div class="sub-title">结束里程</div>
              <el-input  style="width: 60px;" disabled value="DK" /> <el-input v-model="form.beizhu2" style="width: 140px;" /><span> + </span><el-input v-model="form.beizhu6" style="width: 60px;" />
            </el-form-item>
            </el-col>
            <el-col :span="4">
            <el-form-item label="">
              <div class="sub-title">检测长度</div>
              <el-input v-model="form.tunnelLength" style="width: 370px;" />
            </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="">
                <div class="sub-title">浇筑时间</div>
                <el-date-picker
                  v-model="form.testTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <!--
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
          -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
import crudTunnelInformation from '@/api/system/tunnelInformation'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { select, changeStatue, selectByStatueFenye, selectByStatue, selectByTunnelName } from '@/api/system/tunnelInformation'

const defaultForm = { tunnelInforId: null, projectName: null, sectionName: null, tunnelId: null, tunnelName: null, worksiteName: null, tunnelStartingDistance: null, tunnelEndingDistance: null, tunnelLength: null, repairCompany: null, supervisionCompany: null, detectionCompany: null, constructionCompany: null, userId: null, userName: null, deptId: null, time: null, beizhu1: null, beizhu2: null, beizhu3: null, beizhu4: null, beizhu5: null, beizhu6: null, beizhu7: null, beizhu8: null, beizhu9: null, beizhu10: null, beizhu11: null, beizhu12: null, beizhu13: null, beizhu14: null, beizhu15: null }
export default {
  name: 'TunnelInformation',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '隧道信息', url: 'api/tunnelInformation', idField: 'tunnelInforId', sort: 'tunnelInforId,desc', crudMethod: { ...crudTunnelInformation }})
  },
  data() {
    return {
      BaojianDialog: false,
      dialog: false,
      DataList: [],
      Data: [],
      TunnelDialog: false,
      headers: { 'Authorization': getToken() },
      th: '',
      permission: {
        add: ['admin', 'tunnelInformation:add'],
        edit: ['admin', 'tunnelInformation:edit'],
        del: ['admin', 'tunnelInformation:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'tunnelInforId', display_name: 'ID' },
        { key: 'projectName', display_name: '项目名称' },
        { key: 'sectionName', display_name: '标段名称' },
        { key: 'tunnelId', display_name: '隧道编号' },
        { key: 'tunnelName', display_name: '隧道名称' },
        { key: 'worksiteName', display_name: '工点名称' },
        { key: 'repairCompany', display_name: '建设单位' },
        { key: 'supervisionCompany', display_name: '监理单位' },
        { key: 'detectionCompany', display_name: '检测单位' },
        { key: 'constructionCompany', display_name: '施工单位' },
        { key: 'userId', display_name: '用户ID' },
        { key: 'userName', display_name: '用户名' },
        { key: 'deptId', display_name: '用户权限' },
        { key: 'time', display_name: '数据新增时间' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'baseApi',
      'fileUploadApi'
    ])
  },
  beforeCreate() {
    selectByStatue().then(response => {
      this.Data = response
    })
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    serach() {
      if (this.$refs.tunnelName.value.trim().length <= 0) {
        selectByStatue().then(response => {
          this.Data = response
        })
      } else {
        selectByTunnelName(this.$refs.tunnelName.value.trim()).then(response => {
          this.Data = response
        })
      }
    },
    askBaojian(data){
      this.BaojianDialog = true
    },
    // 上传文件
    look(data) {
      select(data).then(response => {
        this.DataList = response
      })
      this.TunnelDialog = true
    },
    cancelCU() {
      this.TunnelDialog = false
      this.BaojianDialog = false
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
      this.changeVersion(response)
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
    // 改变状态
    updateStatus(data, status) {
      if (status === '未发布') {
        this.$confirm('是否发布隧道信息？', '是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeStatue(data).then(res => {
            this.crud.toQuery()
            this.crud.notify('发布成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          })
        })
      } else {
        this.$confirm('是否取消发布隧道信息？', '是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeStatue(data).then(res => {
            this.crud.toQuery()
            this.crud.notify('已取消发布', CRUD.NOTIFICATION_TYPE.SUCCESS)
          })
        })
      }
    }
  }
}
</script>

<style scoped>
::v-deep .el-image__error, .el-image__placeholder{
  background: none;
}
::v-deep .el-image-viewer__wrapper{
  top: 55px;
}
</style>
