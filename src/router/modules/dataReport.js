/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const billingRouter = {
  path: '/datareport',
  component: Layout,
  redirect: '/datareport/detail',
  alwaysShow: true, // will always show the root menu
  name: '数据报表',
  meta: {
    title: '数据报表',
    icon: 'el-icon-money'
  },
  children: [
    {
      path: 'detail',
      component: () => import('@/views/dataReport/simpleReport'),
      name: 'SimpleReport',
      meta: {
        title: '无公司型号'
      }
    },
    {
      path: 'data',
      component: () => import('@/views/dataReport/detailReport'),
      name: 'DetailReport',
      meta: {
        title: '有公司型号'
        // if do not set roles, means: this page does not require permission
      }
    }
  ]
}

export default billingRouter
