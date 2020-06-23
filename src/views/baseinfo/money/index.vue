<template>
  <div>
    <base-table :action-code="actionCode" :form-options="formOptions" :columns="columns" @dispatch="actionHandler">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" title="货币管理" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="moneyForm" size="small" label-position="left" :model="moneyForm" :rules="rules" label-width="80px">
        <el-form-item label="货币名称" prop="name">
          <el-input v-model="moneyForm.name" />
        </el-form-item>
        <el-form-item label="标准代码" prop="code">
          <el-input v-model="moneyForm.code" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <!-- <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button> -->
        <el-button size="small" @click="resetForm('moneyForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('moneyForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import tableConfig from './props.js'
const { formOptions, columns } = tableConfig

export default {
  name: 'Money',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: ['add', 'update', 'delete', 'import', 'export'],
      dialogVisible: false,
      moneyForm: {
        name: '',
        code: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入货币名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写标准代码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    actionHandler(type) {
      switch (type) {
        case 'add':
          this.dialogVisible = true
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

<style lang="scss" scoped>

</style>
