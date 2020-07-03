export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: 'Asin' },
      { prop: 'mobile', label: 'FNSku' },
      { prop: 'testProps', label: 'Seller Sku' },
      { prop: 'mobilasdfe', label: '创建人' },
      { prop: 'mobilasdfe', label: '产品名称' }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '期间',
      slotName: 'name'
    },
    // 格式化为字符串
    {
      prop: 'sex',
      label: 'ASIN'
    },
    {
      prop: 'age',
      label: 'Seller Sku'
    },
    {
      prop: 'score',
      label: 'FNSku'
    },
    {
      prop: 'score',
      label: '公司型号'
    },
    {
      prop: 'score',
      label: '产品名称'
    },
    {
      prop: 'score',
      label: '创建人'
    },
    {
      prop: 'score',
      label: '创建时间'
    },
    {
      prop: 'operate',
      label: '操作',
      slotName: 'operate'
    }
  ]
}
