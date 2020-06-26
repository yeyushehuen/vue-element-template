<template>
  <div>
    <base-table :form-options="formOptions" :columns="columns" :action-code="actionCode" @dispatch="actionHandler">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" :title="`销售主体 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="entityForm" size="small" label-position="left" :model="entityForm" :rules="rules" label-width="80px">
        <el-form-item label="编码" prop="code">
          <el-input v-model="entityForm.name" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="entityForm.code" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="entityForm.status" style="width: 100%" placeholder="请选择状态">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('entityForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('entityForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
const { formOptions, columns } = tableConfig
export default {
  name: 'Salesentity',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.import, actionCode.export],
      dialogVisible: false,
      editStatus: actionCode.add,
      actionTextConfig,
      entityForm: {
        name: '',
        code: '',
        status: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写编码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clearFormVal() {
      const _this = this
      Object.keys(_this.entityForm).forEach(key => {
        _this.entityForm[key] = ''
      })
    },
    setFormVal() {
      const _this = this
      const defaultData = {}
      Object.keys(_this.entityForm).forEach(key => {
        _this.entityForm[key] = defaultData[key] || 'defaultData'
      })
    },
    actionHandler(type) {
      this.clearFormVal()
      switch (type) {
        case actionCode.add:
          this.dialogVisible = true
          this.editStatus = actionCode.add
          break
        case actionCode.update:
          this.setFormVal()
          this.dialogVisible = true
          this.editStatus = actionCode.update
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
