export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '生成时间', itemType: 'date' },
      {
        prop: 'mobile', label: '国家', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      {
        prop: 'testProps', label: '店铺', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      {
        prop: 'mobilasdfe', label: '部门', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      {
        prop: 'sex', label: '报表类型', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      {
        prop: 'sex', label: '账单状态', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      {
        prop: 'sexs', label: '审核状态', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      }
    ]
  },
  columns: [
    {
      prop: '1',
      label: '文件',
      width: 120,
      render: () => '待处理'
    },
    // 格式化为字符串
    {
      prop: 'reportTypeId',
      label: '报表类型',
      width: 120
    },
    {
      prop: 'accountId',
      label: '部门',
      width: 120
    },
    {
      prop: 'country',
      label: '国家',
      width: 120
    },
    {
      prop: '5',
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
      prop: '9',
      label: '生成时间',
      width: 120
    },
    {
      prop: 'verifyState',
      label: '审核状态',
      width: 120
    },
    {
      prop: '11',
      label: '审核人',
      width: 120
    },
    {
      prop: 'verifyTime',
      label: '审核时间',
      width: 120
    },
    {
      prop: '13',
      label: '账单详情',
      width: 120
    }, {
      prop: 'createTime',
      label: '创建时间',
      width: 120
    }
  ]
}
