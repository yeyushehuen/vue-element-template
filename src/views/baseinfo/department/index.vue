<template>
  <div>
    <base-table :form-options="formOptions" :columns="columns" :action-code="actionCode" api="/dept/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
    <el-dialog class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" :title="`组织管理 - ${actionTextConfig[editStatus]}`" width="520px" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="depForm" class="flex-form-wrapper" size="small" label-position="left" :model="depForm" :rules="rules" label-width="80px">
        <el-form-item label="编码" prop="code">
          <el-input v-model="depForm.code" placeholder="请填写编码" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="depForm.name" placeholder="请填写名称" />
        </el-form-item>
        <el-form-item label="是否实体中心" prop="domainLegal">
          <el-select v-model="depForm.domainLegal" style="width: 100%" placeholder="请选择">
            <el-option label="是" value="Y" />
            <el-option label="否" value="N" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="depForm.state" style="width: 100%" placeholder="请选择状态">
            <el-option label="正常" value="Y" />
            <el-option label="禁用" value="N" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="resetForm('depForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('depForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { addDept, deleteDept, getDeptById, updateDept } from '@/api/baseInfo'
const { formOptions, columns } = tableConfig
export default {
  name: 'Department',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [
        actionCode.add,
        actionCode.update,
        actionCode.delete,
        actionCode.import,
        actionCode.export,
        actionCode.disable,
        actionCode.enable,
        actionCode.translate
      ],
      dialogVisible: false,
      actionCallback: () => {},
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      depForm: {
        name: '',
        code: '',
        domainLegal: '',
        state: 'Y'
      },
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写编码', trigger: 'blur' }
        ],
        domainLegal: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    setFormVal(defaultData = {}) {
      const _this = this
      Object.keys(_this.depForm).forEach(key => {
        _this.depForm[key] = defaultData[key] || 'defaultData'
      })
    },
    async deleteHandler(selectIds) {
      const res = await deleteDept(selectIds.join(','))
      if (res && res.code === 200) {
        this.actionCallback()
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    },
    async updateHandler(selectIds) {
      const res = await getDeptById(selectIds[0])
      if (res && res.code === 200) {
        this.setFormVal(res.data)
      }
    },
    importHandler() {
      // todo 导入逻辑
    },
    exportHandler() {
      // todo 导出逻辑
    },
    translateHandler() {
      // todo 转移逻辑
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
      switch (type) {
        case actionCode.add:
          _this.dialogVisible = true
          // _this.resetForm('depForm')
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
          _this.exportHandler()
          break
        case actionCode.enable:
          _this.enableHandler()
          break
        case actionCode.disable:
          _this.disableHandler()
          break
        case actionCode.translate:
          _this.translateHandler()
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
        [actionCode.add]: addDept,
        [actionCode.update]: updateDept
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
