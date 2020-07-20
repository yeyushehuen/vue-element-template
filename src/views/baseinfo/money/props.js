import { dateRangeFormat } from '@/utils'
import { stateRender } from '../shop/props'

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '货币名称' },
      { prop: 'code', label: '标准代码' },
      { prop: 'state', label: '状态', itemType: 'select',
        options: [
          { value: '', label: '全部' },
          { value: 'Y', label: '启用' },
          { value: 'N', label: '禁用' }
        ]
      },
      { prop: 'createTime', label: '创建时间', itemType: 'daterange', format: dateRangeFormat }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '货币名称'
    },
    {
      prop: 'code',
      label: '标准代码'
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
      slotName: 'operate',
      width: 120
    }
  ]
}
