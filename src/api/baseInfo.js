import request from '@/utils/request'

/** ******************** 货币管理 *********************/
/* 新增 */
export function addCurrency(data) {
  return request({
    url: '/currency/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateCurrency(id, data) {
  return request({
    url: `/currency/edit`,
    method: 'put',
    data: { id, ...data }
  })
}
/* 删除 */
export function deleteCurrency(id) {
  return request({
    url: `/currency/remove/${id}`,
    method: 'delete'
  })
}
/** 获取修改详情 */
export function getCurrencyById(id) {
  return request({
    url: '/currency/getById',
    method: 'get',
    params: { id }
  })
}

/** ******************** 区域管理 *********************/
/* 新增 */
export function addArea(data) {
  return request({
    url: '/area/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateArea(id, data) {
  return request({
    url: `/area/edit/${id}`,
    method: 'put',
    data
  })
}
/* 删除 */
export function deleteArea(id) {
  return request({
    url: `/area/remove/${id}`,
    method: 'delete'
  })
}
/** 获取修改详情 */
export function getAreaById(id) {
  return request({
    url: '/area/getById',
    method: 'get',
    params: { id }
  })
}

/** ******************** 部门管理 *********************/
/* 新增 */
export function addDept(data) {
  return request({
    url: '/dept/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateDept(id, data) {
  return request({
    url: `/dept/edit/${id}`,
    method: 'put',
    data
  })
}
/* 删除 */
export function deleteDept(id) {
  return request({
    url: `/dept/delete/${id}`,
    method: 'delete'
  })
}
/** 获取修改详情 */
export function getDeptById(id) {
  return request({
    url: '/dept/getById',
    method: 'get',
    params: { id }
  })
}
/** ******************** 销售主体 *********************/
/* 新增 */
export function addLegalEntity(data) {
  return request({
    url: '/legalEntity/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateLegalEntity(id, data) {
  return request({
    url: `/legalEntity/edit/${id}`,
    method: 'put',
    data
  })
}
/* 删除 */
export function deleteLegalEntity(id) {
  return request({
    url: `/legalEntity/delete/${id}`,
    method: 'delete'
  })
}
/** 获取修改详情 */
export function getLegalEntityById(id) {
  return request({
    url: '/legalEntity/getById',
    method: 'get',
    params: { id }
  })
}
/** ******************** 报表类型 *********************/
/* 新增 */
export function addReportType(data) {
  return request({
    url: '/reportType/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateReportType(id, data) {
  return request({
    url: `/reportType/edit/${id}`,
    method: 'put',
    data
  })
}
/* 删除 */
export function deleteReportType(id) {
  return request({
    url: `/reportType/delete/${id}`,
    method: 'delete'
  })
}
/** 获取修改详情 */
export function getReportTypeById(id) {
  return request({
    url: '/reportType/getById',
    method: 'get',
    params: { id }
  })
}
/** ******************** 店铺管理 *********************/
/* 新增 */
export function addAccount(data) {
  return request({
    url: '/account/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateAccount(id, data) {
  return request({
    url: `/account/edit/${id}`,
    method: 'put',
    data
  })
}
/* 删除 */
export function deleteAccount(id) {
  return request({
    url: `/account/delete/${id}`,
    method: 'delete'
  })
}
/** 获取修改详情 */
export function getAccountById(id) {
  return request({
    url: '/account/getById',
    method: 'get',
    params: { id }
  })
}
