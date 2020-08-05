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
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { billDataReconciliation, billDataSummary, billDataAllsum } from '../../../api/bill'
import { downLoadFile, numberFormat } from '../../../utils'
const { formOptions, columns } = tableConfig

export default {
  name: 'Cost',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.reconciliation, actionCode.summary, actionCode.export],
      selectIds: '',
      actionTextConfig,
      actionType: '',
      actionCallback: () => {},
      loadingText: '',
      loading: false
    }
  },
  methods: {
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
        const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
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
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.actionCallback = callback
      _this.actionType = type
      switch (type) {
        case actionCode.reconciliation: // 重算
          _this.reconciliationHandler(selectIds, query)
          break
        case actionCode.summary: // 汇总
          _this.summaryHandler(selectIds, query)
          break
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
      } else if (selectIds.length < 1 && !query.period) {
        _this.$message.warning('请勾选数据或选择区间后再进行操作')
        return false
      }

      return true
    }
  }
}
</script>

<style scoped>
</style>
