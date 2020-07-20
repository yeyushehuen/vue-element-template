import { areaDropdown } from '@/api/common'
import { stateRender } from '../shop/props'

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
      { prop: 'province', label: '州属' },
      // { prop: 'countryId', label: '国家', itemType: 'select', ...areaSelectConfig },
      { prop: 'country', label: '国家' },
      { prop: 'nameShort', label: '简称' },
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
      prop: 'province',
      label: '州属'
    },
    {
      prop: 'country',
      label: '国家'
    },
    {
      prop: 'nameShort',
      label: '简称'
    },
    {
      prop: 'currencyName',
      label: '货币名称'
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
