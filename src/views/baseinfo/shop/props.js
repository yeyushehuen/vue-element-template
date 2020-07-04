export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '店铺名称' },
      { prop: 'sex', label: '销售部门', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      { prop: 'sex', label: '销售国家', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      { prop: 'sexs', label: '销售主体', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      { prop: 'sellerId', label: 'seller ID' },
      { prop: 'leader', label: '负责人' },
      { prop: 'status', label: '状态', itemType: 'select',
        options: [
          { value: 0, label: '启用' },
          { value: 1, label: '禁用' }
        ]
      }
    ]
  },
  columns: [
    {
      prop: 'name',
      label: '店铺名称'
    },
    {
      prop: 'sex',
      label: '店铺简称'
    },
    {
      prop: 'age',
      label: '销售部门'
    },
    {
      prop: 'score',
      label: '销售国家'
    },
    {
      prop: '0',
      label: '销售主体'
    }, {
      prop: '1',
      label: 'Seller ID'
    }, {
      prop: '2',
      label: 'Token'
    }, {
      prop: '3',
      label: 'secretKey'
    }, {
      prop: '4',
      label: 'awsAccessKeyId',
      width: 180
    }, {
      prop: '5',
      label: '负责人'
    }, {
      prop: '6',
      label: '状态'
    }, {
      prop: '7',
      label: '创建人'
    }, {
      prop: '8',
      label: '创建时间'
    },
    {
      prop: 'operate',
      label: '操作',
      slotName: 'operate'
    }
  ]
}
