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
