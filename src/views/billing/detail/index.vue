<template>
  <div style="position: relative;">
    <base-table :action-code="actionCode" :import-config="importConfig" :form-options="formOptions" :columns="columns" api="/paymentReport/list" @dispatch="actionHandler">
      <template slot="billingDetails" slot-scope="scope">
        <i class="el-icon-connection" @click="showDetail(scope.row)" />
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
          accept=".csv"
        >
          <i class="el-icon-upload2" />
        </el-upload>
      </template>
    </base-table>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { paymentReportUnverify, paymentReportVerify, paymentReportClear } from '../../../api/bill'
import { downLoadFile } from '../../../utils'
const { formOptions, columns } = tableConfig

export default {
  name: 'BillingDetail',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.audit, actionCode.reviews, actionCode.clear, actionCode.export, actionCode.import],
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      actionCallback: () => {},
      importConfig: {
        action: '/paymentReport/upload',
        template: '',
        accept: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    callback(response) {
      if (response && response.code !== 200) {
        this.$message.error(response.message)
      } else {
        this.$message.success(response.message)
      }
    },
    async auditHandler(selectIds) {
      const response = await paymentReportVerify({ id: selectIds.join(',') })
      this.callback(response)
    },
    async reviewsHandler(selectIds) {
      const response = await paymentReportUnverify({ id: selectIds.join(',') })
      this.callback(response)
    },
    async clearHandler(selectIds) {
      const response = await paymentReportClear({ id: selectIds.join(',') })
      this.callback(response)
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/paymentReport/export', params, '数据详情', true)
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.audit:
          _this.auditHandler(selectIds)
          break
        case actionCode.reviews:
          _this.reviewsHandler(selectIds)
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
    showDetail(row) {
      this.$router.push({
        // 你要跳转的地址
        path: '/billing/data',
        query: { id: row.id }
      })
      this.$router.push({ path: '/billing/data', query: { id: row.id }})
    },
    uploadFile() {}
  }
}
</script>

<style lang="scss" scoped>
.el-icon-upload2,.el-icon-connection,.el-icon-download{
  font-size: 20px;
  color: #1890ff;
  vertical-align: bottom;
}
</style>
