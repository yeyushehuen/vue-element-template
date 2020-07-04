export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'code', label: '编码' },
      { prop: 'name', label: '名称' },
      { prop: 'state', label: '状态', itemType: 'select',
        options: [
          { value: '', label: '全部' },
          { value: 'Y', label: '启用' },
          { value: 'N', label: '禁用' }
        ]
      },
      { prop: 'domainLegal', label: '是否实体中心', itemType: 'select',
        options: [
          { value: 'Y', label: '是' },
          { value: 'N', label: '否' }
        ]
      }
    ]
  },
  columns: [
    {
      prop: 'code',
      label: '编码'
    },
    {
      prop: 'name',
      label: '名称'
    },
    {
      prop: 'domainLegal',
      label: '是否实体中心'
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
      prop: 'disableTime',
      label: '禁用时间'
    },
    {
      prop: 'state',
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
