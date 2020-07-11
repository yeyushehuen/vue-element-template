import { deptDropdown, areaDropdown, leDropdown } from '@/api/common'
import { replaceSpecificChar, stateConvert } from '@/utils'

const deptSelectConfig = {
  itemType: 'select',
  selectFetch: deptDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.name })
}
const countrySelectConfig = {
  itemType: 'select',
  selectFetch: areaDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.country })
}
const legalSelectConfig = {
  itemType: 'select',
  selectFetch: leDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.legalName })
}

const types = {
  Y: 'primary',
  N: 'danger'
}

export function stateRender(h, row) {
  if (!h || !row) {
    return h('span', '-')
  }
  const state = row.state
  return h('span', [
    h('el-badge', {
      props: { 'is-dot': true, 'type': types[state] },
      style: { 'vertical-align': '-.5em', 'margin-right': '4px' }
    }),
    h('span', stateConvert(state))
  ])
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '店铺名称' },
      {
        prop: 'deptId', label: '销售部门', ...deptSelectConfig
      },
      {
        prop: 'sellerCountry', label: '销售国家', ...countrySelectConfig
      },
      {
        prop: 'sellerLegalId', label: '销售主体', ...legalSelectConfig
      },
      { prop: 'sellerId', label: 'seller ID' },
      { prop: 'principal', label: '负责人' },
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
      prop: 'name',
      label: '店铺名称',
      width: 150
    },
    {
      prop: 'nameShort',
      label: '店铺简称',
      width: 150
    },
    {
      prop: 'deptName',
      label: '销售部门',
      width: 150
    },
    {
      prop: 'sellerCountry',
      label: '销售国家',
      width: 150
    },
    {
      prop: 'sellerLegal',
      label: '销售主体',
      width: 150
    }, {
      prop: 'sellerId',
      label: 'Seller ID',
      formatter: (row) => replaceSpecificChar(row && row.sellerId) || '-',
      width: 150
    }, {
      prop: 'token',
      label: 'Token',
      formatter: (row) => replaceSpecificChar(row && row.token) || '-',
      width: 150
    }, {
      prop: 'secretKey',
      label: 'secretKey',
      formatter: (row) => replaceSpecificChar(row && row.secretKey) || '-',
      width: 150
    }, {
      prop: 'awsAccesskeyId',
      label: 'awsAccessKeyId',
      formatter: (row) => replaceSpecificChar(row && row.awsAccesskeyId) || '-',
      width: 150
    }, {
      prop: 'principal',
      label: '负责人',
      width: 150
    }, {
      prop: 'state',
      label: '状态',
      render: stateRender
    }, {
      prop: 'createUser',
      label: '创建人'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: 160
    },
    {
      prop: 'operate',
      label: '操作',
      slotName: 'operate',
      width: 120
    }
  ]
}
