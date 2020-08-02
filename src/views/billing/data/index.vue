<template>
  <div>
    <base-table :summary-method="summaryMethod" :show-summary="true" :command-validator="commandValidator" :action-code="actionCode" :form-options="formOptions" api="/paymentAnalysis/list" :columns="columns" @dispatch="actionHandler">
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
import { billDataReconciliation, billDataSummary } from '../../../api/bill'
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
      actionCallback: () => {}
      // summary1: {
      //   label: '合计',
      //   data: {
      //     amount1: 13414,
      //     amount2: 13414,
      //     amount3: 13414
      //   }
      // },
      // summary2: {
      //   label: '总计',
      //   data: {
      //     amount1: 13414,
      //     amount2: 13414,
      //     amount3: 13414
      //   }
      // }
    }
  },
  methods: {
    summaryMethod(param) {
      const { columns, data } = param
      const sums = {}
      columns.forEach((column, index) => {
        // if (index === 0) { // 首列不合计
        //   sums[index] = '当页合计'
        //   return
        // }
        if (column.type !== 'number' || column.prop === 'exchangeRate') { // 非数字类型列不合计, 汇率不合计
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
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      const response = await billDataReconciliation({
        data: params
      })
      this.callback(response)
    },
    async summaryHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      const response = await billDataSummary({ data: params })
      this.callback(response)
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
