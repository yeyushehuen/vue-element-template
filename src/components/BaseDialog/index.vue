<template>
  <el-dialog
    class="base-dialog-wrapper"
    title="货币管理"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
    <span v-if="showFooter" slot="footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      done()
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.base-dialog-wrapper{
  &>>>.el-dialog__footer{
    background-color: #f4f4f4;
    padding: 8px 16px;
  }
  &>>>.el-dialog__header{
    background-color: #f4f4f4;
    padding: 12px 16px;
  }
  &>>>.el-dialog__body{
    padding: 12px 16px;
  }
  &>>>.el-dialog__title{
    font-size: 16px;
  }
}
</style>
