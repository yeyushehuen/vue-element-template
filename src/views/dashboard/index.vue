<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <base-table :data="tableData" :row-header="rowHeader">
      <template slot="name" slot-scope="scope">
        {{ scope.$index }}
      </template>
    </base-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'
import BaseTable from './BaseTable'

export default {
  name: 'Dashboard',
  components: { BaseTable },
  data() {
    return {
      currentRole: 'adminDashboard',
      tableData: [
        {
          name: '老王',
          sex: 0,
          age: 18,
          score: 60
        },
        {
          name: '老王',
          sex: 0,
          age: 18,
          score: 60
        },
        {
          name: '老王',
          sex: 0,
          age: 18,
          score: 60
        },
        {
          name: '老王',
          sex: 0,
          age: 18,
          score: 60
        },
        {
          name: '老王',
          sex: 0,
          age: 18,
          score: 60
        }
      ],
      rowHeader: [
        {
          prop: 'name',
          label: '姓名',
          slotName: 'name'
        },
        // 格式化为字符串
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'score',
          label: '分数'
        },
        {
          prop: '',
          label: '操作'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
