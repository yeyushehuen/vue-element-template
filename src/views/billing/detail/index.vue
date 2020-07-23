<template>
  <div style="position: relative;">
    <base-table :action-code="actionCode" :import-config="importConfig" :form-options="formOptions" :columns="columns" api="/paymentReport/list" @dispatch="actionHandler">
      <template slot="billingDetails" slot-scope="scope">
        <i class="el-icon-connection" @click="showDetail(scope.row)" />
      </template>
      <template slot="fileUpload" slot-scope="scope">
        <i v-if="canDownload[scope.row.paymentState]" class="el-icon-download" @click="exportHandler([scope.row.id])" />
        <span v-else>-</span>
      </template>
      <template slot="paymentState" slot-scope="scope">
        <span v-if="canDownload[scope.row.paymentState]">{{ billState[scope.row.paymentState] }}</span>
        <el-upload
          v-else
          class="upload-demo"
          :action="uploadExcelAction"
          :show-file-list="false"
          accept=""
          :data="{id: scope.row.id}"
          :on-success="uploadExcelSuccess(scope.getList)"
          :on-error="uploadExcelError"
          :on-progress="uploadExcelProgress"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-upload2" /><span>{{ billState[scope.row.paymentState] || '未传账单' }}</span>
        </el-upload>
      </template>
    </base-table>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { actionCode, actionTextConfig } from '@/components/BaseTable/config/constants'
import tableConfig from './props.js'
import { paymentReportUnverify, paymentReportVerify, paymentReportClear } from '../../../api/bill'
import { downLoadFile } from '../../../utils'
const { formOptions, columns } = tableConfig

export default {
  name: 'BillingDetail',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.audit, actionCode.reviews, actionCode.clear, actionCode.export, actionCode.import],
      editStatus: actionCode.add,
      selectIds: '',
      actionTextConfig,
      actionCallback: () => {},
      tableConfig: {
        'show-summary': true,
        'sum-text': '当页合计'
      },
      importConfig: {
        action: '/paymentReport/upload',
        template: '',
        accept: ''
      },
      canDownload: {
        SUCCESS: true,
        FAIL: false,
        CLEAR: false,
        NONE: false
      },
      billState: {
        SUCCESS: '上传成功',
        FAIL: '上传失败',
        CLEAR: '账单清除',
        NONE: '未传账单'
      }
    }
  },
  computed: {
    uploadExcelAction() {
      return process.env.VUE_APP_BASE_API + '/paymentReport/simpleUpload'
    }
  },
  mounted() {
  },
  methods: {
    callback(response) {
      if (response && response.code !== 200) {
        this.$message.error(response.message)
      } else {
        this.$message.success(response.message)
        this.actionCallback()
      }
    },
    async auditHandler(selectIds, selectRows) {
      const verifyList = selectRows.filter(row => row.verifyState === 'SUCCESS')
      // 已审核的账单不能清除
      if (verifyList.length > 0) {
        this.$message.warning('不能清除已审核的账单')
        return false
      }
      const response = await paymentReportVerify({ id: selectIds.join(',') })
      this.callback(response)
    },
    async reviewsHandler(selectIds) {
      const response = await paymentReportUnverify({ id: selectIds.join(',') })
      this.callback(response)
    },
    async clearHandler(selectIds, selectRows) {
      const verifyList = selectRows.filter(row => row.verifyState === 'SUCCESS')
      // 已审核的账单不能清除
      if (verifyList.length > 0) {
        this.$message.warning('不能清除已审核的账单')
        return false
      }

      const response = await paymentReportClear({ id: selectIds.join(',') })
      this.callback(response)
    },
    exportHandler(selectIds, query) {
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/paymentReport/simpleExport', params, '数据详情', true)
    },
    actionHandler(type, { selectIds, selectRows, callback, query }) {
      const _this = this
      _this.editStatus = type
      _this.actionCallback = callback
      debugger
      switch (type) {
        case actionCode.audit:
          _this.auditHandler(selectIds, selectRows)
          break
        case actionCode.reviews:
          _this.reviewsHandler(selectIds)
          break
        case actionCode.clear:
          _this.clearHandler(selectIds, selectRows)
          break
        case actionCode.export:
          _this.exportHandler(selectIds, query)
          break
        default:
          break
      }
    },
    showDetail(row) {
      this.$router.push({
        // 你要跳转的地址
        path: '/billing/data',
        query: { id: row.id }
      })
      this.$router.push({ path: '/billing/data', query: { id: row.id }})
    },
    uploadExcelSuccess(getList) {
      return function(response) {
        if (response && response.code !== 200) {
          this.$message.error(response.message)
        } else {
          getList()
          this.$message.success(response.message)
        }
      }
    },
    uploadExcelError(error) {
      console.log('uploadExcelError', error)
    },
    uploadExcelProgress(event) {
      console.log('uploadExcelProgress', event)
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // this.$message.success(file.type)

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-upload2,.el-icon-connection,.el-icon-download{
  font-size: 20px;
  color: #1890ff;
  vertical-align: bottom;
}
</style>
