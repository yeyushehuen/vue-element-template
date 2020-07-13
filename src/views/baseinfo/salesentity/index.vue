<template>
  <div>
    <base-table :import-config="importConfig" :form-options="formOptions" :columns="columns" :action-code="actionCode" api="/legalEntity/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        <span>-</span>
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`销售主体 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="entityForm" size="small" label-position="left" :model="entityForm" :rules="rules" label-width="80px">
        <el-form-item label="编码" prop="code">
          <el-input v-model="entityForm.code" placeholder="编码" />
        </el-form-item>
        <el-form-item label="名称" prop="legalName">
          <el-input v-model="entityForm.legalName" placeholder="名称" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="entityForm.state" style="width: 100%" placeholder="请选择状态">
            <el-option label="正常" value="Y" />
            <el-option label="禁用" value="N" />
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
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { addLegalEntity, deleteLegalEntity, getLegalEntityById, updateLegalEntity } from '@/api/baseInfo'
import { downLoadFile } from '../../../utils'
const { formOptions, columns } = tableConfig
export default {
  name: 'SalesEntity',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.disable, actionCode.enable, actionCode.export, actionCode.import],
      dialogVisible: false,
      editStatus: actionCode.add,
      selectIds: '',
      actionCallback: () => {},
      actionTextConfig,
      entityForm: {
        legalName: '',
        code: '',
        state: 'Y'
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
      },
      importConfig: {
        action: '/legalEntity/import',
        template: '/legalEntity/downloadTemp',
        accept: ''
      }
    }
  },
  methods: {
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.entityForm).forEach(key => {
        _this.entityForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteLegalEntity(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getLegalEntityById(selectIds[0])
      console.log('res', res)
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/legalEntity/export', params, '销售主体')
    },
    stateHandler(selectIds) {
      const _this = this
      const stateCode = {
        disable: 'N',
        enable: 'Y'
      }
      updateLegalEntity({ id: selectIds.join(','), data: { state: stateCode[_this.editStatus] || 'Y' }}).then(res => {
        _this.$message.success(successText[_this.editStatus])
        _this.actionCallback()
      })
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add:
          _this.dialogVisible = true
          // _this.resetForm('entityForm')
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
        [actionCode.add]: addLegalEntity,
        [actionCode.update]: updateLegalEntity
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
