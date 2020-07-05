export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'asin', label: 'Asin' },
      { prop: 'fnSku', label: 'FNSku' },
      { prop: 'sellerSku', label: 'Seller Sku' },
      { prop: 'createUser', label: '创建人' },
      { prop: 'productName', label: '产品名称' }
    ]
  },
  columns: [
    {
      prop: 'period',
      label: '期间',
      width: 150
    },
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
      prop: 'fnSku',
      label: 'FNSku',
      width: 150
    },
    {
      prop: 'companySku',
      label: '公司型号',
      width: 150
    },
    {
      prop: 'productName',
      label: '产品名称',
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
