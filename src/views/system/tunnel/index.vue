<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">隧道ID</label>
        <el-input v-model="query.tunnelId" clearable placeholder="隧道ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">检测位置的名称</label>
        <el-input v-model="query.detectLocation" clearable placeholder="检测位置的名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">检测位置的经度</label>
        <el-input v-model="query.detectLocationLng" clearable placeholder="检测位置的经度(标红点的位置)" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">检测位置的纬度</label>
        <el-input v-model="query.detectLocationLat" clearable placeholder="检测位置的纬度(标红点的位置)" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">检测位置所属的省份</label>
        <el-input v-model="query.province" clearable placeholder="检测位置所属的省份" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">城市</label>
        <el-input v-model="query.city" clearable placeholder="城市" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">区域</label>
        <el-input v-model="query.district" clearable placeholder="区域" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">隧道的病害类型</label>
        <el-input v-model="query.diseaseType" clearable placeholder="隧道的病害类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害描述</label>
        <el-input v-model="query.diseaseDescription" clearable placeholder="病害描述" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">病害的修复方法</label>
        <el-input v-model="query.repairMethod" clearable placeholder="病害的修复方法" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">该隧道病害的修复状态（1：紧急；2：一般；3：正在修复；4：已修复）</label>
        <el-input v-model="query.tunnelState" clearable placeholder="该隧道病害的修复状态（1：紧急；2：一般；3：正在修复；4：已修复）" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">隧道起点的经度</label>
        <el-input v-model="query.tunnelStartPointLng" clearable placeholder="隧道起点的经度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">隧道起点的纬度</label>
        <el-input v-model="query.tunnelStartPointLat" clearable placeholder="隧道起点的纬度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">隧道终点的经度</label>
        <el-input v-model="query.tunnelStopPointLng" clearable placeholder="隧道终点的经度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">隧道终点的纬度</label>
        <el-input v-model="query.tunnelStopPointLat" clearable placeholder="隧道终点的纬度" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
<!--        <label class="el-form-item-label">备注</label>-->
<!--        <el-input v-model="query.remark" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />-->
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
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="隧道ID">
            <el-input v-model="form.tunnelId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测位置的名称">
            <el-input v-model="form.detectLocation" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测位置的经度">
            <el-input v-model="form.detectLocationLng" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测位置的纬度">
            <el-input v-model="form.detectLocationLat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="检测位置所属的省份">
            <el-input v-model="form.province" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="form.city" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="区域">
            <el-input v-model="form.district" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="隧道的病害类型">
            <el-input v-model="form.diseaseType" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害描述">
            <el-input v-model="form.diseaseDescription" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="病害的修复方法">
            <el-input v-model="form.repairMethod" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="该隧道病害的修复状态（1：紧急；2：一般；3：正在修复；4：已修复）">
            <el-input v-model="form.tunnelState" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="隧道起点的经度">
            <el-input v-model="form.tunnelStartPointLng" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="隧道起点的纬度">
            <el-input v-model="form.tunnelStartPointLat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="隧道终点的经度">
            <el-input v-model="form.tunnelStopPointLng" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="隧道终点的纬度">
            <el-input v-model="form.tunnelStopPointLat" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createTime" style="width: 370px;" />
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
        <el-table-column prop="tunnelId" label="隧道ID" />
        <el-table-column prop="detectLocation" label="检测位置的名称" />
        <el-table-column prop="detectLocationLng" label="检测位置的经度" />
        <el-table-column prop="detectLocationLat" label="检测位置的纬度" />
        <el-table-column prop="province" label="检测位置所属的省份" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="district" label="区域" />
        <el-table-column prop="diseaseType" label="隧道的病害类型" />
        <el-table-column prop="diseaseDescription" label="病害描述" />
        <el-table-column prop="repairMethod" label="病害的修复方法" />
        <el-table-column prop="tunnelState" label="该隧道病害的修复状态（1：紧急；2：一般；3：正在修复；4：已修复）" />
        <el-table-column prop="tunnelStartPointLng" label="隧道起点的经度" />
        <el-table-column prop="tunnelStartPointLat" label="隧道起点的纬度" />
        <el-table-column prop="tunnelStopPointLng" label="隧道终点的经度" />
        <el-table-column prop="tunnelStopPointLat" label="隧道终点的纬度" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="remark1" label="备注" />
        <el-table-column prop="remark2" label="备注" />
        <el-table-column prop="remark3" label="备注" />
        <el-table-column prop="remark4" label="备注" />
        <el-table-column prop="remark5" label="备注" />
        <el-table-column prop="remark6" label="备注" />
        <el-table-column prop="remark7" label="备注" />
        <el-table-column prop="remark8" label="备注" />
        <el-table-column v-if="checkPer(['admin','tunnel:edit','tunnel:del'])" label="操作" width="150px" align="center">
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
import crudTunnel from '@/api/tunnel'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { tunnelId: null, detectLocation: null, detectLocationLng: null, detectLocationLat: null, province: null, city: null, district: null, diseaseType: null, diseaseDescription: null, repairMethod: null, tunnelState: null, tunnelStartPointLng: null, tunnelStartPointLat: null, tunnelStopPointLng: null, tunnelStopPointLat: null, createTime: null, remark: null, remark1: null, remark2: null, remark3: null, remark4: null, remark5: null, remark6: null, remark7: null, remark8: null }
export default {
  name: 'Tunnel',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'api/tunnel', url: 'api/tunnel', idField: 'tunnelId', sort: 'tunnelId,desc', crudMethod: { ...crudTunnel }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'tunnel:add'],
        edit: ['admin', 'tunnel:edit'],
        del: ['admin', 'tunnel:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'tunnelId', display_name: '隧道ID' },
        { key: 'detectLocation', display_name: '检测位置的名称' },
        { key: 'detectLocationLng', display_name: '检测位置的经度(标红点的位置)' },
        { key: 'detectLocationLat', display_name: '检测位置的纬度(标红点的位置)' },
        { key: 'province', display_name: '检测位置所属的省份' },
        { key: 'city', display_name: '城市' },
        { key: 'district', display_name: '区域' },
        { key: 'diseaseType', display_name: '隧道的病害类型' },
        { key: 'diseaseDescription', display_name: '病害描述' },
        { key: 'repairMethod', display_name: '病害的修复方法' },
        { key: 'tunnelState', display_name: '该隧道病害的修复状态（1：紧急；2：一般；3：正在修复；4：已修复）' },
        { key: 'tunnelStartPointLng', display_name: '隧道起点的经度' },
        { key: 'tunnelStartPointLat', display_name: '隧道起点的纬度' },
        { key: 'tunnelStopPointLng', display_name: '隧道终点的经度' },
        { key: 'tunnelStopPointLat', display_name: '隧道终点的纬度' },
        { key: 'remark', display_name: '备注' },
        { key: 'remark1', display_name: '备注' },
        { key: 'remark2', display_name: '备注' },
        { key: 'remark3', display_name: '备注' },
        { key: 'remark4', display_name: '备注' },
        { key: 'remark5', display_name: '备注' },
        { key: 'remark6', display_name: '备注' },
        { key: 'remark7', display_name: '备注' },
        { key: 'remark8', display_name: '备注' }
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
