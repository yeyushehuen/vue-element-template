import request from '@/utils/request'
/** ****************** 下拉通用api ****************** */
/** 州属下拉框 */
export function areaDropdown() {
  return request({
    url: '/basic/areaDropdown',
    method: 'get'
  })
}
/** 币别下拉框 */
export function currencyDropdown() {
  return request({
    url: '/basic/currencyDropdown',
    method: 'get'
  })
}
/** 部门下拉框 */
export function deptDropdown() {
  return request({
    url: '/basic/deptDropdown',
    method: 'get'
  })
}

/** 实体下拉框 */
export function leDropdown() {
  return request({
    url: '/basic/leDropdown',
    method: 'get'
  })
}

/** 店铺下拉框 */
export function accountDropdown() {
  return request({
    url: '/basic/accountDropdown',
    method: 'get'
  })
}
/** 报表类型下拉框 */
export function reportTypeDropdown() {
  return request({
    url: '/basic/reportTypeDropdown',
    method: 'get'
  })
}
/** 修改汇率取值方式 */
export function editExRage(data) {
  return request({
    url: '/basic/editExRage',
    method: 'put',
    data
  })
}
/** 修改成本取值方式 */
export function editSkuCost(data) {
  return request({
    url: '/basic/editSkuCost',
    method: 'put',
    data
  })
}
/** 成本取值方式下拉框 */
export function costValueMethodDropdown() {
  return request({
    url: '/basic/methodSkuCost',
    method: 'get'
  })
}
/** 汇率取值方式下拉框 */
export function rateValueMethodDropdown() {
  return request({
    url: '/basic/methodExRate',
    method: 'get'
  })
}
