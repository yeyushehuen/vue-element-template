import { deptDropdown, areaDropdown, leDropdown } from '@/api/common'

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
      width: 150
    }, {
      prop: 'token',
      label: 'Token',
      render: () => '************',
      width: 150
    }, {
      prop: 'secretKey',
      label: 'secretKey',
      render: () => '************',
      width: 150
    }, {
      prop: 'awsAccesskeyId',
      label: 'awsAccessKeyId',
      render: () => '************',
      width: 150
    }, {
      prop: 'principal',
      label: '负责人',
      width: 150
    }, {
      prop: 'state',
      label: '状态'
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
