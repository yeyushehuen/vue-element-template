/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const billingRouter = {
  path: '/billing',
  component: Layout,
  redirect: '/billing/detail',
  alwaysShow: true, // will always show the root menu
  name: '账单情况',
  meta: {
    title: '账单情况',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'detail',
      component: () => import('@/views/permission/page'),
      name: '账单详情',
      meta: {
        title: '账单详情',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'data',
      component: () => import('@/views/permission/directive'),
      name: '数据详情',
      meta: {
        title: '数据详情'
        // if do not set roles, means: this page does not require permission
      }
    },
    {
      path: 'summary',
      component: () => import('@/views/permission/role'),
      name: '数据汇总',
      meta: {
        title: '数据汇总',
        roles: ['admin']
      }
    }
  ]
}

export default billingRouter
