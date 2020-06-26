<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" @dispatch="actionHandler">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" title="货币管理" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="areaForm" size="small" label-position="right" :model="areaForm" :rules="rules" label-width="80px">
        <el-form-item label="州属" prop="site">
          <el-input v-model="areaForm.site" />
        </el-form-item>
        <el-form-item label="国家" prop="country">
          <el-input v-model="areaForm.country" />
        </el-form-item>
        <el-form-item label="缩写" prop="shorthand">
          <el-input v-model="areaForm.shorthand" />
        </el-form-item>
        <el-form-item label="货币名称" prop="currency">
          <el-input v-model="areaForm.currency" />
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
import { actionCode } from '../../../components/BaseTable/config/constants'
const { formOptions, columns } = tableConfig

export default {
  name: 'Area',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      dialogVisible: false,
      actionCode: [actionCode.add, actionCode.update, actionCode.delete, actionCode.import, actionCode.export],
      areaForm: {
        site: '',
        country: '',
        shorthand: '',
        currency: ''
      },
      rules: {
        site: [
          { required: true, message: '', trigger: 'blur' }
        ],
        country: [
          { required: true, message: '请填写国家', trigger: 'blur' }
        ],
        shorthand: [
          { required: true, message: '请填写缩写', trigger: 'blur' }
        ],
        currency: [
          { required: true, message: '请填写货币名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    clearFormVal() {
      const _this = this
      Object.keys(_this.moneyForm).forEach(key => {
        _this.moneyForm[key] = ''
      })
    },
    setFormVal() {
      const _this = this
      const defaultData = {}
      Object.keys(_this.moneyForm).forEach(key => {
        _this.moneyForm[key] = defaultData[key] || 'defaultData'
      })
    },
    actionHandler(type) {
      this.clearFormVal()
      switch (type) {
        case actionCode.add:
          this.dialogVisible = true
          break
        case actionCode.update:
          this.dialogVisible = true
          break
        default:
          break
      }
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style scoped>
</style>
