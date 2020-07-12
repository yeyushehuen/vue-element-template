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
      label: '期间'
    },
    {
      prop: 'asin',
      label: 'ASIN'
    },
    {
      prop: 'sellerSku',
      label: 'Seller Sku'
    },
    {
      prop: 'fnSku',
      label: 'FNSku'
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
      slotName: 'operate',
      width: 150
    }
  ]
}
