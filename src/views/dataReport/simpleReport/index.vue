<template>
  <div>
    <base-table :form-options="formOptions" :columns="columns" api="/paymenthorizontalreport/list">
      <template slot="operate" slot-scope="scope">
        <span> - </span>
      </template>
    </base-table>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import tableConfig from '../props.js'

const { formOptions, columns } = tableConfig

export default {
  name: 'DetailReport',
  components: { BaseTable },
  data() {
    return {
      formOptions,
      columns
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
