export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '货币名称' },
      { prop: 'mobile', label: '标准代码' },
      { prop: 'testProps', label: '创建时间' }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '货币名称'
    },
    {
      prop: 'sex',
      label: '标准代码'
    },
    {
      prop: 'age',
      label: '创建人'
    },
    {
      prop: 'score',
      label: '创建时间'
    },
    {
      prop: 'operate',
      label: '操作',
      slotName: 'operate',
      width: 120
    }
  ]
}
