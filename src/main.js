import { createApp } from "vue";
import router from "./router";
import store from "./store";
import "./style.css";
import ElementPlus from "element-plus";
import zhLocale from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import * as icons from "@element-plus/icons-vue";
// import "./api/mock";
import App from "./App.vue";
import "mapbox-gl/dist/mapbox-gl.css";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhLocale,
});

// 安装图标库
for (var icon in icons) {
  app.component(icon, icons[icon]);
}
app.use(router);

app.use(store).mount("#app");
