import { currencyDropdown } from '@/api/common'
import { dateRangeFormat, numberFormat } from '@/utils'

const currencySelectConfig = {
  params: {},
  selectFetch: currencyDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.code, label: item.name })
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'code', label: '币别', itemType: 'select', ...currencySelectConfig, selectOptions: { multiple: true }},
      { prop: 'effectTime', label: '生效时间', itemType: 'daterange', format: dateRangeFormat }
    ]
  },
  columns: [
    {
      prop: 'originCurrency',
      label: '原币'
    },
    {
      prop: 'standardCurrency',
      label: '本币'
    },
    {
      prop: 'exchangeRate',
      label: '汇率',
      formatter: (row) => numberFormat(row.exchangeRate || 0, 6)
    },
    {
      prop: 'effectTime',
      label: '生效时间'
    },
    {
      prop: 'username',
      label: '创建人'
    },
    {
      prop: 'createTime',
      label: '创建时间'
    },
    {
      prop: 'operate',
      label: '操作',
      slotName: 'operate'
    }
  ]
}
