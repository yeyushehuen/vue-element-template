import { deptDropdown, areaDropdown, accountDropdown } from '@/api/common'
import { periodFormat, generateFormater } from '../data/props'

const deptSelectConfig = {
  itemType: 'select',
  selectFetch: deptDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.name, label: item.name })
}
const accountSelectConfig = {
  params: {},
  itemType: 'select',
  selectFetch: accountDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.name, label: item.name })
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
      { prop: 'period', label: '期间', itemType: 'month', format: periodFormat },
      { prop: 'countryId', label: '国家', ...countrySelectConfig, selectOptions: { multiple: true }},
      { prop: 'accountId', label: '店铺', ...accountSelectConfig, selectOptions: { multiple: true }},
      { prop: 'deptGroup', label: '销售小组', ...deptSelectConfig, selectOptions: { multiple: true }},
      { prop: 'type', label: '业务类型' },
      {
        prop: 'checkOut', label: '是否结账', itemType: 'select', options: [
          { value: '', label: '全部' },
          { value: 'Y', label: '是' },
          { value: 'N', label: '否' }
        ]
      },
      {
        prop: 'voucherState', label: '凭证状态', itemType: 'select', options: [
          { value: '', label: '全部' },
          { value: '推送成功', label: '推送成功' },
          { value: '推送失败', label: '推送失败' },
          { value: '待推送', label: '待推送' },
          { value: '待推送-原始凭证删除', label: '待推送-原始凭证删除' }
        ]
      }
    ]
  },
  columns: [
    { align: 'center', label: '期间', prop: 'period' },
    { align: 'center', label: '销售小组', prop: 'deptGroup' },
    { align: 'center', label: '国家', prop: 'country' },
    { align: 'center', label: '店铺名称', prop: 'accountName' },
    { align: 'center', label: '币别', prop: 'currency' },
    { align: 'center', label: '汇率', prop: 'exchangeRate', formatter: generateFormater('exchangeRate', 2) },
    { align: 'center', label: '业务类型', prop: 'type' },
    { align: 'right', label: '原币金额', prop: 'originCurrency', formatter: generateFormater('originCurrency', 2) },
    { align: 'right', label: '本币金额', prop: 'standardCurrency', formatter: generateFormater('standardCurrency', 2) },
    { prop: 'checkOut', width: 150, align: 'center', label: '是否结账', formatter: row => row.checkOut === 'Y' ? '是' : '否' },
    { prop: 'voucherState', width: 150, align: 'center', label: '凭证状态' },
    { prop: 'voucherNumber', width: 150, align: 'center', label: '凭证号' },
    { prop: 'voucherFailure', width: 150, align: 'center', label: '失败原因' }
  ]
}
