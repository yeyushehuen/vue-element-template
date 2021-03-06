<template>
  <div ref="baseTableWrapper" class="emm-base-table-root">
    <!-- 搜索表单 start -->
    <div v-if="formOptions" class="base-table-search-form-wrapper">
      <search-form
        ref="searchForm"
        v-bind="formOptions"
        class="base-table-search-form"
        :submit-handler="searchHandler"
        :reset-btn-callback="resetHandler"
        :submit-loading="false"
        @higherSearchChange="higherSearchChange"
        @getSearhRef="getSearhRef"
      />
    </div>
    <!-- 搜索表单 end -->

    <!-- table -->
    <div class="base-table-wrapper">
      <div>
        <!-- table 工具栏 - start -->
        <div :class="actionCode.length > 0 ? 'base-table-action-wrapper' : ''">
          
          <template v-for="(code) in actionCode">
            <span v-if="typeof code === 'object' && code.slot" :key="code.key"><slot name="dropdownSlot" :queryHandler="{getQueryParams, getSelection}"></slot></span>
            <span v-else-if="code !== codeRepo.import" :key="code" :class="code + '-button'" @click="handleCommand(code)">{{ renderCodeText(code) }}</span>
          </template>
          <!-- 导出按钮要放最后一个 -->
          <span v-if="actionCode.indexOf('import') !== -1" class="import-button">
            <el-dropdown placement="bottom-start" type="primary">
              <span class="import-button-inner">导入<i class="el-icon-arrow-down el-icon--right" /></span>
              <el-dropdown-menu slot="dropdown" class="handleExcel">
                <el-dropdown-item @command="上传文件">
                  <el-upload
                    class="upload-demo"
                    :action="importAction"
                    :show-file-list="false"
                    :accept="importConfig.accept"
                    :on-success="uploadExcelSuccess"
                    :on-error="uploadExcelError"
                    :on-progress="uploadExcelProgress"
                  >
                    <span size="small">上传文件</span>
                  </el-upload>
                </el-dropdown-item>
                <el-dropdown-item v-if="!!importConfig.template" @command="下载模板" @click.native="handleDownTemplate">下载模板</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <div class="custome-columns" @click="showDialog"><i class="el-icon-setting" /></div>
        </div>
        <!-- table 工具栏 - end -->
        <!-- 自定义字 -->
        <el-dialog title="自定义字段" class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" width="1100px" :visible.sync="dialogVisible" :before-close="handleClose">
          <CustomColumn :list="originColumns" :show-columns="showColumns" :group="group" @changeShowColumns="changeShowColumns" />
        </el-dialog>
      </div>

      <!-- table列表 -->
      <el-table
        ref="baseTable"
        v-loading="listLoading"
        v-el-height-adaptive-table="{bottomOffset: showSummary ? 128 : 70}"
        height="100px"
        size="mini"
        border
        fit
        stripe
        style="width: 100%;"
        :data="list"
        @selection-change="handleSelectionChange"
      >
        <template slot="empty">
          <div>
            <img :src="emptySVG" height="150" alt="暂无数据">
            <div style="text-align: center;font-size:14px;margin-top:-41px;">暂无数据</div>
          </div>
        </template>
        <el-table-column type="selection" align="center" :width="showSummary ? 72 : 41" />
        <el-table-column v-for="(col, index) in showColumns" :key="index" :show-overflow-tooltip="true" v-bind="col">
          <template slot-scope="scope">
            <span v-if="col.slotName">
              <slot :name="col.slotName" :row="scope.row" :getList="getList" :$index="scope.$index" />
            </span>
            <span v-else-if="col.formatter">{{ col.formatter(scope.row) }}</span>
            <ex-slot v-else-if="col.render" :render="col.render" :row="scope.row" :index="scope.$index" :column="col" />
            <span v-else>{{ scope.row[col.prop] || (scope.row[col.prop] == 0 ? 0 : '-') }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table-footer v-if="showSummary" ref="tableFooter" :data="footerSummary" />
    </div>
    <!-- 分页器 -->
    <div class="base-table-pagination-wrapper">
      <el-pagination
        :background="pagination.background"
        :current-page.sync="pagination.currentPage"
        :page-size.sync="pagination.pageSize"
        :layout="pagination.layout"
        :page-sizes="pagination.pageSizes"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import elHeightAdaptiveTable from '@/directive/el-table' // base on element-uiel-height-adaptive-table
import emptySVG from '@/assets/empty.svg'
import { deleteNullProps, randomStr, deepClone, downLoadFile } from '@/utils'
import searchForm from '@/components/search/src/main'
import CustomColumn from './components/CustomColumn'
import { paginationConfig, actionTextConfig, actionCode as codeRepo, actionCode } from './config/constants'

const mock = false

async function fetchList(api, query, columns) {
  const { currentPage, pageSize, ...rest } = query
  let offset = 0
  const limit = pageSize
  if (currentPage > 1) {
    offset = (currentPage - 1) * pageSize
  }
  if (mock) {
    const records = {}
    columns.forEach((row, idx) => { records[row.prop] = randomStr({ flag: false, minLen: 8 }) })
    const data = Array(15).fill(records)
    const totalRows = 15
    return { data, totalRows }
  }

  return request({
    url: api,
    method: 'get',
    params: { ...rest, offset, limit }
  })
}
// 自定义内容的组件
const exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index
    }
    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params.row)
  }
}

export default {
  name: 'BaseTable',
  components: { searchForm, CustomColumn, exSlot },
  directives: { elHeightAdaptiveTable },
  props: {
    api: {
      type: String,
      default: ''
    },
    // 导入配置上传action,接受的文件类型
    // action, accept, template
    importConfig: {
      type: Object,
      default: () => ({})
    },
    // 操作是否需要校验
    validate: {
      type: Boolean,
      default: true
    },
    // 自定义校验函数
    commandValidator: {
      type: Function,
      default: null
    },
    // 表头数据
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 查询配置
    formOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否展示合计
    showSummary: {
      type: Boolean,
      default: false
    },
    // 单页合计方法
    summaryMethod: {
      type: Function,
      default: () => ({})
    },
    // 全部合计方法
    allSummaryMethod: {
      type: Function,
      default: null
    },
    // 获取返回的list
    getResponse: {
      type: Function,
      default: response => ({
        list: response.data,
        total: response.totalRows
      })
    },
    // 额外的查询参数
    params: {
      type: Object,
      default: () => ({})
    },
    actionCode: {
      type: Array,
      default: () => ([])
    },
    crossness: {
      type: Boolean,
      default: true
    }
  },
  data() {
    // const height = window.innerHeight - 245
    const originColumns = deepClone(this.$props.columns)
    return {
      pagination: { ...paginationConfig },
      emptySVG: emptySVG + '?' + +new Date(),
      hideHigherSearch: false,
      listLoading: true,
      // tableHeight: height || null,
      dialogVisible: false,
      visible: false,
      isFixed: false,
      list: null,
      searchRef: null,
      searchQuery: {},
      codeRepo: codeRepo,
      actionTextConfig,
      hiddenColumns: [],
      showColumns: [],
      originColumns,
      group: 'mission',
      allSummary: {}
    }
  },
  computed: {
    importAction: function() {
      const api = this.$props.importConfig.action || ''
      // const subAPI = api.startsWith('/') ? api.substring(1) : api
      return process.env.VUE_APP_BASE_API + api
    },
    footerSummary: function() {
      const { summaryMethod, columns, showSummary } = this.$props
      if (!showSummary) {
        return []
      }
      const pageData = this.list

      // return { label: '当页合计', data: summaryMethod({ data: pageData, columns }) }
      return [
        { label: '当页合计', data: summaryMethod({ data: pageData, columns }) },
        { label: '全部合计', data: this.allSummary }
      ]
    }
  },
  created() {
    this.getList()
    this.showColumns = deepClone(this.$props.columns)
  },
  mounted() {
    document.querySelector('section.app-main').classList.add('base-table-scope')
    if (this.$props.showSummary) {
      const {
        tableFooter,
        baseTable
      } = this.$refs

      // 调用init方法传入表格实例初始化footer
      tableFooter.init(baseTable)
    }
    // 计算全部汇总
    this.getAllSummary({})
  },
  destroyed() {
    document.querySelector('section.app-main').classList.remove('base-table-scope')
  },
  methods: {
    getAllSummary(query) {
      if (this.$props.allSummaryMethod) {
        this.$props.allSummaryMethod(query).then(res => {
          this.allSummary = res
        })
      }
    },
    renderCodeText(code) {
      const { crossness } = this.$props
      if (code === actionCode.view && !crossness) {
        return actionTextConfig['unView'] || code
      }
      return actionTextConfig[code] || code
    },
    handleSelectionChange(val, ...rest) {
      // console.log('handleSelectionChange', val, rest)
    },
    getQueryParams(urlParams) {
      const { currentPage, pageSize } = this.pagination || {}
      const constantParams = this.params || {}
      const searchValues = this.searchQuery || {}

      return { currentPage, pageSize, ...constantParams, ...searchValues, ...urlParams }
    },
    paginationChange() {
      this.getList()
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.paginationChange()
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage
      this.paginationChange()
    },
    higherSearchChange(status) {
      const _this = this
      _this.hideHigherSearch = status || false
      _this.$nextTick(() => {
        const el = _this.$refs.baseTable.$el
        const height = window.innerHeight - el.getBoundingClientRect().top - 85
        _this.$refs.baseTable.layout.setHeight(height)
        _this.$refs.baseTable.doLayout()
      })
    },
    getList() {
      this.listLoading = true
      // 所有的查询参数都在这里获取
      const urlParams = this.$route.query || {}
      const query = this.getQueryParams(urlParams)
      fetchList(this.api, query, this.columns).then(response => {
        const { list, total } = this.getResponse(response)
        this.list = list
        if (mock) {
          this.list = list.map((item, index) => ({ ...item, id: index + 1 }))
        }
        this.pagination.total = total
      }).finally(() => {
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
          this.getAllSummary(query)
        }, 0.3 * 1000)
      })
    },
    searchHandler(values) {
      this.pagination.currentPage = 1
      this.searchQuery = deleteNullProps(values) || {}
      this.getList()
    },
    resetHandler() {
      this.searchQuery = {}
      this.getList()
    },
    callback() {
      this.getList()
    },
    commandValidate(command) {
      if (command === codeRepo.add) {
        return true
      }
      const selection = this.getSelection()
      const selectLen = selection.selectIds.length
      if (selectLen < 1) {
        this.$message({
          message: '最少选择一条数据',
          type: 'warning'
        })
        return false
      }
      if (command === codeRepo.update && selectLen > 1) {
        this.$message.warning('最多只能选择一条数据')
        return false
      }

      return true
    },
    // 导出不需要必填校验
    handleCommand(command) {
      const _this = this
      let query = {}
      if (typeof _this.searchRef === 'function') {
        query = deleteNullProps(_this.searchRef())
      }
      const selection = _this.getSelection()
      if (_this.commandValidator) {
        if (!_this.commandValidator({ ...selection, query, command })) {
          return false
        }
      } else if (
        command !== codeRepo.export && // 导出无需校验勾选
        command !== codeRepo.view && // 一键查看无需校验
        command !== codeRepo.valueMethod && // 取值方式无需校验
        // command !== codeRepo.translate && // 一键查看
        // command !== codeRepo.manualReport && // 手动生成报表记录无需校验
        _this.$props.validate && // validate为false时，无需校验勾选
        !this.commandValidate(command)
      ) {
        return false
      }
      this.$emit('dispatch', command, { ...selection, callback: _this.callback, query })
    },
    getSelection() {
      const selectRows = this.$refs.baseTable.selection || []
      const selectIds = selectRows.map(row => row.id)
      return { selectIds, selectRows }
    },
    showDialog() {
      this.dialogVisible = true
    },
    handleClose(done) {
      done()
    },
    handleDownTemplate() {
      downLoadFile(this.$props.importConfig.template)
    },
    uploadExcelSuccess(response) {
      if (response && response.code !== 200) {
        this.$message.error(response.message)
      } else {
        this.$message.success(response.message)
        this.getList()
      }
    },
    uploadExcelError(error) {
      console.log('uploadExcelError', error)
    },
    uploadExcelProgress(event) {
      console.log('uploadExcelProgress', event)
    },
    changeShowColumns(curColumns, reset = false) {
      this.showColumns = curColumns
      this.dialogVisible = false
      if (reset) {
        this.showColumns = this.$props.columns.map(item => item)
        this.originColumns = this.$props.columns.map(item => item)
      }
    },
    getSearhRef(ref) {
      this.searchRef = ref
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";

</style>
