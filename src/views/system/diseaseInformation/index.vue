<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
<!--        <label class="el-form-item-label">病害id</label>-->
<!--        <el-input v-model="query.id" clearable placeholder="病害id" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <label class="el-form-item-label">图片名字</label>
        <el-input v-model="query.imgName" clearable placeholder="图片名字" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害编号</label>
        <el-input v-model="query.disNumber" clearable placeholder="病害编号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害道路名称</label>
        <el-input v-model="query.disRoadName" clearable placeholder="病害道路名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害类型</label>
        <el-input v-model="query.disType" clearable placeholder="病害类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害对应的文件路径</label>
        <el-input v-model="query.disFile" clearable placeholder="病害对应的文件路径" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害中心纬度坐标</label>
        <el-input v-model="query.disLat" clearable placeholder="病害中心纬度坐标" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害中心经度坐标</label>
        <el-input v-model="query.disLon" clearable placeholder="病害中心经度坐标" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害起始里程</label>
        <el-input v-model="query.disStartMileage" clearable placeholder="病害起始里程" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害终止里程</label>
        <el-input v-model="query.disEndMileage" clearable placeholder="病害终止里程" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害顶深</label>
        <el-input v-model="query.disTopDepth" clearable placeholder="病害顶深" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害底深</label>
        <el-input v-model="query.disBottomDepth" clearable placeholder="病害底深" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害在车道中的起始宽度（二维识别时空缺）</label>
        <el-input v-model="query.disStartWidth" clearable placeholder="病害在车道中的起始宽度（二维识别时空缺）" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害在车道中的终止宽度（二维识别时空缺）</label>
        <el-input v-model="query.disEndWidth" clearable placeholder="病害在车道中的终止宽度（二维识别时空缺）" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害尺寸信息 长*宽*高</label>
        <el-input v-model="query.disSizeInfor" clearable placeholder="病害尺寸信息 长*宽*高" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
<!--        <label class="el-form-item-label">处置意见</label>-->
<!--        <el-input v-model="query.disOpSuggestion" clearable placeholder="处置意见" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <label class="el-form-item-label">道路起点的纬度</label>
        <el-input v-model="query.roadStartLat" clearable placeholder="道路起点的纬度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">道路起点的经度</label>
        <el-input v-model="query.roadStartLon" clearable placeholder="道路起点的经度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">道路终点的纬度</label>
        <el-input v-model="query.roadEndLat" clearable placeholder="道路终点的纬度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">道路终点的经度</label>
        <el-input v-model="query.roadEndLon" clearable placeholder="道路终点的经度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">上传用户</label>
        <el-input v-model="query.userName" clearable placeholder="上传用户" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">上传用户ID</label>
        <el-input v-model="query.userId" clearable placeholder="上传用户ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
<!--        <label class="el-form-item-label">备用字段1</label>-->
<!--        <el-input v-model="query.spare1" clearable placeholder="备用字段1" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备用字段2</label>-->
<!--        <el-input v-model="query.spare2" clearable placeholder="备用字段2" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备用字段3</label>-->
<!--        <el-input v-model="query.spare3" clearable placeholder="备用字段3" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备用字段4</label>-->
<!--        <el-input v-model="query.spare4" clearable placeholder="备用字段4" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备用字段5</label>-->
<!--        <el-input v-model="query.spare5" clearable placeholder="备用字段5" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
<!--        <label class="el-form-item-label">备用字段6</label>-->
<!--        <el-input v-model="query.spare6" clearable placeholder="备用字段6" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
<!--          <el-form-item label="病害id" prop="id">-->
<!--            <el-input v-model="form.id" style="width: 370px;" />-->
<!--          </el-form-item>-->
          <el-form-item label="图片名字">
            <el-input v-model="form.imgName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害编号">
            <el-input v-model="form.disNumber" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害道路名称">
            <el-input v-model="form.disRoadName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害类型">
            <el-input v-model="form.disType" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害对应的文件路径">
            <el-input v-model="form.disFile" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害中心纬度坐标">
            <el-input v-model="form.disLat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害中心经度坐标">
            <el-input v-model="form.disLon" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害起始里程">
            <el-input v-model="form.disStartMileage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害终止里程">
            <el-input v-model="form.disEndMileage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害顶深">
            <el-input v-model="form.disTopDepth" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害底深">
            <el-input v-model="form.disBottomDepth" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害在车道中的起始宽度（二维识别时空缺）">
            <el-input v-model="form.disStartWidth" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害在车道中的终止宽度（二维识别时空缺）">
            <el-input v-model="form.disEndWidth" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害尺寸信息 长*宽*高">
            <el-input v-model="form.disSizeInfor" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="处置意见">
            <el-input v-model="form.disOpSuggestion" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路起点的纬度">
            <el-input v-model="form.roadStartLat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路起点的经度">
            <el-input v-model="form.roadStartLon" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路终点的纬度">
            <el-input v-model="form.roadEndLat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="道路终点的经度">
            <el-input v-model="form.roadEndLon" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createTime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="上传用户">
            <el-input v-model="form.userName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="上传用户ID">
            <el-input v-model="form.userId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备用字段1">
            <el-input v-model="form.spare1" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备用字段2">
            <el-input v-model="form.spare2" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备用字段3">
            <el-input v-model="form.spare3" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备用字段4">
            <el-input v-model="form.spare4" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备用字段5">
            <el-input v-model="form.spare5" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="备用字段6">
            <el-input v-model="form.spare6" style="width: 370px;" />
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
        <el-table-column prop="id" label="病害id" />
        <el-table-column prop="imgName" label="图片名字" />
        <el-table-column prop="disNumber" label="病害编号" />
        <el-table-column prop="disRoadName" label="病害道路名称" />
        <el-table-column prop="disType" label="病害类型" />
        <el-table-column prop="disFile" label="病害对应的文件路径" />
        <el-table-column prop="disLat" label="病害中心纬度坐标" />
        <el-table-column prop="disLon" label="病害中心经度坐标" />
        <el-table-column prop="disStartMileage" label="病害起始里程" />
        <el-table-column prop="disEndMileage" label="病害终止里程" />
        <el-table-column prop="disTopDepth" label="病害顶深" />
        <el-table-column prop="disBottomDepth" label="病害底深" />
        <el-table-column prop="disStartWidth" label="病害在车道中的起始宽度（二维识别时空缺）" />
        <el-table-column prop="disEndWidth" label="病害在车道中的终止宽度（二维识别时空缺）" />
        <el-table-column prop="disSizeInfor" label="病害尺寸信息 长*宽*高" />
        <el-table-column prop="disOpSuggestion" label="处置意见" />
        <el-table-column prop="roadStartLat" label="道路起点的纬度" />
        <el-table-column prop="roadStartLon" label="道路起点的经度" />
        <el-table-column prop="roadEndLat" label="道路终点的纬度" />
        <el-table-column prop="roadEndLon" label="道路终点的经度" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="userName" label="上传用户" />
        <el-table-column prop="userId" label="上传用户ID" />
        <el-table-column prop="spare1" label="备用字段1" />
        <el-table-column prop="spare2" label="备用字段2" />
        <el-table-column prop="spare3" label="备用字段3" />
        <el-table-column prop="spare4" label="备用字段4" />
        <el-table-column prop="spare5" label="备用字段5" />
        <el-table-column prop="spare6" label="备用字段6" />
        <el-table-column v-if="checkPer(['admin','diseaseInformation:edit','diseaseInformation:del'])" label="操作" width="150px" align="center">
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
    </div>
  </div>
</template>

<script>
import crudDiseaseInformation from '@/api/diseaseInformation'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { id: null, imgName: null, disNumber: null, disRoadName: null, disType: null, disFile: null, disLat: null, disLon: null, disStartMileage: null, disEndMileage: null, disTopDepth: null, disBottomDepth: null, disStartWidth: null, disEndWidth: null, disSizeInfor: null, disOpSuggestion: null, roadStartLat: null, roadStartLon: null, roadEndLat: null, roadEndLon: null, createTime: null, userName: null, userId: null, spare1: null, spare2: null, spare3: null, spare4: null, spare5: null, spare6: null }
export default {
  name: 'DiseaseInformation',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'api/disease_information', url: 'api/diseaseInformation', idField: 'id', sort: 'id,desc', crudMethod: { ...crudDiseaseInformation }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'diseaseInformation:add'],
        edit: ['admin', 'diseaseInformation:edit'],
        del: ['admin', 'diseaseInformation:del']
      },
      rules: {
        id: [
          { required: true, message: '病害id不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'id', display_name: '病害id' },
        { key: 'imgName', display_name: '图片名字' },
        { key: 'disNumber', display_name: '病害编号' },
        { key: 'disRoadName', display_name: '病害道路名称' },
        { key: 'disType', display_name: '病害类型' },
        { key: 'disFile', display_name: '病害对应的文件路径' },
        { key: 'disLat', display_name: '病害中心纬度坐标' },
        { key: 'disLon', display_name: '病害中心经度坐标' },
        { key: 'disStartMileage', display_name: '病害起始里程' },
        { key: 'disEndMileage', display_name: '病害终止里程' },
        { key: 'disTopDepth', display_name: '病害顶深' },
        { key: 'disBottomDepth', display_name: '病害底深' },
        { key: 'disStartWidth', display_name: '病害在车道中的起始宽度（二维识别时空缺）' },
        { key: 'disEndWidth', display_name: '病害在车道中的终止宽度（二维识别时空缺）' },
        { key: 'disSizeInfor', display_name: '病害尺寸信息 长*宽*高' },
        { key: 'disOpSuggestion', display_name: '处置意见' },
        { key: 'roadStartLat', display_name: '道路起点的纬度' },
        { key: 'roadStartLon', display_name: '道路起点的经度' },
        { key: 'roadEndLat', display_name: '道路终点的纬度' },
        { key: 'roadEndLon', display_name: '道路终点的经度' },
        { key: 'userName', display_name: '上传用户' },
        { key: 'userId', display_name: '上传用户ID' },
        { key: 'spare1', display_name: '备用字段1' },
        { key: 'spare2', display_name: '备用字段2' },
        { key: 'spare3', display_name: '备用字段3' },
        { key: 'spare4', display_name: '备用字段4' },
        { key: 'spare5', display_name: '备用字段5' },
        { key: 'spare6', display_name: '备用字段6' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
