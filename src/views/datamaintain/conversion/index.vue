<template>
  <div>
    <base-table :import-config="importConfig" :form-options="formOptions" :columns="columns" :action-code="actionCode" api="/typeChange/list" @dispatch="actionHandler">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>

    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`Type类型转换 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="convertTypeForm" class="flex-form-wrapper" size="small" label-position="left" :model="convertTypeForm" :rules="rules" label-width="80px">
        <el-form-item label="类型" prop="type">
          <el-input v-model="convertTypeForm.type" placeholder="请填写type" />
        </el-form-item>
        <el-form-item label="转换类型" prop="changeType">
          <el-input v-model="convertTypeForm.changeType" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="转换类型-细分类" prop="changeDetail">
          <el-input v-model="convertTypeForm.changeDetail" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="国家" prop="areaId">
          <el-select v-model="convertTypeForm.areaId" style="width: 100%" placeholder="请选择国家">
            <el-option label="中国" :value="1" />
            <el-option label="俄罗斯" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('convertTypeForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('convertTypeForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { addTypeConversion, updateTypeConversion, getTypeConversionById, deleteTypeConversion } from '../../../api/dataMaintain'
import { downLoadFile } from '../../../utils'
const { formOptions, columns } = tableConfig

export default {
  name: 'Conversion',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [
        actionCode.add,
        actionCode.update,
        actionCode.delete,
        actionCode.export,
        actionCode.import
      ],
      dialogVisible: false,
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      actionCallback: () => {},
      convertTypeForm: {
        type: '',
        changeType: '',
        changeDetail: '',
        areaId: ''
      },
      rules: {
        type: [
          { required: true, message: '请填写类型', trigger: 'blur' }
        ],
        changeType: [
          { required: true, message: '请填写转换类型', trigger: 'blur' }
        ],
        changeDetail: [
          { required: true, message: '请填写细分类', trigger: 'blur' }
        ],
        areaId: [
          { required: true, message: '请选择国家', trigger: 'blur' }
        ]
      },
      importConfig: {
        action: '/typeChange/import',
        template: '/typeChange/downloadTemp',
        accept: ''
      }
    }
  },
  methods: {
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.convertTypeForm).forEach(key => {
        _this.convertTypeForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteTypeConversion(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getTypeConversionById(selectIds[0])
      console.log('res', res)
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/typeChange/export', params)
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add:
          _this.dialogVisible = true
          // _this.resetForm('convertTypeForm')
          break
        case actionCode.update:
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
        [actionCode.add]: addTypeConversion,
        [actionCode.update]: updateTypeConversion
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

<style scoped>
</style>
