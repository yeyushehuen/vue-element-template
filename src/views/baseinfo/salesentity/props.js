export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '编码' },
      { prop: 'mobile', label: '销售主题' },
      { prop: 'sex', label: '状态', itemType: 'select',
        options: [
          { value: '', label: '全部' },
          { value: 0, label: '启用' },
          { value: 1, label: '禁用' }
        ]
      }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '编码'
    },
    {
      prop: 'sex',
      label: '销售主体'
    },
    {
      prop: 'age',
      label: '状态'
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
