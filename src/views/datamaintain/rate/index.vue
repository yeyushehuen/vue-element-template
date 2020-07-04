<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/exchangeRate/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`货币管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="rateForm" size="small" label-position="left" :model="rateForm" :rules="rules" label-width="80px">
        <el-form-item label="原币" prop="originCurrency">
          <el-select v-model="rateForm.standardCurrency" style="width: 100%" placeholder="请选择本币">
            <el-option v-for="option in selectOption.currencyDropdown" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="本币" prop="standardCurrency">
          <el-select v-model="rateForm.standardCurrency" style="width: 100%" placeholder="请选择本币">
            <el-option v-for="option in selectOption.currencyDropdown" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="汇率" prop="exchangeRate">
          <el-input v-model="rateForm.exchangeRate" />
        </el-form-item>
        <el-form-item label="生效时间" prop="effectTime">
          <el-date-picker v-model="rateForm.effectTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('rateForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('rateForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { currencyDropdown } from '@/api/common'
import { toSelectOption } from '@/utils'
import { deleteExchangeRate, addExchangeRate, updateExchangeRate, getExchangeRateById } from '@/api/dataMaintain'
const { formOptions, columns } = tableConfig

export default {
  name: 'Rate',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.import, actionCode.export],
      dialogVisible: false,
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      selectOption: {
        currencyDropdown: []
      },
      actionCallback: () => {},
      rateForm: {
        originCurrency: '',
        standardCurrency: '',
        exchangeRate: '',
        effectTime: ''
      },
      rules: {
        originCurrency: [
          { required: true, message: '请选择原币', trigger: 'blur' }
        ],
        standardCurrency: [
          { required: true, message: '请选择本币', trigger: 'blur' }
        ],
        exchangeRate: [
          { required: true, message: '请填写汇率', trigger: 'blur' }
        ],
        effectTime: [
          { required: true, message: '请选择生效时间', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getSelectOption()
  },
  methods: {
    async getSelectOption() {
      const currencyDropdownRes = await currencyDropdown()
      this.selectOption.currencyDropdown = toSelectOption(currencyDropdownRes, 'code', 'name')
    },
    clearFormVal() {
      const _this = this
      Object.keys(_this.rateForm).forEach(key => {
        _this.rateForm[key] = ''
      })
    },
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.rateForm).forEach(key => {
        _this.rateForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteExchangeRate(selectIds.join(','))
      console.log('res', res)
      if (res && res.code === 200) {
        this.actionCallback()
      }
    },
    async updateHandler(selectIds) {
      const res = await getExchangeRateById(selectIds[0])
      console.log('res', res)
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
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
      // _this.clearFormVal()
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          break
        case actionCode.update: // 修改
          _this.dialogVisible = true
          _this.updateHandler(selectIds)
          _this.selectIds = selectIds.join(',')
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
      const apiRep = {
        [actionCode.add]: addExchangeRate,
        [actionCode.update]: updateExchangeRate
      }
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          apiRep[_this.editStatus]({ id: _this.selectIds, data: _this[formName] }).then(res => {
            _this.actionCallback()
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
