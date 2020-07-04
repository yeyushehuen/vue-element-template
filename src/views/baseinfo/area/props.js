export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'province', label: '州属' },
      { prop: 'country', label: '国家' },
      { prop: 'nameShort', label: '简称' }
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
