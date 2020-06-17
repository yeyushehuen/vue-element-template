<template>
  <div>
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
      :submit-loading="loading"
      :show-reset-btn="formOptions.showResetBtn"
      :submit-btn-text="formOptions.submitBtnText"
      :reset-btn-text="formOptions.resetBtnText"
      :reset-btn-callback="formOptions.resetBtnCallback"
    />

    <el-table
      size="small"
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
  methods: {
    handleSelectionChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
.base-table-search-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      flex: 1 1 24%;
      & {
        display: flex;
        .el-form-item__label {
          flex: 0 0 auto;
        }
        .el-form-item__content {
          flex: 1 1 auto;
          >div{
            width: 100%;
          }
        }
      }
    }
}
</style>
