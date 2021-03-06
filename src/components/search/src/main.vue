
<template>
  <el-form
    ref="form"
    :model="params"
    size="small"
    :inline="inline"
    :label-width="labelWidth ? (labelWidth + 'px') : ''"
    @submit.native.prevent="searchHandler()"
  >
    <div class="search-input-area" :class="{ hideHigherSearch: isHide }">
      <el-form-item
        v-for="(form, index) in computedForms"
        :key="form.prop"
        :prop="form.prop"
        :label="form.label"
        :rules="form.rules || []"
        :label-width="form.labelWidth ? (form.labelWidth + 'px') : ''"
      >
        <el-input
          v-if="form.itemType === 'input' || form.itemType === undefined"
          v-model="params[form.modelValue]"
          :size="form.size ? form.size : size"
          :readonly="form.readonly"
          :disabled="form.disabled"
          :placeholder="form.placeholder || '请输入' + form.label"
          :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
          @keyup.enter.native="searchHandler()"
        />
        <el-select
          v-else-if="form.itemType === 'select'"
          v-model="params[form.modelValue]"
          filterable
          clearable
          collapse-tags
          :size="form.size ? form.size : size"
          :disabled="form.disabled"
          :placeholder="form.placeholder || '请选择' + form.label"
          :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
          v-bind="form.selectOptions || {}"
        >
          <el-option
            v-for="(option, optionIndex) in form.options"
            :key="optionIndex + '_local'"
            :value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
            :label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option"
          />
          <el-option
            v-for="(op, opIndex) in selectOptions[selectOptionPrefix + index]"
            :key="opIndex + '_remote'"
            :value="(typeof op === 'object') ? op[form.valueKey || 'value'] : op"
            :label="(typeof op === 'object') ? op[form.labelKey || 'label'] : op"
          />
        </el-select>
        <el-date-picker
          v-else-if="form.itemType === 'date'"
          v-model="params[form.modelValue]"
          type="date"
          :placeholder="form.placeholder || '请选择时间'"
          :size="form.size ? form.size : size"
          :disabled="form.disabled"
          :readonly="form.readonly"
          :editable="form.editable"
          :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
          :picker-options="form.pickerOptions || {}"
        />
        <el-date-picker
          v-else-if="form.itemType === 'month'"
          v-model="params[form.modelValue]"
          type="month"
          :placeholder="form.placeholder || '请选择期间'"
          :size="form.size ? form.size : size"
          :disabled="form.disabled"
          :readonly="form.readonly"
          :editable="form.editable"
          :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
          :picker-options="form.pickerOptions || {}"
        />
        <el-date-picker
          v-else-if="form.itemType === 'monthrange'"
          v-model="params[form.modelValue]"
          type="monthrange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :picker-options="form.pickerOptions || {}"
        />
        <el-date-picker
          v-else-if="form.itemType === 'daterange'"
          v-model="params[form.modelValue]"
          :size="form.size ? form.size : size"
          type="daterange"
          :disabled="form.disabled"
          :readonly="form.readonly"
          :editable="form.editable"
          :placeholder="form.placeholder"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
          :picker-options="form.pickerOptions || {}"
        />
      </el-form-item>
    </div>
    <div class="search-button">
      <el-form-item v-show="showMoreBtn" label>
        <i
          class="el-icon-d-arrow-right"
          :style="isHide ? 'transform: rotate(90deg)' : 'transform: rotate(-90deg)'"
          @click="higherSearchTrigger"
        />
      </el-form-item>
      <el-form-item label>
        <el-button
          type="primary"
          :size="size"
          :loading="submitLoading"
          @click="searchHandler"
        >{{ submitBtnText }}</el-button>
        <el-button
          :plain="true"
          :size="size"
          :loading="submitLoading"
          @click="resetForm"
        >{{ resetBtnText }}</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { formProps } from './props'

export default {
  name: 'ElSearchForm',
  props: formProps,
  data() {
    const { forms, fuzzy } = this.$props
    const datePrefix = 'daterange-prefix'
    const selectOptionPrefix = 'select-option-prefix'
    const dataObj = {
      selectOptions: {}
    }

    const params = {}
    const format = {}
    const fuzzyOps = {}

    forms.forEach((v, i) => {
      const propType = typeof v.prop
      if (propType === 'string') {
        v.modelValue = v.prop
        params[v.prop] = ''

        fuzzyOps[v.prop] = v.fuzzy ? v.fuzzy : fuzzy
        if (v.format) {
          format[v.prop] = v.format
        }
      }
      // else if (
      //   propType === 'object' &&
      //   Object.prototype.toString.call(v.prop) === '[object Array]'
      // ) {
      //   v.prop.forEach(vv => {
      //     params[vv] = ''
      //     if (v.format) {
      //       format[vv] = v.format
      //     }

      //     fuzzyOps[vv] = v.fuzzy ? v.fuzzy : fuzzy
      //   })
      // }
      // if (v.itemType === 'daterange') {
      //   params[datePrefix + i] = ''
      //   v.modelValue = datePrefix + i
      // }
      if (v.itemType === 'select' && (v.selectFetch || v.selectUrl)) {
        const dataKey = selectOptionPrefix + i
        dataObj.selectOptions[dataKey] = []
        const { $axios } = this
        if (!v.selectMethod) {
          v.selectMethod = 'get'
        }
        this.getRemoteData({
          fetch: v.selectFetch
            ? v.selectFetch
            : () => {
              return $axios[v.selectMethod](
                v.selectUrl,
                v.selectMethod.toLowerCase() === 'get'
                  ? { params: v.selectParams }
                  : v.selectParams
              )
            },
          dataKey,
          resultField: v.selectResultField || 'result',
          resultHandler: v.selectResultHandler
        })
      }
    })
    return {
      params,
      datePrefix,
      selectOptionPrefix,
      ...dataObj,
      format,
      fuzzyOps,
      isHide: true
    }
  },
  computed: {
    itemStyle() {
      const { itemWidth } = this
      if (itemWidth) {
        return `width: ${itemWidth}px;`
      }
      return ''
    },
    computedForms() {
      const { forms } = this.$props
      const wth = window.innerWidth
      const sm = wth <= 1000
      const md = (wth > 1000 && wth <= 1400)
      const lg = wth > 1400
      const sliceLength = lg ? 4 : (md ? 3 : (sm ? 1 : 2))

      return this.isHide ? forms.slice(0, sliceLength) : forms
    },
    showMoreBtn() {
      const wth = window.innerWidth
      const sm = wth <= 1000
      const md = (wth > 1000 && wth <= 1400)
      const lg = wth > 1400
      const sliceLength = lg ? 4 : (md ? 3 : (sm ? 1 : 2))
      return sliceLength < this.forms.length
    }
  },
  mounted() {
    this.$emit('getSearhRef', this.getFormatedParams)
  },
  methods: {
    isArray(value) {
      return (
        typeof value === 'object' &&
        Object.prototype.toString.call(value) === '[object Array]'
      )
    },
    searchHandler() {
      this.getParams((error, params) => {
        if (!error) {
          const { submitHandler } = this
          if (submitHandler) {
            submitHandler(params)
          } else {
            throw new Error('Need to set attribute: submitHandler !')
          }
        }
      })
    },
    getParamFuzzy() {
      return this.fuzzyOps
    },
    getFormatedParams() {
      const { params, format, computedForms } = this
      const formattedForm = {}
      computedForms.forEach(({ prop: v }) => {
        if (typeof format[v] === 'function') {
          const formatedValues = format[v](params[v], v)
          Object.keys(formatedValues).forEach(key => {
            formattedForm[key] = formatedValues[key]
          })
        } else {
          formattedForm[v] = Array.isArray(params[v]) ? params[v].join(',') : params[v]
        }
      })

      return formattedForm
    },
    getParams(callback) {
      const _this = this
      _this.$refs['form'].validate(valid => {
        if (valid) {
          // const { params, datePrefix, format } = this
          const formattedForm = _this.getFormatedParams()
          // 注释掉，只获取显示的表单参数
          // Object.keys(params).forEach(v => {
          //   if (typeof format[v] === 'function') {
          //     const formatedValues = format[v](params[v], v)
          //     // formattedForm[v] = formatedValues
          //     Object.keys(formatedValues).forEach(key => {
          //       formattedForm[key] = formatedValues[key]
          //     })
          //   } else {
          //     formattedForm[v] = params[v]
          //   }
          // })
          if (callback) callback(null, formattedForm)
        } else {
          if (callback) callback(new Error())
        }
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
      const { resetBtnCallback } = this
      if (resetBtnCallback) resetBtnCallback()
    },
    changeDate(date, startDate, endDate) {
      let dates
      if (date === null) {
        this.params[startDate] = ''
        this.params[endDate] = ''
        return
      }
      if (typeof date === 'string') {
        dates = date.split(' - ')
      } else if (date && date.hasOwnProperty('length')) {
        const firstDate = date[0]
        const secondDate = date[1]
        dates = [
          `${firstDate.getFullYear()}-${(
            '0' +
            (firstDate.getMonth() + 1)
          ).substr(-2)}-${('0' + firstDate.getDate()).substr(-2)}`,
          `${secondDate.getFullYear()}-${(
            '0' +
            (secondDate.getMonth() + 1)
          ).substr(-2)}-${('0' + secondDate.getDate()).substr(-2)}`
        ]
      }

      this.params[startDate] = dates[0]
      this.params[endDate] = dates[1]
    },
    getRemoteData({ fetch, dataKey, resultField, resultHandler }) {
      fetch().then(response => {
        let result = response
        if (typeof response === 'object' && !this.isArray(response)) {
          if (resultField.indexOf('.') !== -1) {
            resultField.split('.').forEach(vv => {
              result = result[vv]
            })
          } else {
            result = response[resultField]
          }
        }

        if (!result || !(result instanceof Array)) {
          console.warn(
            `The result of key:${resultField} is not Array. 接口返回的字段:${resultField} 不是一个数组`
          )
        }

        if (resultHandler) {
          this.selectOptions[dataKey] = result ? result.map(resultHandler) : []
        } else {
          this.selectOptions[dataKey] = result || []
        }
      })
    },
    higherSearchTrigger() {
      this.isHide = !this.isHide
      this.getParams((error, params) => {
        if (!error) {
          this.$emit('higherSearchChange', this.isHide)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div[class="search-input-area"] {
  max-height: 2000px;
  overflow: hidden;
  transition: max-height .3s;
}
.search-input-area.hideHigherSearch {
  max-height: 59px;
  div.el-form-item:nth-child(n + 5) {
    display: none;
  }
  @media only screen and (max-width: 1400px) {
    div.el-form-item:nth-child(n + 4) {
      display: none;
    }
  }
  @media only screen and (max-width: 1000px) {
    div.el-form-item:nth-child(n + 3) {
      display: none;
    }
  }
}
</style>
