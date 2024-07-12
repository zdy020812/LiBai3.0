import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import LocusView from '../views/LocusView.vue'
import StarDiagramView from '../views/StarDiagramView.vue'

// 配置路径
const routes = [{
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/search',
        name: '搜索',
        component: SearchView
    },
    {
        path: '/locus',
        name: '轨迹',
        component: LocusView
    },
    {
        path: '/star-diagram',
        name: '人物星图',
        component: StarDiagramView
    }
]

// 配置路由
const router = createRouter({
    history: createWebHashHistory(), // 哈希模式
    routes // 调用配置路径
})

// 路由守卫
function guard(router) {
    // 跳转之前
    router.beforeEach(async(to, from, next) => {
            next()
        })
        // 跳转之后
        // router.afterEach((to) => {
        //   console.log(to)
        // })
}

// 挂载路由
export function installRouter(app) {
    app.use(router)
    guard(router)
    return router
}


export default router