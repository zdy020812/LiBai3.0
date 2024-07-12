import ElementPlus from 'element-plus'
import zhLocale from "element-plus/es/locale/lang/zh-cn";
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue'

export function installPlugins(app) {
  // 安装element-ui
  app.use(ElementPlus, {
    locale: zhLocale,
  })

  // 安装图标库
  for (var icon in icons) {
    app.component(icon, icons[icon])
  }
}