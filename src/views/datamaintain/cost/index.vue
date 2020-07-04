<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/exchangeRate/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`货币管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="skuCostForm" class="flex-form-wrapper" size="small" label-position="left" :model="skuCostForm" :rules="rules" label-width="80px">
        <el-form-item label="期间" prop="period">
          <el-date-picker v-model="skuCostForm.period" value-format="yyyy-MM-dd HH:mm:ss" type="date" />
        </el-form-item>
        <el-form-item label="品类" prop="category">
          <el-input v-model="skuCostForm.category" />
        </el-form-item>
        <el-form-item label="采购成本" prop="purchaseCost">
          <el-input v-model="skuCostForm.purchaseCost" />
        </el-form-item>
        <el-form-item label="头程运费" prop="headTripFee">
          <el-input v-model="skuCostForm.headTripFee" />
        </el-form-item>
        <el-form-item label="转运运费" prop="transportFee">
          <el-input v-model="skuCostForm.transportFee" />
        </el-form-item>
        <el-form-item label="自发货运费" label-width="100" prop="selfShipmentFee">
          <el-input v-model="skuCostForm.selfShipmentFee" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('skuCostForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('skuCostForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { deleteSkuCost, addSkuCost, updateSkuCost, getSkuCostById } from '@/api/dataMaintain'
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
      actionCallback: () => {},
      skuCostForm: {
        period: '',
        category: '',
        purchaseCost: '',
        headTripFee: '',
        transportFee: '',
        selfShipmentFee: ''
      },
      rules: {
        period: [
          { required: true, message: '请选择期间', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请填写品类', trigger: 'blur' }
        ],
        purchaseCost: [
          { required: true, message: '请填写采购成本', trigger: 'blur' }
        ],
        headTripFee: [
          { required: true, message: '请填写头程运费', trigger: 'blur' }
        ],
        transportFee: [
          { required: true, message: '请填写转运运费', trigger: 'blur' }
        ],
        selfShipmentFee: [
          { required: true, message: '请填写自发货运费', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    clearFormVal() {
      const _this = this
      Object.keys(_this.skuCostForm).forEach(key => {
        _this.skuCostForm[key] = ''
      })
    },
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.skuCostForm).forEach(key => {
        _this.skuCostForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteSkuCost(selectIds.join(','))
      console.log('res', res)
      if (res && res.code === 200) {
        this.actionCallback()
      }
    },
    async updateHandler(selectIds) {
      const res = await getSkuCostById(selectIds[0])
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
        [actionCode.add]: addSkuCost,
        [actionCode.update]: updateSkuCost
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
