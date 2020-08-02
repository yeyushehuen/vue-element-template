<template>
  <div>
    <base-table :import-config="importConfig" :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/skuCost/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        <span>-</span>
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`成本数据 - ${actionTextConfig[editStatus]}`" width="800px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="skuCostForm" class="cost-modal-form" size="small" label-position="right" :inline="true" :model="skuCostForm" :rules="rules">
        <el-form-item label="期间" prop="period">
          <el-date-picker v-model="skuCostForm.period" value-format="yyyy-MM" type="month" />
        </el-form-item>
        <el-form-item label="ASIN" label-width="100" prop="asin">
          <el-input v-model="skuCostForm.asin" placeholder="请填写ASIN" />
        </el-form-item>
        <el-form-item label="Seller Sku" label-width="100" prop="sellerSku">
          <el-input v-model="skuCostForm.sellerSku" placeholder="请填写Seller Sku" />
        </el-form-item>
        <el-form-item label="公司型号" label-width="100" prop="companySku">
          <el-input v-model="skuCostForm.companySku" placeholder="请填写公司型号" />
        </el-form-item>
        <el-form-item label="内部型号" label-width="100" prop="internalSku">
          <el-input v-model="skuCostForm.internalSku" placeholder="请填写内部型号" />
        </el-form-item>
        <el-form-item label="产品名称" label-width="100" prop="productName">
          <el-input v-model="skuCostForm.productName" placeholder="请填写产品名称" />
        </el-form-item>
        <el-form-item label="销售小组" prop="deptId">
          <el-select v-model="skuCostForm.deptValues" style="width: 100%" placeholder="请选择销售小组">
            <el-option v-for="option in selectOption.deptDropdown" :key="option.value" :label="option.label" :value="option" :value-key="option.value" />
          </el-select>
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
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" title="成本取值方式" width="600px" :visible.sync="valueMethodModal" :before-close="handleClose">
      <div>
        <!-- <el-radio v-model="typeId" label="1" border>Seller SKU</el-radio>
        <el-radio v-model="typeId" label="2" border>Seller SKU + 公司型号</el-radio>
        <el-radio v-model="typeId" label="3" border>公司型号</el-radio> -->
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
import { deleteSkuCost, addSkuCost, updateSkuCost, getSkuCostById } from '@/api/dataMaintain'
import { downLoadFile, toSelectOption } from '../../../utils'
import { editSkuCost, costValueMethodDropdown, deptDropdown } from '../../../api/common'
const { formOptions, columns } = tableConfig

const commonRules = { pattern: /^\d+(\.\d{1,6})?$/, message: '只能填写数字，最多6位小数' }

export default {
  name: 'Rate',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.valueMethod, actionCode.export, actionCode.import],
      dialogVisible: false,
      editStatus: actionCode.add,
      typeId: '',
      valueMethodModal: false,
      selectIds: '',
      actionTextConfig,
      actionCallback: () => {},
      valueMethodList: [],
      selectOption: {
        deptDropdown: []
      },
      skuCostForm: {
        period: '',
        category: '',
        purchaseCost: '0',
        headTripFee: '0',
        transportFee: '0',
        selfShipmentFee: '0',
        sellerSku: '',
        asin: '',
        companySku: '',
        internalSku: '',
        productName: '',
        deptValues: null
      },
      rules: {
        period: [
          { required: true, message: '请选择期间', trigger: 'blur' }
        ],
        category: [
          // { required: true, message: '请填写品类', trigger: 'blur' }
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
        ],
        sellerSku: [
          { required: true, message: '请填写Seller Sku', trigger: 'blur' }
        ],
        asin: [
          // { required: true, message: '请填写asin', trigger: 'blur' },
        ],
        companySku: [
          { required: true, message: '请填写公司型号', trigger: 'blur' }
        ],
        internalSku: [
          // { required: true, message: '请填写内部型号', trigger: 'blur' }
        ],
        productName: [
          // { required: true, message: '请填写产品名称', trigger: 'blur' },
        ],
        deptValues: [
          // { required: true, message: '请填写产品名称', trigger: 'blur' },
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
    // this.getSelectOption()
  },
  methods: {
    async getValueMethodList() {
      const valueMethodData = await costValueMethodDropdown()
      const tempList = valueMethodData && valueMethodData.data || []
      this.valueMethodList = tempList
      const sele = tempList.find(item => item.state === 'Y') || {}
      this.typeId = sele.id
    },
    async getDeptList() {
      const deptDropdownSelect = await deptDropdown()
      this.selectOption.deptDropdown = toSelectOption(deptDropdownSelect.data, 'id', 'name')
    },
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.skuCostForm).forEach(key => {
        _this.skuCostForm[key] = defaultData[key]
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
        const { deptId, deptName, ...rest } = resData
        this.setFormVal({ ...rest, period: record.period, deptValues: { value: deptId + '', label: deptName }})
      }
    },
    // 设置取值方式
    async saveValueType() {
      if (!this.typeId) {
        this.$message.warning('请选择取值方式')
        return false
      }
      const res = await editSkuCost({ id: this.typeId })
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
      downLoadFile('/skuCost/export', params, '成本数据')
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          _this.getDeptList()
          // _this.resetForm('skuCostForm')
          break
        case actionCode.update: // 修改
          _this.dialogVisible = true
          _this.getDeptList()
          _this.updateHandler(selectIds, selectRows[0] || {})
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
        [actionCode.add]: addSkuCost,
        [actionCode.update]: updateSkuCost
      }
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          const { deptValues, ...rest } = _this[formName]
          const { value: deptId, label: deptName } = deptValues || {}
          const data = Object.assign(rest, { deptId, deptName })

          apiRep[_this.editStatus]({ id: _this.selectIds, data }).then(res => {
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
.cost-modal-form{
    display: flex;
    padding: 0;
    flex-wrap: wrap;
    &>>>.el-form-item{
      display: flex;
      flex: 0 0 50%;
      margin-right: 0;
      padding-right: 12px;
      .el-form-item__label {
        font-weight: normal;
        color: #333;
        flex: 0 0 auto;
      }
      .el-form-item__content {
        flex: 1 1 auto;
        > div {
          width: 100%;
        }
      }
    }
  }
</style>
