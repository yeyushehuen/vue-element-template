/**
 * Created by PanJiaChen on 16/11/18.
 */
import request from '@/utils/request'
import { validatenull, isObject, isArray, getDataType } from './validate'

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 删除Object中的空值
 * @param params
 */
export function deleteNullProps(params) {
  if (!isObject(params)) {
    return params
  }
  return Object.keys(params)
    .filter((key) => !validatenull(params[key]))
    .reduce((res, curKey) => {
      res[curKey] = params[curKey]
      return res
    }, {})
}

/**
 * 生成任意长度的字符串
 * @param flag 是否任意长度
 * @param minLen 最小长度，默认为1
 * @param maxLen 最大长度，默认必须
 *
 * @returns {string}
 */
export const randomStr = (function() {
  const strRepo = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ]

  return function({ flag, minLen = 1, maxLen }) {
    let res = ''
    let index
    let range = minLen
    if (flag) {
      range = Math.floor(Math.random() * (maxLen - minLen + 1) + minLen)
    }
    for (let i = 0; i < range; i++) {
      index = Math.round(Math.random() * (strRepo.length - 1))
      res += strRepo[index]
    }
    return res
  }
})()

/** 格式化为select下拉 */
export function toSelectOption(sourceData = [], valueKey, labelKey) {
  if (!isArray(sourceData)) {
    return []
  }

  return sourceData.map(item => ({ value: `${item[valueKey] || ''}`, label: item[labelKey] }))
}

export function dateRangeFormat(values, name) {
  if (isArray(values)) {
    const [startTime, endTime] = values
    return { startTime: parseTime(startTime, '{y}-{m}-{d}'), endTime: parseTime(endTime, '{y}-{m}-{d}') }
  }

  return values
}

export function monthRangeFormat(values, name) {
  if (isArray(values)) {
    const [startTime, endTime] = values
    return { startTime: parseTime(startTime, '{y}-{m}'), endTime: parseTime(endTime, '{y}-{m}') }
  }

  return values
}

/**
 * 替换指定位置的字符为指定字符或*号
 * @param {*} str 原始字符串
 * @param {*} startIndex 起始位置
 * @param {*} length 替换长度
 * @param {*} maskChar 指定要替换为的字符
 */
export function replaceSpecificChar(str, startIndex = 4, endIndex = 4, maskChar = '*') {
  if (!str) {
    return str
  }
  if (typeof (str) !== 'string') {
    return str
  }
  if (str.length < 9) {
    return str
  }
  const regex = new RegExp(`\\w{${startIndex}}(.*)\\w{${endIndex}}`)
  const matchResult = str.match(regex)[1]
  return str.replace(matchResult, Array(9).join(maskChar))
}

/** 状态转换，type=true,转换为启用禁用，false，转换为是否实体中心 */
const legalEnum = {
  Y: '是',
  N: '否'
}
const stateEnum = {
  Y: '启用',
  N: '禁用'
}
export function stateConvert(state, type = true) {
  if (validatenull(state)) {
    return '-'
  }
  if (type) {
    return stateEnum[state]
  }

  return legalEnum[state]
}

/**
 * 把json转URL参数
 * @param {*} params
 */
function toUrlParams(params) {
  const type = getDataType(params)
  if (type !== 'object') {
    return ''
  }

  const concatParams = Object.keys(params).reduce((res, curKey, idx) => {
    if (idx === 0) {
      res += `${curKey}=${params[curKey]}`
    } else {
      res += `&${curKey}=${params[curKey]}`
    }
    return res
  }, '')

  return window.encodeURIComponent(concatParams)
  // return concatParams
}

/**
 * 导出Excel公用方法
 * @param api 导出接口
 * @param query 导出查询参数
 * @param http:true原生下载，false：http下载
 */
export function downLoadFile(api, query, fileName, http = false) {
  // if (http) {
  //   try {
  //     const a = document.createElement('a')
  //     const clearHref = process.env.VUE_APP_BASE_API + api + '?' + toUrlParams(query)
  //     a.href = clearHref.replace(/\/\//, '/')
  //     debugger
  //     const event = document.createEvent('MouseEvents')
  //     event.initEvent('click', true, true)
  //     a.dispatchEvent(event)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   return true
  // } else {
  //   request({
  //     url: api,
  //     method: 'get',
  //     responseType: 'blob',
  //     params: query
  //   }).then(function(response) {
  //     var blob = new Blob([response.data || ''])
  //     var downloadElement = document.createElement('a')
  //     var href = window.URL.createObjectURL(blob) // 创建下载的链接
  //     downloadElement.href = href
  //     downloadElement.download = fileName + '.csv' // 下载后文件名
  //     document.body.appendChild(downloadElement)
  //     downloadElement.click() // 点击下载
  //     document.body.removeChild(downloadElement) // 下载完成移除元素
  //     window.URL.revokeObjectURL(href) // 释放掉blob对象
  //   }).catch(function(error) {
  //     console.log(error)
  //   })
  // }
  if (!api) {
    return false
  }
  // const subAPI = `${api}`.startsWith('/') ? `${api}`.substring(1) : api
  debugger
  try {
    const a = document.createElement('a')
    a.href = process.env.VUE_APP_BASE_API + api + '?' + toUrlParams(query)
    debugger
    const event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    a.dispatchEvent(event)
  } catch (error) {
    console.log(error)
  }
}
