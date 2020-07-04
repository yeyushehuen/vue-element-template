import request from '@/utils/request'

/** ******************** type类型转换 *********************/
/* 新增 */
export function addType({ data } = {}) {
  return request({
    url: '/type/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateCurrency({ id, data } = {}) {
  debugger
  return request({
    url: `/type/edit`,
    method: 'put',
    data: { id, ...data }
  })
}
/* 删除 */
export function deleteCurrency(id) {
  return request({
    url: `/type/remove`,
    method: 'delete',
    data: { id }
  })
}
/** 获取修改详情 */
export function getCurrencyById(id) {
  return request({
    url: '/type/getById',
    method: 'get',
    params: { id }
  })
}

/** ******************** Seller Sku 关系维护 *********************/
/* 新增 */
export function addSkuRelation({ data } = {}) {
  return request({
    url: '/skuRelation/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateSkuRelation({ id, data } = {}) {
  return request({
    url: `/skuRelation/edit`,
    method: 'put',
    data: { id, ...data }
  })
}
/* 删除 */
export function deleteSkuRelation(id) {
  return request({
    url: `/skuRelation/remove`,
    method: 'delete',
    data: { id }
  })
}
/** 获取修改详情 */
export function getSkuRelationById(id) {
  return request({
    url: '/skuRelation/getById',
    method: 'get',
    params: { id }
  })
}

/** ******************** 汇率数据 *********************/
/* 新增 */
export function addExchangeRate({ data } = {}) {
  return request({
    url: '/exchangeRate/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateExchangeRate({ id, data } = {}) {
  return request({
    url: `/exchangeRate/edit`,
    method: 'put',
    data: { id, ...data }
  })
}
/* 删除 */
export function deleteExchangeRate(id) {
  return request({
    url: `/exchangeRate/remove`,
    method: 'delete',
    data: { id }
  })
}
/** 获取修改详情 */
export function getExchangeRateById(id) {
  return request({
    url: '/exchangeRate/getById',
    method: 'get',
    params: { id }
  })
}
/** ******************** 成本数据 *********************/
/* 新增 */
export function addSkuCost({ data } = {}) {
  return request({
    url: '/skuCost/add',
    method: 'post',
    data
  })
}
/* 修改 */
export function updateSkuCost({ id, data } = {}) {
  return request({
    url: `/skuCost/edit`,
    method: 'put',
    data: { id, ...data }
  })
}
/* 删除 */
export function deleteSkuCost(id) {
  return request({
    url: `/skuCost/remove`,
    method: 'delete',
    data: { id }
  })
}
/** 获取修改详情 */
export function getSkuCostById(id) {
  return request({
    url: '/skuCost/getById',
    method: 'get',
    params: { id }
  })
}
