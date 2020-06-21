export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: 'Name' },
      { prop: 'mobile', label: 'Mobile' },
      { prop: 'testProps', label: '测试属性' },
      { prop: 'mobilasdfe', label: 'Mobiasdfle' },
      { prop: 'sex', label: 'Sex', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      { prop: 'sex', label: 'Sesdfdsfx', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      { prop: 'sexs', label: 'Sexdsf', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      { prop: 'sexd', label: 'Ssdex', itemType: 'select',
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
      prop: 'name',
      label: '姓名',
      slotName: 'name'
    },
    // 格式化为字符串
    {
      prop: 'sex',
      label: '性别'
    },
    {
      prop: 'age',
      label: '年龄'
    },
    {
      prop: 'score',
      label: '分数'
    },
    {
      prop: '',
      label: '操作'
    }
  ]
}
