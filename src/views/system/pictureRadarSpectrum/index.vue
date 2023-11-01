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
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark1" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark2" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark3" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark4" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark5" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark6" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark7" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark8" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">备注</label>
        <el-input v-model="query.remark" clearable placeholder="备注" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="雷达图谱id" prop="spectrumId">
            <el-input v-model="form.spectrumId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="文件存储路径">
            <el-input v-model="form.fileUrl" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="外键，关联tunel表">
            <el-input v-model="form.tunnelId" style="width: 370px;" />
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
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width: 370px;" />
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
        <el-table-column prop="remark1" label="备注" />
        <el-table-column prop="remark2" label="备注" />
        <el-table-column prop="remark3" label="备注" />
        <el-table-column prop="remark4" label="备注" />
        <el-table-column prop="remark5" label="备注" />
        <el-table-column prop="remark6" label="备注" />
        <el-table-column prop="remark7" label="备注" />
        <el-table-column prop="remark8" label="备注" />
        <el-table-column prop="remark" label="备注" />
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
