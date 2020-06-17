<template>
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
</template>

<script>
export default {
  name: 'BaseTable',
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
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
    }
  }
}
</script>
