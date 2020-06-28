export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '编码' },
      { prop: 'mobile', label: '名称' },
      { prop: 'testProps', label: '状态' },
      { prop: 'sex', label: '是否实体中心', itemType: 'select',
        options: [
          { value: '', label: '全部' },
          { value: 0, label: '是' },
          { value: 1, label: '否' }
        ]
      }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '编码'
    },
    // 格式化为字符串
    {
      prop: 'sex',
      label: '名称'
    },
    {
      prop: 'age',
      label: '是否实体中心'
    },
    {
      prop: 'creator',
      label: '创建人'
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
      prop: 'disableTime',
      label: '禁用时间'
    },
    {
      prop: 'status',
      label: '状态'
    },
    {
      prop: 'operate',
      label: '操作',
      slotName: 'operate',
      width: 120
    }
  ]
}
