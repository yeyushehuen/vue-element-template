<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" @dispatch="actionHandler" api="/currency/list">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" :title="`货币管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="moneyForm" size="small" label-position="left" :model="moneyForm" :rules="rules" label-width="80px">
        <el-form-item label="货币名称" prop="name">
          <el-input v-model="moneyForm.name" />
        </el-form-item>
        <el-form-item label="标准代码" prop="code">
          <el-input v-model="moneyForm.code" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('moneyForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('moneyForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { addCurrency, updateCurrency, deleteCurrency, getCurrencyById } from '@/api/baseInfo'

const { formOptions, columns } = tableConfig

export default {
  name: 'Money',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.import, actionCode.export],
      dialogVisible: false,
      editStatus: actionCode.add,
      actionTextConfig,
      actionCallback: () => {},
      moneyForm: {
        name: '',
        code: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写货币名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写标准代码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clearFormVal() {
      const _this = this
      Object.keys(_this.moneyForm).forEach(key => {
        _this.moneyForm[key] = ''
      })
    },
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.moneyForm).forEach(key => {
        _this.moneyForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteCurrency(selectIds.join(','))
      console.log('res', res)
    },
    async updateHandler(selectIds) {
      const res = await getCurrencyById(selectIds[0])
      console.log('res', res)
      this.setFormVal()
    },
    importHandler() {
      // todo 导入逻辑
    },
    exportHandler() {
      // todo 导出逻辑
    },
    actionHandler(type, { selectIds, selectRows, callback }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      _this.clearFormVal()
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          break
        case actionCode.update: // 修改
          _this.dialogVisible = true
          _this.updateHandler(selectIds)
          break
        case actionCode.delete:
          _this.deleteHandler(selectIds)
          break
        case actionCode.import:
          _this.importHandler()
          break
        case actionCode.export:
          _this.exportHandler()
          break
        default:
          break
      }
    },
    handleClose(done) {
      done()
    },
    submitForm(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          addCurrency(_this[formName]).then(res => {
            _this.actionCallback()
            return true
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      // this.actionCallback()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
