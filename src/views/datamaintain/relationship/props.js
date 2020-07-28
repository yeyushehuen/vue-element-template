import { periodFormat, textFormatter } from '@/views/billing/data/props'

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'asin', label: 'Asin' },
      { prop: 'fnSku', label: 'FNSku' },
      { prop: 'sellerSku', label: 'Seller Sku' },
      { prop: 'username', label: '创建人' },
      { prop: 'productName', label: '产品名称' },
      { prop: 'period', label: '期间', itemType: 'month', format: periodFormat },
      { prop: 'companySku', label: '公司型号' }
    ]
  },
  columns: [
    {
      prop: 'period',
      label: '期间'
    },
    {
      prop: 'asin',
      label: 'ASIN',
      formatter: textFormatter('asin')
    },
    {
      prop: 'sellerSku',
      label: 'Seller Sku'
    },
    {
      prop: 'fnSku',
      label: 'FNSku',
      formatter: textFormatter('fnSku')
    },
    {
      prop: 'deptName',
      label: '部门'
    },
    {
      prop: 'companySku',
      label: '公司型号'
    },
    {
      prop: 'productName',
      label: '产品名称'
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
      slotName: 'operate',
      width: 150
    }
  ]
}
