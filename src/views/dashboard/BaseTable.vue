<template>
  <div>
    <div class="base-table-search-form-wrapper">
      <search-form
        v-if="formOptions"
        ref="searchForm"
        class="base-table-search-form"
        :forms="formOptions.forms"
        :size="formOptions.size"
        :fuzzy="formOptions.fuzzy"
        :inline="formOptions.inline"
        :label-width="formOptions.labelWidth"
        :item-width="formOptions.itemWidth"
        :submit-handler="searchHandler"
        :submit-loading="false"
        :show-reset-btn="formOptions.showResetBtn"
        :submit-btn-text="formOptions.submitBtnText"
        :reset-btn-text="formOptions.resetBtnText"
        :reset-btn-callback="formOptions.resetBtnCallback"
      />
    </div>

    <div class="base-table-wrapper">
      <el-table
        size="mini"
        border
        fit
        style="width: 100%;"
        :data="data"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="51" />
        <el-table-column v-for="(col, index) in rowHeader" :key="index" v-bind="col">
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
        background
        :total="1000"
        layout="total, prev, pager, next, sizes, jumper"
        :page-sizes="[20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/search/src/main'
export default {
  name: 'BaseTable',
  components: {
    searchForm
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表头数据
    rowHeader: {
      type: Array,
      default: () => {
        return []
      }
    },
    formOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      pagination: {
        pageIndex: 1,
        pageSize: 20
      }

    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
    },
    searchHandler() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
