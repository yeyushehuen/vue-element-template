import { areaDropdown } from '@/api/common'

const areaSelectConfig = {
  params: {},
  itemType: 'select',
  selectFetch: areaDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.country })
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'countryId', label: '国家', itemType: 'select', ...areaSelectConfig, selectOptions: { multiple: true }},
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
      prop: 'changeType',
      label: '转换类型'
    },
    {
      prop: 'changeDetail',
      label: '转换类型-细分类'
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
