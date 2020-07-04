export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '店铺名称' },
      {
        prop: 'deptId', label: '销售部门', itemType: 'select',
        options: []
      },
      {
        prop: 'sellerCountry', label: '销售国家', itemType: 'select',
        options: []
      },
      {
        prop: 'seller_legal_id', label: '销售主体', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
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
      label: '店铺名称'
    },
    {
      prop: 'nameShort',
      label: '店铺简称'
    },
    {
      prop: 'deptName',
      label: '销售部门'
    },
    {
      prop: 'sellerCountry',
      label: '销售国家'
    },
    {
      prop: 'sellerLegal',
      label: '销售主体'
    }, {
      prop: 'sellerId',
      label: 'Seller ID'
    }, {
      prop: 'token',
      label: 'Token'
    }, {
      prop: 'secretKey',
      label: 'secretKey'
    }, {
      prop: 'awsAccesskeyId',
      label: 'awsAccessKeyId',
      width: 180
    }, {
      prop: 'principal',
      label: '负责人'
    }, {
      prop: 'state',
      label: '状态'
    }, {
      prop: 'createUser',
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