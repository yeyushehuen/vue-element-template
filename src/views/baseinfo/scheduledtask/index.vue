<template>
  <base-table :form-options="formOptions" :columns="columns">
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
  name: 'Scheduledtask',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [
        actionCode.add,
        actionCode.update,
        actionCode.delete,
        actionCode.import,
        actionCode.export,
        actionCode.disable,
        actionCode.enable,
        actionCode.translate
      ],
      actionTextConfig
    }
  },
  methods: {
    stopTask() {},
    startTask() {},
    actionHandler(type) {
      const _this = this
      switch (type) {
        case actionCode.start:
          _this.startTask()
          break
        case actionCode.stop:
          _this.stopTask()
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
