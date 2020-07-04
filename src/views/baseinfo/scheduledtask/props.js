export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '任务名称' },
      { prop: 'mobile', label: '任务类型' },
      { prop: 'testProps', label: '任务描述' }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '任务名称'
    },
    {
      prop: 'sex',
      label: '表达式'
    },
    {
      prop: 'age',
      label: '任务类型'
    },
    {
      prop: 'score',
      label: '状态'
    },
    {
      prop: 'desc',
      label: '任务描述'
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
