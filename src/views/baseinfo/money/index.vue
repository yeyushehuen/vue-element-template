<template>
  <div>
    <base-table :import-config="importConfig" :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/currency/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        <span>-</span>
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`货币管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="moneyForm" size="small" label-position="left" :model="moneyForm" :rules="rules" label-width="80px">
        <el-form-item label="货币名称" prop="name">
          <el-input v-model="moneyForm.name" placeholder="货币名称" />
        </el-form-item>
        <el-form-item label="标准代码" prop="code">
          <el-input v-model="moneyForm.code" placeholder="标准代码" />
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
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { addCurrency, deleteCurrency, getCurrencyById, updateCurrency } from '@/api/baseInfo'
import { downLoadFile } from '../../../utils'

const { formOptions, columns } = tableConfig

export default {
  name: 'Money',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.export, actionCode.import],
      dialogVisible: false,
      editStatus: actionCode.add,
      selectIds: '',
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
      },
      importConfig: {
        action: '/currency/import',
        template: '/currency/downloadTemp',
        accept: ''
      }
    }
  },
  methods: {
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.moneyForm).forEach(key => {
        _this.moneyForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteCurrency(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getCurrencyById(selectIds[0])
      console.log('res', res)
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/currency/export', params, '货币')
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          // _this.resetForm('moneyForm')
          break
        case actionCode.update: // 修改
          _this.dialogVisible = true
          _this.updateHandler(selectIds)
          _this.selectIds = selectIds.join(',')
          break
        case actionCode.delete:
          _this.deleteHandler(selectIds)
          break
        case actionCode.export:
          _this.exportHandler(selectIds, query)
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
      const apiRep = {
        [actionCode.add]: addCurrency,
        [actionCode.update]: updateCurrency
      }
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          apiRep[_this.editStatus]({ id: _this.selectIds, data: _this[formName] }).then(res => {
            this.$message.success(successText[_this.editStatus])
            _this.actionCallback()
            _this.$refs[formName].resetFields()
            _this.dialogVisible = false
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
