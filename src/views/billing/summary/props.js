export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '期间', itemType: 'daterange' },
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
      }
    ]
  },
  columns: [
    { label: '期间', props: '1', width: 150 },
    { label: '部门', props: '2', width: 150 },
    { label: '国家', props: '3', width: 150 },
    { label: '店铺名称', props: '4', width: 150 },
    { label: '币别', props: '5', width: 150 },
    { label: '汇率', props: '6', width: 150 },
    { label: '业务类型', props: '7', width: 150 },
    { label: '原币金额', props: '8', width: 150 },
    { label: '本币金额', props: '9', width: 150 },
    { label: '是否结账', props: '10', width: 150 },
    { label: '操作', props: 'operate' }
  ]
}
