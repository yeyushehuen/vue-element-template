<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/reportType/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
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
import { addReportType, deleteReportType, getReportTypeById, updateReportType } from '../../../api/baseInfo'

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
      selectIds: '',
      actionTextConfig,
      actionCallback: () => {},
      reportForm: {
        reportName: '',
        suffix: ''
      },
      rules: {
        reportName: [
          { required: true, message: '请填写报表类型', trigger: 'blur' }
        ],
        suffix: [
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
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.reportForm).forEach(key => {
        _this.reportForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteReportType(selectIds.join(','))
      console.log('res', res)
      if (res && res.code === 200) {
        this.actionCallback()
      }
    },
    async updateHandler(selectIds) {
      const res = await getReportTypeById(selectIds[0])
      console.log('res', res)
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
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
        [actionCode.add]: addReportType,
        [actionCode.update]: updateReportType
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
    }
  }
}
</script>

<style scoped>
</style>
