<template>
  <div>
    <base-table :import-config="importConfig" :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/exchangeRate/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        <span>-</span>
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`汇率管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="rateForm" size="small" label-position="left" :model="rateForm" :rules="rules" label-width="80px">
        <el-form-item label="原币" prop="originCurrency">
          <el-select v-model="rateForm.originCurrency" style="width: 100%" placeholder="请选择原币">
            <el-option v-for="option in selectOption.currencyDropdown" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="本币" prop="standardCurrency">
          <el-select v-model="rateForm.standardCurrency" style="width: 100%" placeholder="请选择本币">
            <el-option v-for="option in selectOption.currencyDropdown" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="汇率" prop="exchangeRate">
          <el-input v-model="rateForm.exchangeRate" placeholder="请填写汇率，最多6位小数" />
        </el-form-item>
        <el-form-item style="width: 100%;" label="生效时间" prop="effectTime">
          <el-date-picker v-model="rateForm.effectTime" placeholder="请选择生效时间" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" type="date" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('rateForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('rateForm')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" title="汇率取值方式" width="600px" :visible.sync="valueMethodModal" :before-close="handleClose">
      <div>
        <!-- <el-radio v-model="typeId" label="1" border>月初第一天</el-radio>
        <el-radio v-model="typeId" label="2" border>月末倒数第二天</el-radio>
        <el-radio v-model="typeId" label="3" border>月末最后一天</el-radio> -->
        <el-radio v-for="item in valueMethodList" :key="item.id" v-model="typeId" :label="item.id" border>{{ item.name }}</el-radio>
      </div>
      <span slot="footer">
        <el-button size="small" @click="valueMethodModal = false">取消</el-button>
        <el-button size="small" type="primary" @click="saveValueType">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { currencyDropdown, editExRage, rateValueMethodDropdown } from '@/api/common'
import { toSelectOption, downLoadFile } from '@/utils'
import { deleteExchangeRate, addExchangeRate, updateExchangeRate, getExchangeRateById } from '@/api/dataMaintain'
const { formOptions, columns } = tableConfig

export default {
  name: 'Rate',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.valueMethod, actionCode.export, actionCode.import],
      dialogVisible: false,
      valueMethodModal: false,
      editStatus: actionCode.add,
      selectIds: '',
      typeId: '',
      actionTextConfig,
      valueMethodList: [],
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
          { required: true, message: '请填写汇率', trigger: 'blur' },
          { pattern: /^\d+(\.\d{1,6})?$/, message: '只能填写数字，最多6位小数' }
        ],
        effectTime: [
          { required: true, message: '请选择生效时间', trigger: 'blur' }
        ]
      },
      importConfig: {
        action: '/exchangeRate/import',
        template: '/exchangeRate/downloadTemp',
        accept: ''
      }
    }
  },
  mounted() {
    this.getSelectOption()
  },
  methods: {
    async getSelectOption() {
      const currencyDropdownRes = await currencyDropdown()
      const list = toSelectOption(currencyDropdownRes.data, 'name', 'name')
      this.selectOption.currencyDropdown = list

      // const valueMethodData = await rateValueMethodDropdown()
      // const tempList = valueMethodData && valueMethodData.data || []
      // this.valueMethodList = tempList
      // const sele = tempList.find(item => item.state === 'Y') || {}
      // debugger
      // this.typeId = sele.id
    },
    async getValueMethodList() {
      const valueMethodData = await rateValueMethodDropdown()
      const tempList = valueMethodData && valueMethodData.data || []
      this.valueMethodList = tempList
      const sele = tempList.find(item => item.state === 'Y') || {}
      this.typeId = sele.id
    },
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.rateForm).forEach(key => {
        _this.rateForm[key] = defaultData[key] || ''
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteExchangeRate(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getExchangeRateById(selectIds[0])
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
    },
    // 设置取值方式
    async saveValueType() {
      if (!this.typeId) {
        this.$message.warning('请选择取值方式')
        return false
      }
      const res = await editExRage({ id: this.typeId })
      if (res && res.code === 200) {
        this.valueMethodModal = false
        this.actionCallback()
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/exchangeRate/export', params, '汇率数据')
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          // _this.resetForm('rateForm')
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
        case actionCode.valueMethod:
          _this.getValueMethodList()
          _this.valueMethodModal = true
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
