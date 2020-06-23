<template>
  <base-table :form-options="formOptions" :columns="columns" @dispatch="dispatch">
    <template slot="name" slot-scope="scope">
      {{ scope.$index }}
    </template>
  </base-table>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import tableConfig from './props.js'
const { formOptions, columns } = tableConfig

export default {
  name: 'Area',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns
    }
  },
  methods: {
    dispatch(type) {
      alert(type)
    }
  }
}
</script>

<style scoped>
</style>
