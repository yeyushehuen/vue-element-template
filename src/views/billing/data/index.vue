<template>
  <base-table :command-validator="commandValidator" :action-code="actionCode" :form-options="formOptions" api="/paymentAnalysis/list" :columns="columns" @dispatch="actionHandler">
    <template slot="name" slot-scope="scope">
      {{ scope.$index }}
    </template>
  </base-table>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { billDataReconciliation, billDataSummary } from '../../../api/bill'
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
    }
  },
  methods: {
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      // downLoadFile('/account/export', params, '数据详情')
    },
    // TODO 重算
    reconciliationHandler(selectIds, query) {
      billDataReconciliation({
        data: query
      })
    },
    // TODO 汇总
    summaryHandler(selectIds, query) {
      billDataSummary({
        data: query
      })
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
    commandValidator({ selectIds, selectRows, query }) {
      query = query || {}
      const _this = this
      if (selectIds.length < 1 && !query.period) {
        _this.$message.warning('请勾选数据或按区间查询后再进行重算')
        return false
      }
    }
  }
}
</script>

<style scoped>
</style>
