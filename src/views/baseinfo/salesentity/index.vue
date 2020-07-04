<template>
  <div>
    <base-table :form-options="formOptions" :columns="columns" :action-code="actionCode" api="/legalEntity/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" :title="`销售主体 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="entityForm" size="small" label-position="left" :model="entityForm" :rules="rules" label-width="80px">
        <el-form-item label="编码" prop="code">
          <el-input v-model="entityForm.code" />
        </el-form-item>
        <el-form-item label="名称" prop="legalName">
          <el-input v-model="entityForm.legalName" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="entityForm.state" style="width: 100%" placeholder="请选择状态">
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
import { addLegalEntity, deleteLegalEntity, getLegalEntityById } from '../../../api/baseInfo'
const { formOptions, columns } = tableConfig
export default {
  name: 'SalesEntity',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.import, actionCode.export, actionCode.disable, actionCode.enable],
      dialogVisible: false,
      editStatus: actionCode.add,
      actionCallback: () => {},
      actionTextConfig,
      entityForm: {
        legalName: '',
        code: '',
        state: ''
      },
      rules: {
        legalName: [
          { required: true, message: '请填写名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写编码', trigger: 'blur' }
        ],
        state: [
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
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.entityForm).forEach(key => {
        _this.entityForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteLegalEntity(selectIds.join(','))
      console.log('res', res)
    },
    async updateHandler(selectIds) {
      const res = await getLegalEntityById(selectIds[0])
      console.log('res', res)
      this.setFormVal()
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
    actionHandler(type, { selectIds, selectRows, callback }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      this.clearFormVal()
      switch (type) {
        case actionCode.add:
          _this.dialogVisible = true
          break
        case actionCode.update:
          _this.dialogVisible = true
          _this.updateHandler(selectIds)
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
        case actionCode.enable:
          _this.enableHandler()
          break
        case actionCode.disable:
          _this.disableHandler()
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
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          addLegalEntity(_this[formName]).then(res => {
            _this.actionCallback()
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
