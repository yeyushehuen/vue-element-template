<template>
  <div>
    <base-table :action-code="actionCode" :validate="false" :form-options="formOptions" :columns="columns" api="/paymentSummary/list" @dispatch="actionHandler">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" title="期末结账" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <div style="text-align: center;">
        <el-radio v-model="radio1" label="1" border>月结</el-radio>
        <el-radio v-model="radio1" label="2" border>反月结</el-radio>
      </div>
      <el-alert
        style="margin-top: 20px;"
        title="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
        type="warning"
      />
    </el-dialog>
  </div>
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
      actionCode: [actionCode.setUp, actionCode.checkOut, actionCode.export],
      selectIds: '',
      dialogVisible: false,
      actionTextConfig,
      actionCallback: () => {},
      radio1: '1'
    }
  },
  methods: {
    exportHandler() {
      // todo 导出 //export
    },
    setUpHandler() {
      // todo 结账
      this.dialogVisible = true
    },
    checkOutHandler() {
      this.dialogVisible = true
      // todo 反结账
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.actionCallback = callback
      switch (type) {
        case actionCode.setUp: // 结账
          _this.setUpHandler()
          break
        case actionCode.checkOut: // 反结账
          _this.checkOutHandler()
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
    }
  }
}
</script>

<style scoped>
</style>
