<template>
  <div style="position: relative;">
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/exchangeRate/list" @dispatch="actionHandler">
      <template slot="billingDetails" slot-scope="scope">
        <i class="el-icon-info" @click="showDetail" />
      </template>
      <template slot="fileUpload" slot-scope="scope">
        <i class="el-icon-download" />
      </template>
      <template slot="paymentState" slot-scope="scope">
        <el-upload
          class="upload-demo"
          action=""
          :auto-upload="true"
          :show-file-list="false"
          :http-request="uploadFile"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        >
          <i class="el-icon-upload" />
        </el-upload>
      </template>
    </base-table>
    <el-drawer
      title="账单详情"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :visible.sync="innerDrawer"
    >
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
      <p>一百万一百万一百万一百万一百万一百万</p>
    </el-drawer>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
const { formOptions, columns } = tableConfig

export default {
  name: 'BillingDetail',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.audit, actionCode.reviews, actionCode.clear, actionCode.import, actionCode.export],
      dialogVisible: false,
      innerDrawer: false,
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      actionCallback: () => {}
    }
  },
  mounted() {
  },
  methods: {
    async deleteHandler(selectIds) {
    },
    async updateHandler(selectIds) {
    },
    importHandler() {
      // todo 导入逻辑
    },
    exportHandler() {
      // todo 导出逻辑
    },
    actionHandler(type, { selectIds, selectRows, callback }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          // _this.resetForm('rateForm')
          break
        case actionCode.update: // 修改
          _this.dialogVisible = true
          _this.updateHandler(selectIds)
          _this.selectIds = selectIds.join(',')
          break
        case actionCode.delete:
          _this.deleteHandler(selectIds)
          break
        case actionCode.import:
          _this.importHandler()
          break
        case actionCode.export:
          _this.exportHandler()
          break
        default:
          break
      }
    },
    showDetail() {
      this.innerDrawer = true
    },
    handleClose(done) {
      done()
    },
    uploadFile() {}
  }
}
</script>

<style lang="scss" scoped>
.el-icon-upload,.el-icon-info,.el-icon-download{
  font-size: 20px;
  color: #1890ff;
  vertical-align: bottom;
}
</style>
