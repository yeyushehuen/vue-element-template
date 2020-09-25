<template>
  <div v-loading="loading" :element-loading-text="loadingText" style="position: relative;">
    <base-table :action-code="actionCode" :import-config="importConfig" :form-options="formOptions" :columns="columns" api="/paymentReport/list" @dispatch="actionHandler">
      <template slot="billingDetails" slot-scope="scope">
        <a v-if="/pdf/i.test(scope.row.suffix)" target="_blank" :href="scope.row.pdfUrl"><i class="el-icon-connection" /></a>
        <i v-else class="el-icon-connection" @click="showDetail(scope.row)" />
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
      <template slot="dropdownSlot" slot-scope="scope">
        <el-dropdown placement="bottom-start" type="primary" style="margin: 0 -20px 0 -16px;">
          <span class="import-button-inner">导出<i class="el-icon-arrow-down el-icon--right" /></span>
          <el-dropdown-menu slot="dropdown" class="handleExcel">
            <el-dropdown-item>
              <span size="small" @click="exportExcel(scope.queryHandler)">导出页面</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span size="small" @click="exportZip(scope.queryHandler)">导出文件</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
  name: 'BillingDetail', // fgpp
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns,
      actionCode: [actionCode.audit, actionCode.reviews, actionCode.clear, { slot: true, key: 'export' }/* actionCode.export */, actionCode.import],
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
      },
      loadingText: '',
      loading: false
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
    // 导出列表数据
    exportExcel({ getQueryParams, getSelection }) {
      const query = getQueryParams() || {}
      const { selectIds } = getSelection()
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/paymentReport/exportPage', params, '数据详情', true)
    },
    // 导出Excel账单文件
    exportZip({ getQueryParams, getSelection }) {
      const query = getQueryParams() || {}
      const { selectIds } = getSelection()
      const params = selectIds.length > 0 ? { id: selectIds.join(',') } : query
      downLoadFile('/paymentReport/simpleExport', params, '数据详情', true)
    },
    async auditHandler(selectIds, selectRows) {
      const verifyList = selectRows.filter(row => row.verifyState === 'SUCCESS')
      // 已审核的账单不能清除
      if (verifyList.length > 0) {
        this.$message.warning('已审核的账单不能重复审核')
        return false
      }
      try {
        this.loadingText = '正在审核……'
        this.loading = true
        const response = await paymentReportVerify({ id: selectIds.join(',') })
        this.loading = false
        this.callback(response)
      } catch (error) {
        this.loading = false
      }
    },
    async reviewsHandler(selectIds) {
      try {
        this.loadingText = '正在反审核……'
        this.loading = true
        const response = await paymentReportUnverify({ id: selectIds.join(',') })
        this.callback(response)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async clearHandler(selectIds, selectRows) {
      // 只有未审核，并且上传成功的账单，才可以清除
      const filterIds = selectRows.filter(row => row.verifyState !== 'SUCCESS' && row.paymentState === 'SUCCESS').map(row => row.id)
      if (filterIds.length < 1) {
        this.$message.warning('没有可清除的账单')
        return false
      }

      const response = await paymentReportClear({ id: filterIds.join(',') })
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
