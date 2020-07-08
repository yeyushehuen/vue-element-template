const format = (...rest) => {
  console.log('rest', rest)
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '货币名称' },
      { prop: 'code', label: '标准代码' },
      { prop: 'createTime', label: '创建时间', itemType: 'daterange', format }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '货币名称'
    },
    {
      prop: 'code',
      label: '标准代码'
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
      width: 120
    }
  ]
}
