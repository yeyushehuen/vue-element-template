<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/skuRelation/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`货币管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="skuRelationForm" size="small" label-position="left" :model="skuRelationForm" :rules="rules" label-width="80px">
        <el-form-item label="期间" prop="period">
          <el-date-picker v-model="skuRelationForm.period" value-format="yyyy-MM" type="month" />
        </el-form-item>
        <el-form-item label="ASIN" prop="asin">
          <el-input v-model="skuRelationForm.asin" placeholder="请填写ASIN" />
        </el-form-item>
        <el-form-item label="Seller Sku" prop="sellerSku">
          <el-input v-model="skuRelationForm.sellerSku" placeholder="请填写Seller Sku" />
        </el-form-item>
        <el-form-item label="FnSku" prop="fnSku">
          <el-input v-model="skuRelationForm.fnSku" placeholder="请填写FnSku" />
        </el-form-item>
        <el-form-item label="公司型号" prop="companySku">
          <el-input v-model="skuRelationForm.companySku" placeholder="请填写公司型号" />
        </el-form-item>
        <el-form-item label="产品名" prop="productName">
          <el-input v-model="skuRelationForm.productName" placeholder="请填写产品名" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('skuRelationForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('skuRelationForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { deleteSkuRelation, addSkuRelation, updateSkuRelation, getSkuRelationById } from '@/api/dataMaintain'
const { formOptions, columns } = tableConfig

export default {
  name: 'Relationship',
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
      skuRelationForm: {
        period: '',
        asin: '',
        sellerSku: '',
        fnSku: '',
        companySku: '',
        productName: ''
      },
      rules: {
        period: [
          { required: true, message: '请选择期间', trigger: 'blur' }
        ],
        asin: [
          { required: true, message: '请填写ASIN', trigger: 'blur' }
        ],
        sellerSku: [
          { required: true, message: '请填写Seller Sku', trigger: 'blur' }
        ],
        fnSku: [
          { required: true, message: '请填写FnSku', trigger: 'blur' }
        ],
        companySku: [
          { required: true, message: '请填写公司型号', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请填写产品名', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.skuRelationForm).forEach(key => {
        _this.skuRelationForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteSkuRelation(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getSkuRelationById(selectIds[0])
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
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          // _this.resetForm('skuRelationForm')
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
        [actionCode.add]: addSkuRelation,
        [actionCode.update]: updateSkuRelation
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
