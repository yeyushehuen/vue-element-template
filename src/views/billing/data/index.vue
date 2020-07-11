<template>
  <base-table :action-code="actionCode" :form-options="formOptions" api="/paymentAnalysis/list" :columns="columns" @dispatch="actionHandler">
    <template slot="name" slot-scope="scope">
      {{ scope.$index }}
    </template>
  </base-table>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
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
      actionCallback: () => {}
    }
  },
  methods: {
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      // downLoadFile('/account/export', params)
    },
    reconciliationHandler() {
      // todo 导出逻辑 /paymentAnalysis/export
    },
    summaryHandler() {
      // todo 导出逻辑
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.actionCallback = callback
      switch (type) {
        case actionCode.reconciliation: // 重算
          _this.reconciliationHandler()
          break
        case actionCode.summary: // 汇总
          _this.summaryHandler()
          break
        case actionCode.export: // 导出
          _this.exportHandler(selectIds, query)
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
</style>
