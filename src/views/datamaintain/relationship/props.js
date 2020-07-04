export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'asin', label: 'Asin' },
      { prop: 'mobile', label: 'FNSku' },
      { prop: 'sellerSku', label: 'Seller Sku' },
      { prop: 'mobilasdfe', label: '创建人' },
      { prop: 'prodcutName', label: '产品名称' }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '期间',
      slotName: 'name',
      width: 150
    },
    // 格式化为字符串
    {
      prop: 'sex',
      label: 'ASIN',
      width: 150
    },
    {
      prop: 'age',
      label: 'Seller Sku',
      width: 150
    },
    {
      prop: 'score',
      label: 'FNSku',
      width: 150
    },
    {
      prop: 'score',
      label: '公司型号',
      width: 150
    },
    {
      prop: 'score',
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
