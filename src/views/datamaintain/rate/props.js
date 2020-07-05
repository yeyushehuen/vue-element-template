import { currencyDropdown } from '@/api/common'

const currencySelectConfig = {
  params: {},
  selectFetch: currencyDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.name })
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'code', label: '币别', itemType: 'select', ...currencySelectConfig },
      { prop: 'effectTime', label: '生效时间', itemType: 'daterange' }
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
      label: '汇率'
    },
    {
      prop: 'effectTime',
      label: '生效时间'
    },
    {
      prop: 'createUser',
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
