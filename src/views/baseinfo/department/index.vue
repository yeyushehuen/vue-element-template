<template>
  <div>
    <base-table :command-validator="commandValidator" :import-config="importConfig" :form-options="formOptions" :columns="columns" :action-code="actionCode" api="/dept/list" @dispatch="actionHandler">
      <template slot="operate" slot-scope="scope">
        <span>-</span>
      </template>
    </base-table>
    <!-- 新增，编辑 -->
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
    <!-- 转移功能 -->
    <el-dialog title="转移" class="base-dialog-wrapper" width="520px" destroy-on-close :visible.sync="translateVisible" :before-close="handleClose">
      <dept-tree />
    </el-dialog>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig, successText } from '@/components/BaseTable/config/constants'
import DeptTree from '@/views/baseinfo/department/DeptTree'
import { addDept, deleteDept, getDeptById, updateDept } from '@/api/baseInfo'
import { downLoadFile } from '@/utils'
import tableConfig from './props.js'

const { formOptions, columns } = tableConfig

export default {
  name: 'Department',
  components: { BaseTable, DeptTree },
  data() {
    return {
      formOptions,
      columns,
      actionCode: [
        actionCode.add,
        actionCode.update,
        actionCode.delete,
        actionCode.disable,
        actionCode.enable,
        actionCode.translate,
        actionCode.export,
        actionCode.import
      ],
      dialogVisible: false,
      translateVisible: false,
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
      },
      importConfig: {
        action: '/dept/import',
        template: '/dept/downloadTemp',
        accept: ''
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
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/dept/export', params)
    },
    translateHandler() {
      this.translateVisible = true
    },
    stateHandler(selectIds) {
      const _this = this
      const stateCode = {
        disable: 'N',
        enable: 'Y'
      }
      updateDept({ id: selectIds.join(','), data: { state: stateCode[_this.editStatus] || 'Y' }}).then(res => {
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
        case actionCode.export:
          _this.exportHandler(selectIds, query)
          break
        case actionCode.enable:
          _this.stateHandler(selectIds)
          break
        case actionCode.disable:
          _this.stateHandler(selectIds)
          break
        case actionCode.translate:
          _this.translateHandler(selectIds)
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
    },
    commandValidator({ selectIds, selectRows }) {
      if (selectIds.length < 1) {
        this.$message.warning('最少选择一条数据')
        return false
      }
      if (selectIds.length > 1) {
        this.$message.warning('最多只能选择一条数据')
        return false
      }
      const isLegal = selectRows[0] ? selectRows[0].domainLegal === 'Y' : false
      if (!isLegal) {
        this.$message.warning('非实体中心，不能进行转移')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
</style>
