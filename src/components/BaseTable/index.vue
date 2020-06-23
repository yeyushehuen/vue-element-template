<template>
  <div style="margin: 4px">
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
      <el-dropdown @command="handleCommand">
        <el-button>
          下拉菜单<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="add">新增</el-dropdown-item>
          <el-dropdown-item command="update">修改</el-dropdown-item>
          <el-dropdown-item command="delete">删除</el-dropdown-item>
          <el-dropdown-item command="import">导入</el-dropdown-item>
          <el-dropdown-item command="export">导出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-table
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
        <el-table-column v-for="(col, index) in columns" :key="index" v-bind="col">
          <template slot-scope="scope">
            <span v-if="col.slotName">
              <slot :name="col.slotName" :row="scope.row" :$index="scope.$index" />
            </span>
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
import { deleteNullProps } from '@/utils'
import searchForm from '@/components/search/src/main'
import { paginationConfig } from './config/constants'

function fetchList(api, query) {
  return request({
    url: api || '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export default {
  name: 'BaseTable',
  components: { searchForm },
  props: {
    api: {
      type: String,
      default: ''
    },
    actionButtons: {
      type: Array,
      default: () => [
        { name: 'name', attrs: { type: 'primary', disabled: true }},
        { name: 'name', attrs: { type: 'primary', disabled: true }},
        { name: 'name', attrs: { type: 'primary', disabled: true }}
      ]
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
        list: response.data.items,
        total: response.data.total
      })
    },
    // 额外的查询参数
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      pagination: { ...paginationConfig },
      tableHeight: '100vh',
      hideHigherSearch: false,
      listLoading: true,
      list: null,
      searchQuery: {}
    }
  },
  computed: {
    calcHeight: function() {
      return this.tableHeight
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    const windowHeight = document.querySelector('div.sidebar-container')
    this.tableHeight = windowHeight && windowHeight.clientHeight - 214
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
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

      fetchList(this.api, query).then(response => {
        const { list, total } = this.getResponse(response)
        this.list = list
        this.pagination.total = total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    searchHandler(values) {
      console.log(values)
      
      this.pagination.currentPage = 1
      this.searchQuery = deleteNullProps(values) || {}
      this.getList()
    },
    handleCommand(command) {
      this.$emit('dispatch', command)
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
