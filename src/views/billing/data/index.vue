<template>
  <base-table :form-options="formOptions" api="/paymentAnalysis/list" :columns="columns">
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
  name: 'Cost',
  components: { BaseTable },
  data() {
    return {
      formOptions: formOptions,
      columns: columns
    }
  }
}
</script>

<style scoped>
</style>
