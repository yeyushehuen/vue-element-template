export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'reportName', label: '报表类型' },
      { prop: 'createUser', label: '创建人' }
    ]
  },
  columns: [
    {
      prop: 'reportName',
      label: '报表类型'
    },
    {
      prop: 'suffix',
      label: '文件格式'
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
