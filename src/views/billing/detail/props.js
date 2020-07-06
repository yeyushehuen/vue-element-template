import { areaDropdown, deptDropdown } from '@/api/common'

const deptSelectConfig = {
  params: {},
  itemType: 'select',
  selectFetch: deptDropdown,
  selectResultField: 'data',
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
  // params: {},
  itemType: 'select'
  // selectFetch: areaDropdown,
  // selectResultField: 'data',
  // selectResultHandler: (item) => ({ value: item.id, label: item.name })
}

export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'createTime', label: '生成时间', itemType: 'date' },
      { prop: 'countryId', label: '国家', itemType: 'select', ...areaSelectConfig },
      { prop: 'accountId', label: '店铺', ...accountSelectConfig },
      { prop: 'deptId', label: '部门', ...deptSelectConfig },
      { prop: 'reportTypeId', label: '报表类型', itemType: 'select' },
      { prop: 'paymentState', label: '账单状态' },
      {
        prop: 'verifyState', label: '审核状态', itemType: 'select',
        options: [
          { value: '', label: '全部' },
          { value: 'Y', label: '通过' },
          { value: 'N', label: '驳回' }
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
      prop: 'reportTypeId',
      label: '报表类型',
      width: 120
    },
    {
      prop: 'deptId',
      label: '部门',
      width: 120
    },
    {
      prop: 'country',
      label: '国家',
      width: 120
    },
    {
      prop: 'accountId',
      label: '店铺名称',
      width: 120
    },
    {
      prop: 'paymentState',
      label: '账单状态',
      width: 120
    },
    {
      prop: 'startDate',
      label: '开始时间',
      width: 120
    },
    {
      prop: 'endDate',
      label: '结束时间'
    },
    {
      prop: 'createTime',
      label: '生成时间',
      width: 120
    },
    {
      prop: 'verifyState',
      label: '审核状态',
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
      width: 120
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
