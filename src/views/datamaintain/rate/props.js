export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '币别' },
      { prop: 'effectTime', label: '生效时间', itemType: 'daterange' }
    ]
  },
  columns: [
    {
      prop: 'originCurrency',
      label: '原币'
    },
    // 格式化为字符串
    {
      prop: 'standardCurrency',
      label: '本币'
    },
    {
      prop: 'exchangeRate',
      label: '汇率'
    },
    {
      prop: 'effectTime',
      label: '生效时间'
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
      slotName: 'operate'
    }
  ]
}
