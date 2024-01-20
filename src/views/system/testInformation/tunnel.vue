<template>
  <div class="app-container">
    <!--工具栏-->
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" title="道路信息" append-to-body width="1300px" @close="cancel">
    <div class="head-container">
      <div >
        <label class="el-form-item-label">道路名称</label>
        <el-input v-model="query.tunnelName" clearable placeholder="道路名称" style="width: 185px;" class="filter-item" ref="tunnelName"/>
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="serach()">搜索</el-button>
      </div>
    <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
    </div>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="Data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="sectionName" label="标段名称" />
        <el-table-column prop="tunnelId" label="道路编号" />
        <el-table-column prop="tunnelName" label="道路名称" />
        <el-table-column prop="worksiteName" label="工点名称" />
        <el-table-column prop="tunnelStartingDistance" label="道路起始里程" />
        <el-table-column prop="tunnelEndingDistance" label="道路结束里程" />
        <el-table-column prop="tunnelLength" label="道路长度" />
        <el-table-column  label="附件材料" width="150px" align="center">
          <template slot-scope="scope">
            <el-button
              class="filter-item"
              size="mini"
              type="info"
              icon="el-icon-search"
              style="color: #f3ecec"
              @click="look(scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="170px" align="center" prop="beizhu4"/>
        <el-table-column  label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <el-button
              class="filter-item"
              size="mini"
              type="warning"
              icon="el-icon-tickets"
              style="color: #aa0fa7"
              @click="askBaojian(scope.row)"
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
      <el-dialog :close-on-click-modal="false"  :visible.sync="BaojianDialog" title="新增报检单" width="1000px" :show-close="false">
        <el-form ref="defaultForms"  :model="defaultForms" :rules="rules"   size="small" label-width="80px">
          <el-row>
            <div>
              <el-divider>道路基本信息</el-divider>
            </div>
          </el-row>
          <el-row >
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">项目名称</div>
                <el-input v-model="defaultForms.projectName" style="width: 250px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">标段名称</div>
                <el-input v-model="defaultForms.sectionName" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">道路名称</div>
                <el-input v-model="defaultForms.tunnelName" style="width: 250px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">工点名称</div>
                <el-input v-model="defaultForms.worksiteName" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">待检区段起始里程</div>
                <el-input v-model="defaultForms.beizhu2" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item >
                <div class="sub-title">待检区段结束里程</div>
                <el-input v-model="defaultForms.beizhu3" style="width: 250px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item >
                <div class="sub-title">待检区段长度</div>
                <el-input v-model="defaultForms.beizhu4" style="width: 250px;" />
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
                <el-input v-model="defaultForms.wallRockType" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">初支厚度(cm)</div>
                <el-input v-model="defaultForms.supportTickness" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">间距(m/榀)</div>
                <el-input v-model="defaultForms.separationDistance" style="width: 250px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">钢筋网间距(cm)</div>
                <el-input v-model="defaultForms.meshDistance" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">环向钢筋间距(cm)</div>
                <el-input v-model="defaultForms.annularBarDistance" style="width: 250px;" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">钢筋保护厚度(mm)</div>
                <el-input v-model="defaultForms.reinforPrtTickness" style="width: 150px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row title="二次衬砌厚度">
            <el-col :span="6">
            <el-form-item label="">
              <div class="sub-title">二次衬砌厚度(cm):拱部</div>
              <el-input v-model="defaultForms.secLineArchTickness" style="width: 150px;" />
            </el-form-item>
            </el-col>
              <el-col :span="6">
            <el-form-item label="">
              <div class="sub-title">二次衬砌厚度(cm):边墙</div>
              <el-input v-model="defaultForms.secLineWallTickness" style="width: 150px;" />
            </el-form-item>
              </el-col>
                <el-col :span="6">
            <el-form-item label="">
              <div class="sub-title">二次衬砌厚度(cm):仰拱</div>
              <el-input v-model="defaultForms.secLineInverArchTickness" style="width: 150px;" />
            </el-form-item>
                </el-col>
            <el-col :span="6">
            <el-form-item label="">
              <div class="sub-title">二次衬砌厚度(cm):填充</div>
              <el-input v-model="defaultForms.secLineFilerTickness" style="width: 150px;" />
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
                <div class="sub-title" >施工单位</div>
                <el-input v-model="defaultForms.beizhu5" style="width: 180px;" >{{ user.nickName }}</el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item >
                <div class="sub-title">联系人</div>
                <el-input v-model="defaultForms.beizhu6" style="width: 180px;" >{{ user.username }}</el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item >
                <div class="sub-title">联系方式</div>
                <el-input v-model="defaultForms.beizhu7" style="width: 180px;" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item >
                <div class="sub-title">检测单位</div>
                <!-- <el-input v-model="defaultForms.beizhu8" style="width: 170px;" />   -->
                <el-select
                  v-model="defaultForms.beizhu8"
                placeholder="选择检测单位"
                clearable
              @focus="handleQuery"
                  style="width: 170px;"
                >
                <el-option
                  v-for="item in dishesInfoList"
                  :key="item.nickName"
                  :value="item.nickName"
                  :label="item.nickName"
                >
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
              <el-col :span="5">
                <el-form-item >
                  <div class="sub-title">监理单位</div>
                 <!-- <el-input v-model="defaultForms.beizhu9" style="width: 180px;" /> -->
                  <el-select
                    v-model="defaultForms.beizhu9"
                    placeholder="选择监理单位"
                    clearable
                    @focus="handleQuery1"
                    style="width: 170px;"
                  >
                    <el-option
                      v-for="item in dishesInfoList1"
                      :key="item.nickName"
                      :value="item.nickName"
                      :label="item.nickName"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            <el-col :span="4">
              <el-form-item >
                <div class="sub-title">检测方式</div>
                <el-select v-model="defaultForms.beizhu10" clearable placeholder="请选择" style="width: 150px;" >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item >
                <div class="sub-title">检测方法</div>
                <el-select v-model="defaultForms.beizhu11" clearable placeholder="请选择" style="width: 150px;" >
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="">
                <div class="sub-title">申请检测时间</div>
                <el-date-picker
                  v-model="defaultForms.testTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="5">
              <el-form-item label="">
                <div class="sub-title">检测部位</div>
                <el-input v-model="defaultForms.beizhu12" style="width: 150px;" />
              </el-form-item>
            </el-col>
            <!--
            <el-col :span="6">
              <el-form-item label="">
                <div class="sub-title">道路浇筑时间</div>
                <el-date-picker
                  v-model="defaultForms.beizhu12"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            -->
            <el-col :span="7">
            <el-form-item label="">
              <div class="sub-title">起始里程</div>
              <el-input  style="width: 60px;" disabled value="DK" /> <el-input v-model="defaultForms.testStartingDistance" style="width: 60px;" /><span> + </span><el-input v-model="defaultForms.beizhu14" style="width: 60px;" />
            </el-form-item>
            </el-col>
            <el-col :span="7">
            <el-form-item label="">
              <div class="sub-title">结束里程</div>
              <el-input  style="width: 60px;" disabled value="DK" /> <el-input v-model="defaultForms.testEndingDistance" style="width: 60px;" /><span> + </span><el-input v-model="defaultForms.beizhu15" style="width: 60px;" />
            </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="">
                <div class="sub-title">检测长度</div>
                <el-input v-model="defaultForms.testLength" style="width: 120px;" />
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="cancelCU()">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="submitForm(defaultForms)">提交报检单</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
import crudTunnelInformation from '@/api/system/tunnelInformation'
import store from '@/store'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { select, changeStatue, selectByStatueFenye, selectByStatue, selectByTunnelName } from '@/api/system/tunnelInformation'
import { createTest, editForm, delForm, listDishesInfo, listDishesInfo1 } from '@/api/system/testInformation'

const defaultForm = { tunnelInforId: null, projectName: null, sectionName: null, tunnelId: null, tunnelName: null, worksiteName: null, tunnelStartingDistance: null, tunnelEndingDistance: null, tunnelLength: null, repairCompany: null, supervisionCompany: null, detectionCompany: null, constructionCompany: null, userId: null, userName: null, deptId: null, time: null, beizhu1: null, beizhu2: null, beizhu3: null, beizhu4: null, beizhu5: null, beizhu6: null, beizhu7: null, beizhu8: null, beizhu9: null, beizhu10: null, beizhu11: null, beizhu12: null, beizhu13: null, beizhu14: null, beizhu15: null }
export default {
  name: 'TunnelInformation',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '道路信息', url: 'api/tunnelInformation', idField: 'tunnelInforId', sort: 'tunnelInforId,desc', crudMethod: { ...crudTunnelInformation }})
  },
  data() {
    return {
      defaultForms: {
        testInforId: null,
        testId: null,
        testTime: null,
        testStartingDistance: null,
        testEndingDistance: null,
        testLength: null,
        wallRockType: null,
        supportTickness: null,
        separationDistance: null,
        meshDistance: null,
        annularBarDistance: null,
        reinforPrtTickness: null,
        secLineArchTickness: null,
        secLineWallTickness: null,
        secLineInverArchTickness: null,
        secLineFilerTickness: null,
        projectName: null,
        sectionName: null,
        tunnelName: null,
        worksiteName: null,
        statute: null,
        beizhu1: null,
        beizhu2: null,
        beizhu3: null,
        beizhu4: null,
        beizhu5: null,
        beizhu6: null,
        beizhu7: null,
        beizhu8: null,
        beizhu9: null,
        beizhu10: null,
        beizhu11: null,
        beizhu12: null,
        beizhu13: null,
        beizhu14: null,
        beizhu15: null
      },
      dishesInfoList: [],
      dishesInfoList1: [],
      options: [{
        value: '自检',
        label: '自检'
      }, {
        value: '第三方',
        label: '第三方'
      }],
      options1: [{
        value: '地质雷达法',
        label: '地质雷达法'
      }, {
        value: '瞬变电磁法',
        label: '瞬变电磁法'
      },
      {
        value: '其他',
        label: '其他'
      }],
      BaojianDialog: false,
      dialog: false,
      DataList: [],
      Data: [],
      DataForm: [],
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
        { key: 'tunnelId', display_name: '道路编号' },
        { key: 'tunnelName', display_name: '道路名称' },
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
      'user',
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
    handleQuery() {
      listDishesInfo().then(response => {
        this.dishesInfoList = response
      })
    },
    handleQuery1() {
      listDishesInfo1().then(response => {
        this.dishesInfoList1 = response
      })
    },
    cancelCU() {
      this.BaojianDialog = false
      delForm(this.defaultForms.testInforId).then(response => {
      })
    },
    submitForm(formName) {
      editForm(formName).then(response => {
        this.BaojianDialog = false
        this.crud.notify('提交成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
      })
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
    askBaojian(data) {
      createTest(data).then(response => {
        this.defaultForms = response
        this.defaultForms.beizhu5 = this.user.nickName
        this.defaultForms.beizhu6 = this.user.username
        this.defaultForms.beizhu7 = this.user.phone
      })
      this.BaojianDialog = true
    },
    // 上传文件
    look(data) {
      select(data).then(response => {
        this.DataList = response
      })
      this.TunnelDialog = true
    },
    cancelCUs() {
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
