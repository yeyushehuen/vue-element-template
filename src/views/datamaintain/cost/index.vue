<template>
  <div>
    <base-table :import-config="importConfig" :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/skuCost/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        <span>-</span>
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`成本数据 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="skuCostForm" class="flex-form-wrapper" size="small" label-position="left" :model="skuCostForm" :rules="rules" label-width="80px">
        <el-form-item label="期间" prop="period">
          <el-date-picker v-model="skuCostForm.period" value-format="yyyy-MM" type="month" />
        </el-form-item>
        <el-form-item label="品类" prop="category">
          <el-input v-model="skuCostForm.category" placeholder="请填写品类" />
        </el-form-item>
        <el-form-item label="采购成本" prop="purchaseCost">
          <el-input v-model="skuCostForm.purchaseCost" placeholder="请填写采购成本" />
        </el-form-item>
        <el-form-item label="头程运费" prop="headTripFee">
          <el-input v-model="skuCostForm.headTripFee" placeholder="请填写头程运费" />
        </el-form-item>
        <el-form-item label="转运运费" prop="transportFee">
          <el-input v-model="skuCostForm.transportFee" placeholder="请填写转运运费" />
        </el-form-item>
        <el-form-item label="自发货运费" label-width="100" prop="selfShipmentFee">
          <el-input v-model="skuCostForm.selfShipmentFee" placeholder="请填写自发货运费" />
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
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { deleteSkuCost, addSkuCost, updateSkuCost, getSkuCostById } from '@/api/dataMaintain'
import { downLoadFile } from '../../../utils'
const { formOptions, columns } = tableConfig

const commonRules = { pattern: /^\d+(\.\d{1,6})?$/, message: '只能填写数字，最多6位小数' }

export default {
  name: 'Rate',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [/* actionCode.add, */actionCode.update, actionCode.delete, actionCode.export, actionCode.import],
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
          { required: true, message: '请填写采购成本', trigger: 'blur' },
          commonRules
        ],
        headTripFee: [
          { required: true, message: '请填写头程运费', trigger: 'blur' },
          commonRules
        ],
        transportFee: [
          { required: true, message: '请填写转运运费', trigger: 'blur' },
          commonRules
        ],
        selfShipmentFee: [
          { required: true, message: '请填写自发货运费', trigger: 'blur' },
          commonRules
        ]
      },
      importConfig: {
        action: '/skuCost/import',
        template: '/skuCost/downloadTemp',
        accept: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.skuCostForm).forEach(key => {
        _this.skuCostForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteSkuCost(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds, record) {
      const res = await getSkuCostById(selectIds[0])
      if (res && res.code === 200) {
        const resData = res.data || {}
        this.setFormVal({ ...resData, period: record.period })
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/skuCost/export', params)
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add: // 新增
          // _this.dialogVisible = true
          // _this.resetForm('skuCostForm')
          break
        case actionCode.update: // 修改
          _this.dialogVisible = true
          _this.updateHandler(selectIds, selectRows[0] || {})
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
        [actionCode.add]: addSkuCost,
        [actionCode.update]: updateSkuCost
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
