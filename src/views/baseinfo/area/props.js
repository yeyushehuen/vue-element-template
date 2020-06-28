export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '州属' },
      { prop: 'mobile', label: '国家' },
      { prop: 'testProps', label: '简称' }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '州属'
    },
    {
      prop: 'sex',
      label: '国家'
    },
    {
      prop: 'age',
      label: '简称'
    },
    {
      prop: 'score',
      label: '货币名称'
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
