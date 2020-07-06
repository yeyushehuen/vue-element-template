<template>
  <div style="margin: 4px" class="emm-base-table-root">
    <div v-if="formOptions" class="base-table-search-form-wrapper">
      <search-form
        ref="searchForm"
        v-bind="formOptions"
        class="base-table-search-form"
        :submit-handler="searchHandler"
        :submit-loading="false"
        @higherSearchChange="higherSearchChange"
      />
    </div>

    <div class="base-table-wrapper">
      <div>
        <el-dropdown v-if="actionCode && actionCode.length > 0" placement="bottom-start" class="base-table-action-wrapper" @command="handleCommand">
          <el-button>
            功能菜单<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown" style="min-width: 116px">
            <el-dropdown-item
              v-for="(code, index) in actionCode"
              :key="index"
              :command="code"
            >{{ actionTextConfig[code] || code }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button @click="showDialog">大窗口自定义字段</el-button>
        <el-dialog title="自定义字段" class="base-dialog-wrapper" destroy-on-close :close-on-click-modal="false" width="666px" :visible.sync="dialogVisible" :before-close="handleClose">
          <div class="board">
            <CustomColumn :key="1" :list="hiddenColumns" :group="group" class="kanban todo" header-text="隐藏字段" />
            <CustomColumn :key="2" :list="showColumns" :group="group" class="kanban working" header-text="显示的字段" />
          </div>
        </el-dialog> -->
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
          <el-button slot="reference" style="float: right; margin-bottom: 8px;" @click="visible = !visible">自定义字段</el-button></el-button>
        </el-popover>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        size="mini"
        border
        fit
        style="width: 100%;"
        :data="list"
        v-bind="tableConfig"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="51" />
        <el-table-column v-for="(col, index) in showColumns" :key="index" :show-overflow-tooltip="true" v-bind="col">
          <template slot-scope="scope">
            <span v-if="col.slotName">
              <slot :name="col.slotName" :row="scope.row" :$index="scope.$index" />
            </span>
            <span v-else-if="col.render">{{ col.render(scope.row) }}</span>
            <span v-else>{{ scope.row[col.prop] }}</span>
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
import { deleteNullProps, randomStr, deepClone } from '@/utils'
import searchForm from '@/components/search/src/main'
import CustomColumn from './components/CustomColumn'
import { paginationConfig, actionTextConfig, actionCode } from './config/constants'

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
  props: {
    api: {
      type: String,
      default: ''
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
      tableHeight: '100vh',
      hideHigherSearch: false,
      listLoading: true,
      dialogVisible: false,
      visible: false,
      list: null,
      searchQuery: {},
      actionTextConfig,
      hiddenColumns: [],
      showColumns: [],
      group: 'mission'
    }
  },
  computed: {
    calcHeight: function() {
      return this.tableHeight
    }
  },
  created() {
    this.getList()
    this.showColumns = deepClone(this.$props.columns)
  },
  mounted() {
    const windowHeight = document.querySelector('div.sidebar-container')
    this.tableHeight = windowHeight && windowHeight.clientHeight - 214
  },
  methods: {
    handleSelectionChange(val, ...rest) {
      console.log('handleSelectionChange', val, rest)
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
      this.hideHigherSearch = status || false
      const siderContainer = document.querySelector('div.sidebar-container')
      const formContainer = document.querySelector('div.base-table-search-form-wrapper')
      const windowHeight = siderContainer.clientHeight
      const formHeight = formContainer.clientHeight
      this.tableHeight = windowHeight - formHeight - 157
    },
    getList() {
      this.listLoading = true
      // 所有的查询参数都在这里获取
      const query = this.getQueryParams()
      console.log('query', query)

      fetchList(this.api, query, this.columns).then(response => {
        console.log('response', response)
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
    callback() {
      this.getList()
    },
    selectValidate(command) {
      if (command === actionCode.add) {
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
      if (command === actionCode.update && selectLen > 1) {
        this.$message('最多只能选择一条数据')
        return false
      }

      return true
    },
    handleCommand(command) {
      const _this = this
      if (!this.selectValidate(command)) {
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
</style>
