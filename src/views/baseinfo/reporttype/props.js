import { stateRender } from '../shop/props'

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'reportName', label: '报表类型' },
      { prop: 'username', label: '创建人' },
      { prop: 'state', label: '状态', itemType: 'select',
        options: [
          { value: '', label: '全部' },
          { value: 'Y', label: '启用' },
          { value: 'N', label: '禁用' }
        ]
      }
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
      prop: 'state',
      label: '状态',
      // formatter: (row) => stateConvert(row && row.state)
      render: stateRender
    },
    {
      prop: 'username',
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
