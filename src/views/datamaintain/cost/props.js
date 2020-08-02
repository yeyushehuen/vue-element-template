import { periodFormat } from '@/views/billing/data/props'
import { deptDropdown } from '@/api/common'

const deptSelectConfig = {
  itemType: 'select',
  selectFetch: deptDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.name })
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'period', label: '期间', itemType: 'month', format: periodFormat },
      { prop: 'sellerSku', label: 'Seller Sku' },
      { prop: 'internalSku', label: '内部型号' },
      { prop: 'category', label: '品类' },
      { prop: 'sku', label: '公司型号' },
      { prop: 'username', label: '创建人' },
      { prop: 'deptId', label: '销售小组', ...deptSelectConfig, selectOptions: { multiple: true }}
    ]
  },
  columns: [
    {
      prop: 'period',
      label: '期间',
      width: 150
    },
    // 格式化为字符串
    {
      prop: 'asin',
      label: 'ASIN',
      width: 150
    },
    {
      prop: 'sellerSku',
      label: 'Seller Sku',
      width: 150
    },
    {
      prop: 'companySku',
      label: '公司型号',
      width: 150
    },
    {
      prop: 'internalSku',
      label: '内部型号',
      width: 150
    },
    {
      prop: 'productName',
      label: '产品名称',
      width: 150
    },
    {
      prop: 'deptName',
      label: '销售小组',
      width: 150
    },
    {
      prop: 'category',
      label: '品类',
      width: 150
    },
    {
      prop: 'purchaseCost',
      label: '采购成本',
      width: 150
    },
    {
      prop: 'headTripFee',
      label: '头程运费',
      width: 150
    },
    {
      prop: 'transportFee',
      label: '转运运费',
      width: 150
    },
    {
      prop: 'selfShipmentFee',
      label: '自发货运费',
      width: 150
    },
    {
      prop: 'username',
      label: '创建人',
      width: 150
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: 150
    },
    {
      prop: 'operate',
      label: '操作',
      slotName: 'operate'
    }
  ]
}
