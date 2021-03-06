/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const dataMaintainRouter = {
  path: '/datamaintain',
  component: Layout,
  redirect: '/datamaintain/conversion',
  alwaysShow: true, // will always show the root menu
  name: '数据维护',
  meta: {
    title: '数据维护',
    icon: 'el-icon-coin'
    // roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'conversion',
      component: () => import('@/views/datamaintain/conversion'),
      name: 'Conversion',
      meta: {
        title: '类型转换'
        // roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    // {
    //   path: 'relationship',
    //   component: () => import('@/views/datamaintain/relationship'),
    //   name: '关系维护',
    //   meta: {
    //     title: '关系维护'
    //   }
    // },
    {
      path: 'rate',
      component: () => import('@/views/datamaintain/rate'),
      name: 'Rate',
      meta: {
        title: '汇率数据'
        // roles: ['admin']
      }
    },
    {
      path: 'cost',
      component: () => import('@/views/datamaintain/cost'),
      name: 'Cost',
      meta: {
        title: '成本数据'
        // roles: ['admin']
      }
    }
  ]
}

export default dataMaintainRouter
