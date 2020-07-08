export default {
  formOptions: {
    inline: true,
    submitBtnText: '查询',
    forms: [
      { prop: 'name', label: '订单号' },
      { prop: 'name', label: '期间', itemType: 'month' },
      { prop: 'mobile', label: '账单时间', itemType: 'monthrange' },
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
      },
      {
        prop: 'sex', label: '数据类型', itemType: 'select',
        options: [
          { value: '', label: 'All' },
          { value: 0, label: 'Male' },
          { value: 1, label: 'Female' }
        ]
      },
      { prop: 'sex', label: '账单类型' },
      { prop: 'sex', label: '转换类型' }
    ]
  },
  columns: [
    { prop: '1', width: 150, label: '店铺名称' },
    { prop: '2', width: 150, label: '国家' },
    { prop: '3', width: 150, label: '部门' },
    { prop: '4', width: 150, label: '期间' },
    { prop: '5', width: 150, label: '当地时间' },
    { prop: '6', width: 150, label: '转换时间' },
    { prop: '7', width: 150, label: '结算号' },
    { prop: '8', width: 150, label: '类型' },
    { prop: '9', width: 150, label: '订单号' },
    { prop: '10', width: 150, label: 'Seller SKU' },
    { prop: '11', width: 150, label: '描述' },
    { prop: '12', width: 150, label: '数量' },
    { prop: '13', width: 150, label: '市场' },
    { prop: '14', width: 150, label: '发货方式' },
    { prop: '15', width: 150, label: '订单城市' },
    { prop: '123456789', width: 150, label: '所属政区' },
    { prop: '12345678916', width: 150, label: '邮编' },
    { prop: '17', width: 150, label: '税收模式' },
    { prop: '18', width: 150, label: '产品销售' },
    { prop: '19', width: 150, label: '产品销售税' },
    { prop: '20', width: 150, label: '运费' },
    { prop: '21', width: 150, label: '运费税' },
    { prop: '22', width: 150, label: '礼物包装积分' },
    { prop: '23', width: 150, label: '礼物包装积分税' },
    { prop: '24', width: 150, label: '亚马逊积分返点' },
    { prop: '25', width: 150, label: '促销折扣' },
    { prop: '26', width: 150, label: '促销折扣税' },
    { prop: '27', width: 150, label: '市场税' },
    { prop: '28', width: 150, label: '低值商品' },
    { prop: '29', width: 150, label: '销售费用' },
    { prop: '30', width: 150, label: 'fba运费' },
    { prop: '31', width: 150, label: '其他交易费用' },
    { prop: '32', width: 150, label: '其他费用' },
    { prop: '33', width: 150, label: '总计' },
    { prop: '34', width: 150, label: '总计差异' },
    { prop: '35', width: 150, label: '转换类型' },
    { prop: '36', width: 150, label: '订单收入(原币)' },
    { prop: '37', width: 150, label: '销售收入(原币)' },
    { prop: '38', width: 150, label: '运费收入(原币)' },
    { prop: '39', width: 150, label: '销售折扣(原币)' },
    { prop: '40', width: 150, label: '退款金额(原币)' },
    { prop: '41', width: 150, label: '亚马逊物料赔偿(原币)' },
    { prop: '42', width: 150, label: '手续费(原币)' },
    { prop: '43', width: 150, label: 'fba运费(原币)' },
    { prop: '44', width: 150, label: 'fba仓租(原币)' },
    { prop: '45', width: 150, label: '税金（原币）' },
    { prop: '46', width: 150, label: '市场税（原币）' },
    { prop: '47', width: 150, label: '广告费(原币)' },
    { prop: '48', width: 150, label: '广告费税费(原币)' },
    { prop: '49', width: 150, label: '转款(原币)' },
    { prop: '50', width: 150, label: '信用卡扣款(原币)' },
    { prop: '51', width: 150, label: '币别' },
    { prop: '52', width: 150, label: '汇率' },
    { prop: '53', width: 150, label: '订单收入(本位币)' },
    { prop: '54', width: 150, label: '销售收入(本位币)' },
    { prop: '55', width: 150, label: '运费收入(本位币)' },
    { prop: '56', width: 150, label: '销售折扣(本位币)' },
    { prop: '57', width: 150, label: '退款金额(本位币)' },
    { prop: '58', width: 150, label: '亚马逊物料赔偿(本位币)' },
    { prop: '59', width: 150, label: '手续费(本位币)' },
    { prop: '60', width: 150, label: 'fba运费(本位币)' },
    { prop: '61', width: 150, label: 'fba仓租(本位币)' },
    { prop: '62', width: 150, label: '税金（本位币）' },
    { prop: '63', width: 150, label: '市场税（本位币）' },
    { prop: '64', width: 150, label: '广告费(本位币)' },
    { prop: '65', width: 150, label: '广告费税费(本位币)' },
    { prop: '66', width: 150, label: '转款(本位币)' },
    { prop: '67', width: 150, label: '信用卡扣款(本位币)' },
    { prop: '68', width: 150, label: '公司型号' },
    { prop: '69', width: 150, label: '采购成本' },
    { prop: '70', width: 150, label: '头程运费' },
    { prop: '71', width: 150, label: '转运运费' },
    { prop: '72', width: 150, label: '自发货运费' }
  ]
}
