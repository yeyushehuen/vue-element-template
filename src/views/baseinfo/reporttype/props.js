export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'sex', label: '报表类型', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      { prop: 'name', label: '创建人' }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '报表类型'
    },
    // 格式化为字符串
    {
      prop: 'sex',
      label: '文件格式'
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
