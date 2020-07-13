import { deptDropdown, areaDropdown } from '@/api/common'

const deptSelectConfig = {
  itemType: 'select',
  selectFetch: deptDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.name })
}
const countrySelectConfig = {
  itemType: 'select',
  selectFetch: areaDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.country })
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'period', label: '期间', itemType: 'month' },
      { prop: 'country', label: '国家', ...countrySelectConfig },
      { prop: 'accountId', label: '店铺' },
      { prop: 'deptId', label: '部门', ...deptSelectConfig },
      { prop: 'type', label: '业务类型' }
    ]
  },
  columns: [
    { label: '期间', props: 'period' },
    { label: '部门', props: 'deptName' },
    { label: '国家', props: 'country' },
    { label: '店铺名称', props: '4' },
    { label: '币别', props: 'currency' },
    { label: '汇率', props: '6' },
    { label: '业务类型', props: 'type' },
    { label: '原币金额', props: 'originCurrency' },
    { label: '本币金额', props: 'standardCurrency' }
  ]
}
