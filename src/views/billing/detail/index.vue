<template>
  <div style="position: relative;">
    <base-table :action-code="actionCode" :import-config="importConfig" :form-options="formOptions" :columns="columns" api="/paymentReport/list" @dispatch="actionHandler">
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
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { paymentReportUnverify, paymentReportVerify } from '../../../api/bill'
const { formOptions, columns } = tableConfig

export default {
  name: 'BillingDetail',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.audit, actionCode.reviews, actionCode.clear, actionCode.export, actionCode.import],
      innerDrawer: false,
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      actionCallback: () => {},
      importConfig: {
        action: '/paymentReport/upload',
        template: '/paymentReport/downloadTemp',
        accept: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    async auditHandler(selectIds) {
      paymentReportVerify(selectIds)
    },
    async reviewsHandler(selectIds) {
      paymentReportUnverify(selectIds)
    },
    async clearHandler(selectIds) {
      // todo清除
    },
    exportHandler() {
      // todo 导出逻辑 /paymentReport/export
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add: // todo审核
          _this.auditHandler()
          break
        case actionCode.reviews: // todo反审核
          _this.reviewsHandler(selectIds)
          _this.selectIds = selectIds.join(',')
          break
        case actionCode.clear:
          _this.clearHandler(selectIds)
          break
        case actionCode.export:
          _this.exportHandler(selectIds, query)
          break
        default:
          break
      }
    },
    showDetail() {
      this.innerDrawer = true
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
