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
    exportHandler() {
      // todo 导出逻辑
    },
    reconciliationHandler() {
      // todo 导出逻辑
    },
    summaryHandler() {
      // todo 导出逻辑
    },
    actionHandler(type, { selectIds, selectRows, callback }) {
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
          _this.exportHandler()
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
