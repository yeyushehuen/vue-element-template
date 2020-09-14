<template>
  <div>
    <base-table
      v-loading="loading"
      :element-loading-text="loadingText"
      :summary-method="summaryMethod"
      :all-summary-method="allSummaryMethod"
      :show-summary="true"
      :command-validator="commandValidator"
      :action-code="actionCode"
      :form-options="formOptions"
      api="/paymentAnalysis/list"
      :columns="columns"
      @dispatch="actionHandler"
    >
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" title="重算" width="520px" :visible.sync="calculationDialog" :before-close="handleClose">
      <el-checkbox-group v-model="method" style="margin-bottom: 41px;">
        <el-checkbox label="TYPE">重算类型转换</el-checkbox>
        <el-checkbox label="EXRATE">重算汇率</el-checkbox>
        <el-checkbox label="COST">重算内部型号</el-checkbox>
      </el-checkbox-group>
      <span slot="footer">
        <el-button size="small" @click="calculationDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="onCalSubmit">执行</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import { billDataReconciliation, billDataSummary, billDataAllsum } from '@/api/bill'
import { downLoadFile, numberFormat } from '../../../utils'
import tableConfig from './props.js'

const { formOptions, columns } = tableConfig

export default {
  name: 'BillingData',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.reconciliation, actionCode.summary, actionCode.export],
      selectIds: '',
      queryParams: null,
      actionTextConfig,
      actionType: '',
      calculationDialog: false,
      actionCallback: () => {},
      loadingText: '',
      loading: false,
      method: []
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    summaryMethod(param) {
      const { columns, data } = param
      const sums = {}
      columns.forEach((column, index) => {
        if (column.type !== 'number') { // 非数字类型列不合计, 汇率不合计
          sums[column.prop] = '-'
          return
        }
        const values = data ? data.map(item => Number(item[column.prop])) : []
        // if (!values.every(value => isNaN(value))) {
        const indexSum = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
        sums[column.prop] = numberFormat(indexSum)
      })

      return sums
    },
    async allSummaryMethod(query) {
      const res = await billDataAllsum(query)
      const summary = res.data || {}
      Object.keys(summary).forEach(key => {
        summary[key] = numberFormat(summary[key], 2, {}, '-')
      })

      return summary
    },
    callback(response) {
      if (response && response.code !== 200) {
        this.$message.error(response.message)
      } else {
        this.$message.success(response.message)
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/paymentAnalysis/export', params, '数据详情', true)
    },
    async reconciliationHandler(selectIds, query) {
      try {
        this.loading = true
        this.loadingText = '正在重算……'
        const params = selectIds.length > 0 ? { id: selectIds.join(','), method: query.method } : query
        const response = await billDataReconciliation({
          data: params
        })
        this.loading = false
        this.callback(response)
      } catch (error) {
        this.loading = false
      }
    },
    async summaryHandler(selectIds, query) {
      try {
        this.loading = true
        this.loadingText = '正在汇总……'
        const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
        const response = await billDataSummary({ data: params })
        this.loading = false
        this.callback(response)
      } catch (error) {
        this.loading = false
      }
    },
    calcProxy(selectIds, query) {
      this.calculationDialog = true
      this.selectIds = selectIds
      this.queryParams = query
    },
    onCalSubmit() {
      if (this.method.length < 1) {
        this.$message.warning('至少选择一项')
        return false
      }
      const query = { ...this.queryParams, method: this.method.join() }
      this.reconciliationHandler(this.selectIds, query)
    },
    // async pushEASHandler(query) {
    //   try {
    //     this.loading = true
    //     this.loadingText = '正在推送……'
    //     const { period, accountId } = query
    //     const response = await billDataPushEAS({ accountId, period })
    //     this.loading = false
    //     this.callback(response)
    //   } catch (error) {
    //     this.loading = false
    //   }
    // },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.actionCallback = callback
      _this.actionType = type
      switch (type) {
        case actionCode.reconciliation: // 重算
          // _this.reconciliationHandler(selectIds, query)
          _this.calcProxy(selectIds, query)
          break
        case actionCode.summary: // 汇总
          _this.summaryHandler(selectIds, query)
          break
        // case actionCode.pushEAS: // 汇总
        //   _this.pushEASHandler(query)
        //   break
        case actionCode.export: // 导出
          _this.exportHandler(selectIds, query)
          break
        default:
          break
      }
    },
    commandValidator({ selectIds, selectRows, query, command }) {
      query = query || {}
      const _this = this
      if (command === actionCode.export) {
        if (Object.keys(query || {}).length < 1 && selectIds.length < 1) {
          _this.$message.warning('请勾选数据或选择查询条件导出')
          return false
        }
      } else if (command === actionCode.pushEAS) {
        if (!query.period) {
          _this.$message.warning('期间必选')
          return false
        }
      } else if (selectIds.length < 1 && !query.period) {
        _this.$message.warning('请勾选数据或选择期间后再进行操作')
        return false
      }

      return true
    }
  }
}
</script>

<style scoped>
</style>
