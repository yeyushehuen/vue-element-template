export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'period', label: '期间', itemType: 'month' },
      { prop: 'sellerSku', label: 'Seller Sku' },
      { prop: 'category', label: '品类' },
      { prop: 'sku', label: 'SKU' },
      { prop: 'createUser', label: '创建人' }
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
      prop: 'productName',
      label: '名称',
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
      prop: 'createUser',
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
