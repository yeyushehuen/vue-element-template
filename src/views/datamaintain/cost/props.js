export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '期间' },
      { prop: 'mobile', label: 'Seller Sku' },
      { prop: 'testProps', label: '品类' },
      { prop: 'mobilasdfe', label: 'SKU' },
      { prop: 'mobilasdfe', label: '创建人' }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '期间'
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
      label: '公司型号'
    },
    {
      prop: 'creator',
      label: '名称'
    },
    {
      prop: 'createTime',
      label: '品类'
    },
    {
      prop: 'createTime',
      label: '采购成本'
    },
    {
      prop: 'createTime',
      label: '头程运费'
    },
    {
      prop: 'createTime',
      label: '转运运费'
    },
    {
      prop: 'createTime',
      label: '自发货运费'
    },
    {
      prop: 'creator',
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
