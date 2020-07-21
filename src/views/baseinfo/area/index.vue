<template>
  <div>
    <base-table :import-config="importConfig" :action-code="actionCode" :form-options="formOptions" :columns="columns" api="/area/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        <span>-</span>
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`区域管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
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
          <el-select v-model="areaForm.currencyId" style="width: 100%" placeholder="请选择货币">
            <el-option v-for="option in selectOption.currencyDropdown" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="areaForm.state" style="width: 100%" placeholder="请选择状态">
            <el-option label="启用" value="Y" />
            <el-option label="禁用" value="N" />
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
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import { addArea, deleteArea, getAreaById, updateArea } from '@/api/baseInfo'
import { currencyDropdown } from '@/api/common'
import { toSelectOption, downLoadFile } from '../../../utils'
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
      selectIds: '',
      actionTextConfig,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.export, actionCode.import],
      actionCallback: () => {},
      selectOption: {
        currencyDropdown: []
      },
      areaForm: {
        province: '',
        country: '',
        nameShort: '',
        state: 'Y',
        currencyId: ''
      },
      rules: {
        province: [
          { required: true, message: '请填写州属', trigger: 'blur' }
        ],
        country: [
          { required: true, message: '请填写国家', trigger: 'blur' }
        ],
        nameShort: [
          { required: true, message: '请填写缩写', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        currencyId: [
          { required: true, message: '请选择货币', trigger: 'blur' }
        ]
      },
      importConfig: {
        action: '/area/import',
        template: '/area/downloadTemp',
        accept: ''
      }
    }
  },
  mounted() {
    this.getSelectOption()
  },
  methods: {
    async getSelectOption() {
      const currencyDropdownRes = await currencyDropdown()
      this.selectOption.currencyDropdown = toSelectOption(currencyDropdownRes.data, 'id', 'name')
    },
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.areaForm).forEach(key => {
        _this.areaForm[key] = defaultData[key] || ''
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteArea(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getAreaById(selectIds[0])
      console.log('res', res)
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/area/export', params, '区域')
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      switch (type) {
        case actionCode.add:
          _this.dialogVisible = true
          // _this.resetForm('areaForm')
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
        [actionCode.add]: addArea,
        [actionCode.update]: updateArea
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
