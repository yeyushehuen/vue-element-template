<template>
  <div>
    <base-table v-loading="loading" :element-loading-text="loadingText" :action-code="actionCode" :validate="false" :form-options="formOptions" :columns="columns" api="/paymentSummary/list" :command-validator="commandValidator" @dispatch="actionHandler">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="modalTitle[checkType]" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="alert-text">
        {{ '当前已结账期间为：' + checkPeriod + '，现' + modalTitle[checkType] + '至期间：' + getPeriod() }}
      </div>
      <span slot="footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="onCheckOnfirm">执行</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { paymentSummaryCheckout, paymentSummaryRecheckout, paymentSummaryPushEAS, paymentSummaryCheckPeriod } from '@/api/bill'
import { downLoadFile, deleteNullProps, parseTime } from '../../../utils'
const { formOptions, columns } = tableConfig

export default {
  name: 'Cost',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.setUp, actionCode.checkOut, actionCode.pushEAS, actionCode.export],
      selectIds: '',
      dialogVisible: false,
      actionTextConfig,
      actionCallback: () => {},
      loadingText: '',
      checkPeriod: '',
      loading: false,
      radio1: '1',
      modalTitle: {
        setUpHandler: '结账',
        checkOutHandler: '反结账'
      },
      checkType: '' // 结账类型
    }
  },
  methods: {
    callback(response) {
      if (response && response.code !== 200) {
        this.$message.error(response.message)
      } else {
        this.dialogVisible = false
        this.actionCallback()
        this.$message.success(response.message)
      }
    },
    getPeriod() {
      var originTime = new Date(this.checkPeriod)
      const m = originTime.getMonth()

      const curMonth = this.checkType === 'setUpHandler' ? m + 1 : m - 1
      originTime.setMonth(curMonth)

      return parseTime(originTime, '{y}-{m}')
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/paymentSummary/export', deleteNullProps(params))
    },
    async setUpHandler(query) {
      const response = await paymentSummaryCheckout({})
      this.callback(response)
    },
    async checkOutHandler(query) {
      const response = await paymentSummaryRecheckout({})
      this.callback(response)
    },
    async pushEASHandler(query) {
      try {
        this.loading = true
        this.loadingText = '正在推送……'
        const { period, accountId } = query
        const response = await paymentSummaryPushEAS({ accountName: accountId, period })
        this.loading = false
        this.callback(response)
      } catch (error) {
        this.loading = false
      }
    },
    async checkFilter(type) {
      const res = await paymentSummaryCheckPeriod()
      let { data } = res
      data = data || ''
      if (data) {
        this.dialogVisible = true
        this.checkType = type
        this.checkPeriod = data
      } else {
        this.callback(res)
      }
    },
    onCheckOnfirm() {
      const method = this[this.checkType]
      if (method) {
        method()
      }
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.actionCallback = callback
      switch (type) {
        case actionCode.setUp: // 结账
          // _this.setUpHandler(query)
          _this.checkFilter('setUpHandler')
          break
        case actionCode.checkOut: // 反结账
          // _this.checkOutHandler(query)
          _this.checkFilter('checkOutHandler')
          break
        case actionCode.pushEAS: // 推送凭证
          _this.pushEASHandler(query)
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
        // if (!query.period) {
        //   _this.$message.warning('期间必选')
        //   return false
        // }
        return true
      } else if (command === actionCode.pushEAS) {
        if (!query.period) {
          _this.$message.warning('期间必选')
          return false
        }
      } else if (Object.keys(query).length < 1 && selectIds.length < 1) {
        _this.$message.warning('请选择查询条件或者勾选数据后进行导出')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
.alert-text{
  padding: 16px 12px;
  background: #f4f4f4;
  border-radius: 4px;
}
</style>
