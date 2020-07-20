import { areaDropdown, deptDropdown, accountDropdown, reportTypeDropdown } from '@/api/common'
import { parseTime } from '@/utils'

const deptSelectConfig = {
  params: {},
  itemType: 'select',
  selectFetch: deptDropdown,
  selectResultField: 'data',
  // selectResultHandler: (item) => ({ value: item.id, label: item.name })
  selectResultHandler: (item) => ({ value: item.id, label: item.name })
}
const areaSelectConfig = {
  params: {},
  itemType: 'select',
  selectFetch: areaDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.country })
}
const accountSelectConfig = {
  params: {},
  itemType: 'select',
  selectFetch: accountDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.name, label: item.name })
}
const reportTypeSelectConfig = {
  params: {},
  itemType: 'select',
  selectFetch: reportTypeDropdown,
  selectResultField: 'data',
  selectResultHandler: (item) => ({ value: item.id, label: item.reportName })
}
const verifyStateText = {
  WAITING: '待审核',
  SUCCESS: '已审核',
  CLEAR: '反审核'
}
const badgeType = {
  WAITING: 'primary',
  SUCCESS: 'success',
  CLEAR: 'info'
}
export function stateRender(h, row) {
  if (!h || !row) {
    return h('span', '-')
  }
  const state = row.verifyState
  return h('span', [
    h('el-badge', {
      props: { 'is-dot': true, 'type': badgeType[state] },
      style: { 'vertical-align': '-.5em', 'margin-right': '4px' }
    }),
    h('span', verifyStateText[state])
  ])
}

const timeFormat = (value, key) => {
  const formatVal = parseTime(value, '{y}-{m}-{d}')
  return { [key]: formatVal }
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'createTime', label: '生成时间', itemType: 'date', format: timeFormat },
      { prop: 'countryId', label: '国家', itemType: 'select', ...areaSelectConfig, selectOptions: { multiple: true }},
      { prop: 'accountId', label: '店铺', ...accountSelectConfig, selectOptions: { multiple: true }},
      { prop: 'deptId', label: '部门', ...deptSelectConfig, selectOptions: { multiple: true }},
      { prop: 'reportTypeId', label: '报表类型', ...reportTypeSelectConfig },
      { prop: 'paymentState', label: '账单状态', itemType: 'select',
        options: [
          { value: '', label: '全部' },
          { value: 'NONE', label: '未传账单' },
          { value: 'SUCCESS', label: '上传成功' },
          { value: 'FAIL', label: '上传失败' },
          { value: 'CLEAR', label: '账单清除' }
        ]
      },
      {
        prop: 'verifyState', label: '审核状态', itemType: 'select',
        options: [
          { value: '', label: '全部' },
          { value: 'SUCCESS', label: '已审核' },
          { value: 'WAITING', label: '待审核' },
          { value: 'CLEAR', label: '反审核' }
        ]
      }
    ]
  },
  columns: [
    {
      prop: 'fileUpload',
      label: '文件',
      width: 80,
      align: 'center',
      slotName: 'fileUpload'
    },
    {
      prop: 'reportName',
      label: '报表类型'
      // width: 120
    },
    {
      prop: 'deptName',
      label: '部门',
      width: 120
    },
    {
      prop: 'country',
      label: '国家'
      // width: 120
    },
    {
      prop: 'accountName',
      label: '店铺名称'
      // width: 120
    },
    {
      prop: 'paymentState',
      label: '账单状态',
      width: 120,
      align: 'center',
      slotName: 'paymentState'
    },
    {
      prop: 'startDate',
      label: '开始时间',
      formatter: row => parseTime(row.startDate, '{y}-{m}-{d}'),
      width: 150
    },
    {
      prop: 'endDate',
      label: '结束时间',
      formatter: row => parseTime(row.endDate, '{y}-{m}-{d}'),
      width: 150
    },
    {
      prop: 'createTime',
      label: '生成时间',
      formatter: row => parseTime(row.createTime, '{y}-{m}-{d}'),
      width: 150
    },
    {
      prop: 'verifyState',
      label: '审核状态',
      render: stateRender,
      width: 120
    },
    {
      prop: 'verifyUser',
      label: '审核人',
      width: 120
    },
    {
      prop: 'verifyTime',
      label: '审核时间',
      formatter: row => parseTime(row.verifyTime, '{y}-{m}-{d}'),
      width: 150
    },
    {
      prop: 'billingDetails',
      label: '账单详情',
      width: 80,
      align: 'center',
      slotName: 'billingDetails'
    }
  ]
}
