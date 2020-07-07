export const paginationConfig = {
  background: true, // 背景颜色
  currentPage: 1, // 当前页数
  pageSize: 20, // 每页显示多少条
  layout: 'total, prev, pager, next, sizes, jumper',
  pageSizes: [20, 50, 100],
  total: 0
}

export const actionTextConfig = {
  add: '新增',
  update: '修改',
  delete: '删除',
  import: '导入',
  export: '导出',
  disable: '禁用',
  enable: '启用',
  translate: '移动',
  view: '一键查看',
  manualReport: '手动生成报表记录',
  start: '启动',
  stop: '停止',
  audit: '审核',
  reviews: '反审核',
  clear: '清除',
  setUp: '结账',
  reconciliation: '重算',
  summary: '汇总',
  checkOut: '反结账'
}

export const actionCode = {
  add: 'add',
  update: 'update',
  delete: 'delete',
  import: 'import',
  export: 'export',
  disable: 'disable',
  enable: 'enable',
  translate: 'translate',
  view: 'view',
  manualReport: 'manualReport',
  start: 'start',
  stop: 'stop',
  clear: 'clear',
  audit: 'audit',
  reviews: 'reviews',
  setUp: 'setUp',
  checkOut: 'checkOut',
  reconciliation: 'reconciliation',
  summary: 'summary'
}

/** 动作操作成功之后对应的提示信息 */
export const successText = {
  add: '新增成功',
  update: '修改成功',
  delete: '删除成功',
  import: 'import',
  export: 'export',
  disable: '禁用成功',
  enable: '启用成功',
  translate: '转移成功',
  view: 'view',
  manualReport: 'manualReport',
  start: '启动成功',
  stop: '停止成功',
  setUp: 'setUp',
  checkOut: 'checkOut',
  reconciliation: 'reconciliation',
  summary: 'summary'
}
