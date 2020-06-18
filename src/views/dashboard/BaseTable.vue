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
        :submit-loading="loading"
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
.base-table-search-form-wrapper,.base-table-wrapper{
  background-color: #fff;
  padding: 12px;
  border-radius: 2px;
  border: 1px solid RGB(238, 238, 238);
}
.base-table-search-form-wrapper{
  margin-bottom: 6px;
  padding: 12px 12px 0 12px;
}
.base-table-wrapper{
  .el-table__header th {
    background-color: #f6f7f9;
  }
  .el-table__body-wrapper .el-table__body {
    td {
      padding: 4px 0;
    }
  }
}
.base-table-search-form {
    display: flex;
    padding: 0;
  .search-input-area,.search-button{
    display: flex;
  }
  .search-input-area{
    flex: 1 1 auto;
    flex-wrap: wrap;
  }
  .search-button{
    flex: 0 0 171px;
    justify-content: center;
    align-items: center;
    margin: -12px -12px 0 -12px;
    border-left: 1px solid RGB(238, 238, 238);
    margin-left: 10px;
  }
  .search-input-area .el-form-item {
    padding-right: 12px;
    margin-bottom: 12px;
    flex: 0 0 25%;
    margin-right: 0;
    & {
      display: flex;
      .el-form-item__label {
        font-weight: normal;
        color: #333;
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
