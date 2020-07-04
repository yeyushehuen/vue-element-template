<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/area/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" :title="`区域管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="areaForm" size="small" label-position="right" :model="areaForm" :rules="rules" label-width="80px">
        <el-form-item label="州属" prop="province">
          <el-input v-model="areaForm.province" placeholder="请填写州属" />
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-input v-model="areaForm.country" placeholder="请填写国家" />
        </el-form-item>
        <el-form-item label="缩写" prop="nameShort">
          <el-input v-model="areaForm.nameShort" placeholder="请填写缩写" />
        </el-form-item>
        <el-form-item label="货币名称" prop="currencyId">
          <el-select v-model="areaForm.currency" style="width: 100%" placeholder="请选择货币名称">
            <el-option label="人民币" :value="1" />
            <el-option label="人民币" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('areaForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('areaForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import tableConfig from './props.js'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import { addArea, deleteArea, getAreaById } from '../../../api/baseInfo'
const { formOptions, columns } = tableConfig

export default {
  name: 'Area',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      dialogVisible: false,
      editStatus: actionCode.add,
      actionTextConfig,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.import, actionCode.export],
      actionCallback: () => {},
      areaForm: {
        site: '',
        country: '',
        shorthand: '',
        currency: ''
      },
      rules: {
        site: [
          { required: true, message: '请填写州属', trigger: 'blur' }
        ],
        country: [
          { required: true, message: '请填写国家', trigger: 'blur' }
        ],
        shorthand: [
          { required: true, message: '请填写缩写', trigger: 'blur' }
        ],
        currency: [
          { required: true, message: '请选择货币名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clearFormVal() {
      const _this = this
      Object.keys(_this.areaForm).forEach(key => {
        _this.areaForm[key] = ''
      })
    },
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.areaForm).forEach(key => {
        _this.areaForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteArea(selectIds.join(','))
      console.log('res', res)
    },
    async updateHandler(selectIds) {
      const res = await getAreaById(selectIds[0])
      console.log('res', res)
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
      _this.actionCallback = callback
      _this.clearFormVal()
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
          addArea(_this[formName]).then(res => {
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
