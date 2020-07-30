<template>
  <div>
    <base-table :action-code="actionCode" :validate="false" :form-options="formOptions" :columns="columns" api="/paymentSummary/list" :command-validator="commandValidator" @dispatch="actionHandler">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <!-- <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" title="期末结账" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <div style="text-align: center;">
        <el-radio v-model="radio1" label="1" border>月结</el-radio>
        <el-radio v-model="radio1" label="2" border>反月结</el-radio>
      </div>
      <el-alert
        style="margin-top: 20px;"
        title="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
        type="warning"
      />
    </el-dialog> -->
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { paymentSummaryCheckout, paymentSummaryRecheckout } from '@/api/bill'
import { downLoadFile, deleteNullProps } from '../../../utils'
const { formOptions, columns } = tableConfig

export default {
  name: 'Cost',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.setUp, actionCode.checkOut, actionCode.export],
      selectIds: '',
      dialogVisible: false,
      actionTextConfig,
      actionCallback: () => {},
      radio1: '1'
    }
  },
  methods: {
    callback(response) {
      if (response && response.code !== 200) {
        this.$message.error(response.message)
      } else {
        this.$message.success(response.message)
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      debugger
      downLoadFile('/summary/export', deleteNullProps(params))
    },
    async setUpHandler(query) {
      const response = await paymentSummaryCheckout(query)
      this.callback(response)
    },
    async checkOutHandler(query) {
      const response = await paymentSummaryRecheckout(query)
      this.callback(response)
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.actionCallback = callback
      switch (type) {
        case actionCode.setUp: // 结账
          _this.setUpHandler(query)
          break
        case actionCode.checkOut: // 反结账
          _this.checkOutHandler(query)
          break
        case actionCode.export: // 导出
          _this.exportHandler(selectIds, query)
          break
        default:
          break
      }
    },
    handleClose(done) {
      done()
    },
    commandValidator({ selectIds, selectRows, query, command }) {
      query = query || {}
      const _this = this
      if (command === actionCode.setUp || command === actionCode.checkOut) {
        if (!query.period) {
          _this.$message.warning('请选择区间')
          return false
        }
        return true
      }
      return true
    }
  }
}
</script>

<style scoped>
</style>
