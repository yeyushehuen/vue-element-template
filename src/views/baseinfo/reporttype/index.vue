<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" :title="`报表类型 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="reportForm" size="small" label-position="left" :model="reportForm" :rules="rules" label-width="80px">
        <el-form-item label="报表类型" prop="reportType">
          <el-input v-model="reportForm.reportType" />
        </el-form-item>
        <el-form-item label="文件格式" prop="fileType">
          <el-input v-model="reportForm.fileType" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('reportForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('reportForm')">保存</el-button>
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
  name: 'ReportType',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete],
      dialogVisible: false,
      editStatus: actionCode.add,
      actionTextConfig,
      reportForm: {
        reportType: '',
        fileType: ''
      },
      rules: {
        reportType: [
          { required: true, message: '请填写报表类型', trigger: 'blur' }
        ],
        fileType: [
          { required: true, message: '请填写文件格式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clearFormVal() {
      const _this = this
      Object.keys(_this.reportForm).forEach(key => {
        _this.reportForm[key] = ''
      })
    },
    setFormVal() {
      const _this = this
      const defaultData = {}
      Object.keys(_this.reportForm).forEach(key => {
        _this.reportForm[key] = defaultData[key] || 'defaultData'
      })
    },
    deleteHandler() {
      // todo 校验删除逻辑
    },
    actionHandler(type) {
      const _this = this
      _this.editStatus = type
      _this.clearFormVal()
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          break
        case actionCode.update: // 修改
          _this.setFormVal()
          _this.dialogVisible = true
          break
        case actionCode.delete:
          _this.deleteHandler()
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

<style scoped>
</style>
