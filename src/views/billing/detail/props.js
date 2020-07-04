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
      label: '文件'
    },
    // 格式化为字符串
    {
      prop: '2',
      label: '报表类型'
    },
    {
      prop: '3',
      label: '部门'
    },
    {
      prop: '4',
      label: '国家'
    },
    {
      prop: '5',
      label: '店铺名称'
    },
    {
      prop: '6',
      label: '账单状态'
    },
    {
      prop: '7',
      label: '开始时间'
    },
    {
      prop: '8',
      label: '结束时间'
    },
    {
      prop: '9',
      label: '生成时间'
    },
    {
      prop: '10',
      label: '审核状态'
    },
    {
      prop: '11',
      label: '审核人'
    },
    {
      prop: '12',
      label: '审核时间'
    },
    {
      prop: '13',
      label: '账单详情'
    }
  ]
}
