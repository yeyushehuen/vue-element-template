<template>
  <div>
    <base-table :crossness="crossness" :import-config="importConfig" :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/account/list" @dispatch="actionHandler">
      <template slot="operate">
        <span>-</span>
      </template>
      <template slot="sellerId" slot-scope="scope">
        <span v-if="crossness">{{ replaceSpecificChar(scope.row.sellerId) || '-' }}</span>
        <span v-else>{{ scope.row.sellerId }}</span>
      </template>
      <template slot="token" slot-scope="scope">
        <span v-if="crossness">{{ replaceSpecificChar(scope.row.token) || '-' }}</span>
        <span v-else>{{ scope.row.token }}</span>
      </template>
      <template slot="secretKey" slot-scope="scope">
        <span v-if="crossness">{{ replaceSpecificChar(scope.row.secretKey) || '-' }}</span>
        <span v-else>{{ scope.row.secretKey }}</span>
      </template>
      <template slot="awsAccesskeyId" slot-scope="scope">
        <span v-if="crossness">{{ replaceSpecificChar(scope.row.awsAccesskeyId) || '-' }}</span>
        <span v-else>{{ scope.row.awsAccesskeyId }}</span>
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`店铺管理 - ${actionTextConfig[editStatus]}`" width="800px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="shopForm" class="shop-modal-form" size="small" label-position="right" :inline="true" :model="shopForm" :rules="rules">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="shopForm.name" placeholder="店铺名称" />
        </el-form-item>
        <el-form-item label="店铺简称" prop="nameShort">
          <el-input v-model="shopForm.nameShort" :value="generateNameShort" placeholder="店铺简称" />
        </el-form-item>
        <el-form-item label="销售部门" prop="deptId">
          <el-select v-model="shopForm.deptId" style="width: 100%" placeholder="请选择销售部门">
            <el-option v-for="option in selectOption.deptDropdown" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="销售主体" prop="sellerLegalId">
          <el-select v-model="shopForm.sellerLegalId" style="width: 100%" placeholder="请选择销售主体">
            <el-option v-for="option in selectOption.leDropdown" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="销售国家" prop="sellerAreaId">
          <el-select v-model="shopForm.sellerAreaId" style="width: 100%" placeholder="请选择销售国家">
            <el-option v-for="option in selectOption.areaDropdown" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input v-model="shopForm.principal" placeholder="请填写负责人" />
        </el-form-item>
        <el-form-item label="Seller ID" prop="sellerId">
          <el-input v-model="shopForm.sellerId" placeholder="sellerId" />
        </el-form-item>
        <el-form-item label="Token" prop="token">
          <el-input v-model="shopForm.token" show-password placeholder="请填写token" />
        </el-form-item>
        <el-form-item label="secretKey" prop="secretKey">
          <el-input v-model="shopForm.secretKey" show-password placeholder="请填写secretKey" />
        </el-form-item>
        <el-form-item label="awsAccessKeyId" prop="awsAccessKeyId">
          <el-input v-model="shopForm.awsAccessKeyId" show-password placeholder="请填写awsAccessKeyId" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="shopForm.state" style="width: 100%" placeholder="请选择状态">
            <el-option label="正常" value="Y" />
            <el-option label="禁用" value="N" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('shopForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('shopForm')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" title="手动生成报表记录" width="520px" :visible.sync="manualReportRangeVisible" :before-close="handleClose">
      <div>
        <span style="margin-right: 8px;">生成时间</span>
        <el-date-picker
          v-model="manualReportRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <span slot="footer">
        <el-button size="small" @click="manualReportRangeVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="generateReportRecord">生成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import tableConfig from './props.js'
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import { addAccount, deleteAccount, getAccountById, updateAccount } from '@/api/baseInfo'
import { areaDropdown, deptDropdown, leDropdown } from '@/api/common'
import { toSelectOption, downLoadFile, replaceSpecificChar } from '@/utils'

const { formOptions, columns } = tableConfig

export default {
  name: 'Shop',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [
        actionCode.add,
        actionCode.update,
        actionCode.delete,
        actionCode.disable,
        actionCode.enable,
        actionCode.view,
        actionCode.manualReport,
        actionCode.export,
        actionCode.import
      ],
      selectOption: {
        areaDropdown: [],
        deptDropdown: [],
        leDropdown: []
      },
      dialogVisible: false,
      manualReportRangeVisible: false,
      crossness: true,
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      manualReportRange: [],
      actionCallback: () => {},
      shopForm: {
        name: '',
        nameShort: '',
        deptId: '',
        sellerLegalId: null,
        sellerAreaId: null,
        principal: '',
        sellerID: '',
        token: '',
        secretKey: '',
        awsAccessKeyId: '',
        state: 'Y'
      },
      rules: {
        name: [
          { required: true, message: '请填写店铺名称', tirgger: 'blur' }
        ],
        nameShort: [
          { required: true, message: '请填写店铺简称', tirgger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请选择销售部门', tirgger: 'blur' }
        ],
        sellerLegalId: [
          { required: true, message: '请选择销售主体', tirgger: 'blur' }
        ],
        sellerAreaId: [
          { required: true, message: '请选择国家', tirgger: 'blur' }
        ],
        principal: [
          // { required: true, message: '负责人', tirgger: 'blur' }
        ],
        sellerId: [
          { required: true, message: '请填写sellerId', tirgger: 'blur' }
        ],
        token: [
          // { required: true, message: '请填写token', tirgger: 'blur' }
        ],
        secretKey: [
          // { required: true, message: '请填写secretKey', tirgger: 'blur' }
        ],
        awsAccesskeyId: [
          // { required: true, message: '请填写awsAccessKeyId', tirgger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', tirgger: 'blur' }
        ]
      },
      importConfig: {
        action: '/account/import',
        template: '/account/downloadTemp',
        accept: ''
      }
    }
  },
  computed: {
    generateNameShort() {
      return this.shopForm.name
    }
  },
  mounted() {
    this.getSelectData()
  },
  methods: {
    replaceSpecificChar: replaceSpecificChar,
    async getSelectData() {
      const areaDropdownSelect = await areaDropdown()
      this.selectOption.areaDropdown = toSelectOption(areaDropdownSelect.data, 'id', 'country')
      const deptDropdownSelect = await deptDropdown()
      this.selectOption.deptDropdown = toSelectOption(deptDropdownSelect.data, 'id', 'name')
      const leDropdownSelect = await leDropdown()
      this.selectOption.leDropdown = toSelectOption(leDropdownSelect.data, 'id', 'legalName')
    },
    generateReportRecord() {
      console.log()
      if (this.manualReportRange.length < 2) {
        this.$message.warning('请选择区间')
        return false
      }
    },
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.shopForm).forEach(key => {
        console.log(key, defaultData[key])
        _this.shopForm[key] = (defaultData[key] || '') + ''
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteAccount(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getAccountById(selectIds[0])
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/account/export', params, '店铺')
    },
    stateHandler(selectIds) {
      const _this = this
      const stateCode = {
        disable: 'N',
        enable: 'Y'
      }
      updateAccount({ id: selectIds.join(','), data: { state: stateCode[_this.editStatus] || 'Y' }}).then(res => {
        _this.$message.success(successText[_this.editStatus])
        _this.actionCallback()
      })
    },
    viewHandler() {
      this.crossness = !this.crossness
    },
    reportHandler() {
      this.manualReportRangeVisible = true
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add:
          _this.dialogVisible = true
          // _this.resetForm('shopForm')
          break
        case actionCode.update:
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
        case actionCode.enable:
          _this.stateHandler(selectIds)
          break
        case actionCode.disable:
          _this.stateHandler(selectIds)
          break
        case actionCode.view:
          _this.viewHandler()
          break
        case actionCode.manualReport:
          _this.reportHandler()
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
        [actionCode.add]: addAccount,
        [actionCode.update]: updateAccount
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-modal-form{
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
