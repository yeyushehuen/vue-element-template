<template>
  <div>
    <!-- <div class="board-column-header">
      {{ headerText }}
    </div> -->
    <draggable
      :list="list"
      v-bind="$attrs"
      :set-data="setData"
      class="custom-columns"
    >
      <el-tag v-for="element in list" :key="element.prop" class="column-tag">
        <el-checkbox v-model="checkModel[element.prop]">{{ element.label }}</el-checkbox>
      </el-tag>
    </draggable>
    <div class="footer">
      <el-button size="small" @click="reset">重置</el-button>
      <el-button size="small" type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'CustomColumn',
  components: {
    draggable
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    showColumns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    const checkModel = {}
    this.$props.showColumns.forEach(item => {
      checkModel[item.prop] = true
    })
    return {
      checkModel
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    confirm() {
      const _this = this
      const showColumn = _this.$props.list.filter(item => _this.checkModel[item.prop])
      _this.$emit('changeShowColumns', showColumn)
    },
    reset() {
      const checkModel = {}
      this.$props.list.forEach(item => {
        checkModel[item.prop] = true
      })
      this.checkModel = checkModel
      this.$emit('changeShowColumns', [], true)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-columns{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .column-tag{
    width: 100%*(1/5)-1%;
    margin-bottom: 4px;

    &:not(:nth-child(5n)){
      margin-right:5%/(5-1);
    }
    &:last-child{
      margin-right: auto;
    }

    ::v-deep{
      .el-checkbox{
        width: 100%;
      }
    }
  }
}

.footer{
  text-align: right;
  margin: -12px -16px;
  padding: 8px 16px;
  background: #f4f4f4;
  margin-top: 16px;
}
</style>
