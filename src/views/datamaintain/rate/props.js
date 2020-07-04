export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '币别' },
      { prop: 'mobile', label: '生效时间' }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '原币'
    },
    // 格式化为字符串
    {
      prop: 'sex',
      label: '本币'
    },
    {
      prop: 'age',
      label: '汇率'
    },
    {
      prop: 'usefulTime',
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
