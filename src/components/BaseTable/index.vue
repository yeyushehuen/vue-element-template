<template>
  <div ref="baseTableWrapper" class="emm-base-table-root">
    <div v-if="formOptions" ref="searchForm" class="base-table-search-form-wrapper">
      <search-form

        v-bind="formOptions"
        class="base-table-search-form"
        :submit-handler="searchHandler"
        :reset-btn-callback="resetHandler"
        :submit-loading="false"
        @higherSearchChange="higherSearchChange"
      />
    </div>

    <div class="base-table-wrapper">
      <div>
        <!-- <el-dropdown v-if="actionCode && actionCode.length > 0" placement="bottom-start" class="base-table-action-wrapper" @command="handleCommand">
          <el-button>
            功能菜单<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown" style="min-width: 116px">
            <template v-for="(code, index) in actionCode">
              <el-dropdown-item
                v-if="code !== codeRepo.import"
                :key="index"
                :command="code"
              >{{ actionTextConfig[code] || code }}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown> -->

        <div class="base-table-action-wrapper">
          <template v-for="(code) in actionCode">
            <span v-if="code !== codeRepo.import" :key="code" :class="code + '-button'" @click="handleCommand(code)">{{ actionTextConfig[code] || code }}</span>
          </template>
          <span v-if="actionCode.indexOf('import') !== -1" class="import-button">
            <el-dropdown placement="bottom-start" type="primary">
              <span class="import-button-inner">导入<i class="el-icon-arrow-down el-icon--right" /></span>
              <el-dropdown-menu slot="dropdown" class="handleExcel">
                <el-dropdown-item @command="上传文件">
                  <el-upload
                    class="upload-demo"
                    :action="importAction"
                    :auto-upload="true"
                    :show-file-list="false"
                    :http-request="uploadFile"
                    :accept="importConfig.importAccept"
                  >
                    <span size="small">上传文件</span>
                  </el-upload>
                </el-dropdown-item>
                <el-dropdown-item @command="下载模板" @click.native="handleDownTemplate">下载模板</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
        <!-- 自定义字段例子 -->
        <!-- <el-button @click="showDialog">大窗口自定义字段</el-button>
        <el-dialog title="自定义字段" class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" width="666px" :visible.sync="dialogVisible" :before-close="handleClose">
          <div class="board">
            <CustomColumn :key="1" :list="hiddenColumns" :group="group" class="kanban todo" header-text="隐藏字段" />
            <CustomColumn :key="2" :list="showColumns" :group="group" class="kanban working" header-text="显示的字段" />
          </div>
        </el-dialog> -->
        <!-- 自定义字段例子 -->
        <el-popover
          v-model="visible"
          placement="bottom"
          width="666"
          trigger="hover"
        >
          <div class="board">
            <CustomColumn :key="1" :list="hiddenColumns" :group="group" class="kanban todo" header-text="隐藏字段" />
            <CustomColumn :key="2" :list="showColumns" :group="group" class="kanban working" header-text="显示的字段" />
          </div>
          <!-- <el-button slot="reference" style="float: right; margin-bottom: 8px;" @click="visible = !visible">自定义字段</el-button></el-button> -->
        </el-popover>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        v-el-height-adaptive-table="{bottomOffset: 76}"
        height="100px"
        size="mini"
        border
        fit
        stripe
        style="width: 100%;"
        :data="list"
        v-bind="tableConfig"
        @selection-change="handleSelectionChange"
      >
        <template slot="empty">
          <div>
            <img :src="emptySVG" height="150" alt="暂无数据">
            <div style="text-align: center;font-size:16px;margin-top:-41px">暂无数据<i class="el-icon-chat-dot-round" /></div>
          </div>
        </template>
        <el-table-column type="selection" align="center" width="41" />
        <el-table-column v-for="(col, index) in showColumns" :key="index" :show-overflow-tooltip="true" v-bind="col">
          <template slot-scope="scope">
            <span v-if="col.slotName">
              <slot :name="col.slotName" :row="scope.row" :$index="scope.$index" />
            </span>
            <span v-else-if="col.render">{{ col.render(scope.row) }}</span>
            <span v-else>{{ scope.row[col.prop] || (scope.row[col.prop] == 0 ? 0 : '-') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
import { deleteNullProps, randomStr, deepClone } from '@/utils'
import searchForm from '@/components/search/src/main'
import CustomColumn from './components/CustomColumn'
import { paginationConfig, actionTextConfig, actionCode as codeRepo } from './config/constants'

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

export default {
  name: 'BaseTable',
  components: { searchForm, CustomColumn },
  directives: { elHeightAdaptiveTable },
  props: {
    api: {
      type: String,
      default: ''
    },
    // 导入配置上传action,接受的文件类型
    // importAction, importAccept
    importConfig: {
      type: Object,
      default: () => ({})
    },
    // 操作是否需要校验
    validate: {
      type: Boolean,
      default: true
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
    // table属性配置
    tableConfig: {
      type: Object,
      default: () => ({})
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
      default: () => []
    }
  },
  data() {
    return {
      pagination: { ...paginationConfig },
      emptySVG: emptySVG + '?' + +new Date(),
      hideHigherSearch: false,
      listLoading: true,
      dialogVisible: false,
      visible: false,
      isFixed: false,
      list: null,
      searchQuery: {},
      codeRepo: codeRepo,
      actionTextConfig,
      hiddenColumns: [],
      showColumns: [],
      group: 'mission'
    }
  },
  computed: {
    importAction: function() {
      return process.env.VUE_APP_BASE_API + this.$props.importConfig.action
    }
  },
  created() {
    this.getList()
    this.showColumns = deepClone(this.$props.columns)
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    handleSelectionChange(val, ...rest) {
      // console.log('handleSelectionChange', val, rest)
    },
    getQueryParams() {
      const { currentPage, pageSize } = this.pagination || {}
      const constantParams = this.params || {}
      const searchValues = this.searchQuery || {}

      return { currentPage, pageSize, ...constantParams, ...searchValues }
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
    },
    getList() {
      this.listLoading = true
      // 所有的查询参数都在这里获取
      const query = this.getQueryParams()
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
    selectValidate(command) {
      if (command === codeRepo.add) {
        return true
      }
      const selection = this.getSelection()
      const selectLen = selection.selectIds.length
      if (selectLen < 1) {
        this.$message({
          message: '请选择要操作的数据',
          type: 'warning'
        })
        return false
      }
      if (command === codeRepo.update && selectLen > 1) {
        this.$message('最多只能选择一条数据')
        return false
      }

      return true
    },
    handleCommand(command) {
      const _this = this
      if (_this.$props.validate && !this.selectValidate(command)) {
        return false
      }
      const selection = this.getSelection()
      this.$emit('dispatch', command, { ...selection, callback: _this.callback })
    },
    getSelection() {
      const selectRows = this.$refs.multipleTable.selection || []
      const selectIds = selectRows.map(row => row.id)
      return { selectIds, selectRows }
    },
    showDialog() {
      this.dialogVisible = true
    },
    handleClose(done) {
      done()
    },
    uploadFile() {},
    handleDownTemplate() {
      // 地址使用本地的地址 -- 需要切换
      // window.location = getUrlConcatToken("http://localhost:8080/template/budgetTemplate.xlsx");
      // window.location = getUrlConcatToken('http://ads-ui.qa.aukeyit.com/template/bmsBudgetTemplate.xlsx')
      window.location = process.env.VUE_APP_BASE_API + '/paymentReport/download'
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";

.board {
  // width: 1000px;
  // margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
  max-height: 400px;
  overflow-y: auto;
}
.kanban {
  &.todo {
    .board-column-header {
      background: RGB(25, 25, 25);
    }
  }
  &.working {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  // &.done {
  //   .board-column-header {
  //     background: #2ac06d;
  //   }
  // }
}

// .box_fixed{
//     width: 500px;
//     height: 40px;
//     border: 2px dashed pink;
//     border-radius: 20px;
//     margin: 0 auto;
//     line-height: 40px;
//     background: #eee;
//   }
//   .is_fixed{
//     position: fixed;
//     top: 0;
//     left: 50%;
//     margin-left: -250px;
//     z-index: 999;
//   }
</style>
