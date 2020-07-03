export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'country', label: '国家', itemType: 'select',
        options: [
          { value: 0, label: '中国' },
          { value: 1, label: '俄罗斯' }
        ]
      },
      { prop: 'type', label: 'Type' },
      { prop: 'convertType', label: '转换类型' }
    ]
  },
  columns: [
    {
      prop: 'country',
      label: '国家'
    },
    // 格式化为字符串
    {
      prop: 'type',
      label: 'Type'
    },
    {
      prop: 'convertType',
      label: '转换类型'
    },
    {
      prop: 'smallType',
      label: '转换类型-细分类'
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
