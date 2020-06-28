<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" :title="`店铺管理 - ${actionTextConfig[editStatus]}`" width="800px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="shopForm" class="shop-modal-form" size="small" label-position="right" :inline="true" :model="shopForm" :rules="rules">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="shopForm.name" placeholder="请填写店铺名称" />
        </el-form-item>
        <el-form-item label="店铺简称" prop="shortName">
          <el-input v-model="shopForm.shortName" placeholder="请填写编码" />
        </el-form-item>
        <el-form-item label="销售部门" prop="dept">
          <el-select v-model="shopForm.dept" style="width: 100%" placeholder="请选择销售部门">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="销售主体" prop="entity">
          <el-select v-model="shopForm.entity" style="width: 100%" placeholder="请选择销售主体">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="销售国家" prop="country">
          <el-select v-model="shopForm.country" style="width: 100%" placeholder="请选择销售国家">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input v-model="shopForm.leader" placeholder="请填写负责人" />
        </el-form-item>
        <el-form-item label="Seller ID" prop="sellerID">
          <el-input v-model="shopForm.sellerID" placeholder="请填写sellerID" />
        </el-form-item>
        <el-form-item label="Token" prop="token">
          <el-input v-model="shopForm.token" placeholder="请填写Token" />
        </el-form-item>
        <el-form-item label="secretKey" prop="secretKey">
          <el-input v-model="shopForm.secretKey" placeholder="请填写secretKey" />
        </el-form-item>
        <el-form-item label="awsAccessKeyId" prop="awsAccessKeyId">
          <el-input v-model="shopForm.awsAccessKeyId" placeholder="请填写awsAccessKeyId" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="shopForm.status" style="width: 100%" placeholder="请选择状态">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('shopForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('shopForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import tableConfig from './props.js'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'

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
        actionCode.import,
        actionCode.export,
        actionCode.disable,
        actionCode.enable,
        actionCode.translate,
        actionCode.view,
        actionCode.manualReport
      ],
      dialogVisible: false,
      editStatus: actionCode.add,
      actionTextConfig,
      shopForm: {
        name: '',
        shortName: '',
        dept: '',
        entity: '',
        country: '',
        leader: '',
        sellerID: '',
        token: '',
        secretKey: '',
        awsAccessKeyId: '',
        status: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写名称', tirgger: 'blur' }
        ],
        shortName: [
          { required: true, message: '请填写名称缩写', tirgger: 'blur' }
        ],
        dept: [
          { required: true, message: '请选择销售部门', tirgger: 'blur' }
        ],
        entity: [
          { required: true, message: '请选择销售实体', tirgger: 'blur' }
        ],
        country: [
          { required: true, message: '请选择国家', tirgger: 'blur' }
        ],
        leader: [
          // { required: true, message: '', tirgger: 'blur' }
        ],
        sellerID: [
          { required: true, message: '请填写sellerID', tirgger: 'blur' }
        ],
        token: [
          // { required: true, message: '', tirgger: 'blur' }
        ],
        secretKey: [
          // { required: true, message: '请填写secretKey', tirgger: 'blur' }
        ],
        awsAccessKeyId: [
          { required: true, message: '请填写awsAccessKeyId', tirgger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', tirgger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clearFormVal() {
      const _this = this
      Object.keys(_this.shopForm).forEach(key => {
        _this.shopForm[key] = ''
      })
    },
    setFormVal() {
      const _this = this
      const defaultData = {}
      Object.keys(_this.shopForm).forEach(key => {
        _this.shopForm[key] = defaultData[key] || 'defaultData'
      })
    },
    deleteHandler() {
      // todo 校验删除逻辑
    },
    importHandler() {
      // todo 导入逻辑
    },
    exportHandler() {
      // todo 导出逻辑
    },
    disableHandler() {
      // todo 禁用逻辑
    },
    enableHandler() {
      // todo 启用逻辑
    },
    viewHandler() {
      // todo 一键查看逻辑
    },
    reportHandler() {
      // todo 手动生成报表记录
    },
    actionHandler(type) {
      const _this = this
      _this.editStatus = type
      _this.clearFormVal()
      switch (type) {
        case actionCode.add:
          _this.dialogVisible = true
          break
        case actionCode.update:
          _this.setFormVal()
          _this.dialogVisible = true
          break
        case actionCode.delete:
          _this.deleteHandler()
          break
        case actionCode.import:
          _this.importHandler()
          break
        case actionCode.export:
          _this.exportHandler()
          break
        case actionCode.enable:
          _this.enableHandler()
          break
        case actionCode.disable:
          _this.disableHandler()
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
