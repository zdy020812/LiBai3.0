import { createRouter, createWebHistory } from "vue-router";

// 配置路径
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  // {
  //   path: "/search",
  //   name: "搜索",
  //   component: () => import("../views/SearchView.vue"),
  // },
  {
    path: "/locus",
    name: "行迹动画",
    component: () => import("../views/LocusView.vue"),
  },
  {
    path: "/star-diagram",
    name: "人物星图",
    component: () => import("../views/StarDiagramView.vue"),
  },
];

// 配置路由
const router = createRouter({
  history: createWebHistory(),
  routes, // 调用配置路径
});

// 路由守卫
// function guard(router) {
//   // 跳转之前
//   router.beforeEach(async (to, from, next) => {
//     next();
//   });
//   // 跳转之后
//   // router.afterEach((to) => {
//   //   console.log(to)
//   // })
// }

// 挂载路由
// export function installRouter(app) {
//   app.use(router);
//   //   guard(router);
//   return router;
// }

export default router;
