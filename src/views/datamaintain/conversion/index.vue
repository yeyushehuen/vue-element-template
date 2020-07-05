<template>
  <div>
    <base-table :form-options="formOptions" :columns="columns" :action-code="actionCode" api="/dept/list" @dispatch="actionHandler">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>

    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`Type类型转换 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="convertTypeForm" size="small" label-position="left" :model="convertTypeForm" :rules="rules" label-width="80px">
        <el-form-item label="type" prop="type1">
          <el-input v-model="convertTypeForm.type1" placeholder="请填写type" />
        </el-form-item>
        <el-form-item label="抓换类型" prop="type2">
          <el-input v-model="convertTypeForm.type2" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="转换类型-细分类" prop="type3">
          <el-input v-model="convertTypeForm.type3" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-select v-model="convertTypeForm.country" style="width: 100%" placeholder="请选择状态">
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
        actionCode.import,
        actionCode.export
      ],
      dialogVisible: false,
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      convertTypeForm: {
        type1: '',
        type2: '',
        type3: ''
      },
      rules: {
        type1: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        type2: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        type3: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        country: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
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
      // todo 校验删除逻辑
    },
    async updateHandler(selectIds) {
      this.setFormVal()
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
      _this.resetForm()
      switch (type) {
        case actionCode.add:
          _this.dialogVisible = true
          // _this.resetForm('convertTypeForm')
          break
        case actionCode.update:
          _this.dialogVisible = true
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
