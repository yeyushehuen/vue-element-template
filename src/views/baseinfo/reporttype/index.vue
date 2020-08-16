<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/reportType/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        <span>-</span>
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`报表类型 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="reportForm" size="small" label-position="left" :model="reportForm" :rules="rules" label-width="80px">
        <el-form-item label="报表类型" prop="reportName">
          <el-input v-model="reportForm.reportName" />
        </el-form-item>
        <el-form-item label="文件格式" prop="suffix">
          <el-input v-model="reportForm.suffix" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="reportForm.state" style="width: 100%" placeholder="请选择状态">
            <el-option label="启用" value="Y" />
            <el-option label="禁用" value="N" />
          </el-select>
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
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import { addReportType, deleteReportType, getReportTypeById, updateReportType } from '@/api/baseInfo'

const { formOptions, columns } = tableConfig

export default {
  name: 'ReportType',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [actionCode.add, actionCode.update], // , actionCode.delete
      dialogVisible: false,
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      actionCallback: () => {},
      reportForm: {
        reportName: '',
        state: 'Y',
        suffix: ''
      },
      rules: {
        reportName: [
          { required: true, message: '请填写报表类型', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        suffix: [
          { required: true, message: '请填写文件格式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.reportForm).forEach(key => {
        _this.reportForm[key] = defaultData[key] || ''
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteReportType(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getReportTypeById(selectIds[0])
      console.log('res', res)
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add: // 新增
          _this.dialogVisible = true
          // _this.resetForm('reportForm')
          break
        case actionCode.update: // 修改
          _this.dialogVisible = true
          _this.updateHandler(selectIds)
          _this.selectIds = selectIds.join(',')
          break
        case actionCode.delete:
          _this.deleteHandler(selectIds)
          break
        default:
          break
      }
    },
    handleClose(done) {
      done()
    },
    submitCallback(formName) {
      const _this = this
      return function(res) {
        if (res && res.code === 200) {
          _this.$message.success(successText[_this.editStatus])
          _this.actionCallback()
          _this.$refs[formName].resetFields()
          _this.dialogVisible = false
        } else {
          _this.$message.warning(res.message || '操作失败')
        }
      }
    },
    submitForm(formName) {
      const _this = this
      const apiRep = {
        [actionCode.add]: addReportType,
        [actionCode.update]: updateReportType
      }
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          apiRep[_this.editStatus]({ id: _this.selectIds, data: _this[formName] }).then(_this.submitCallback(formName))
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
