import { createApp } from 'vue'
import { installPlugins } from './plugins'
import { installRouter } from './router'
import store from './store'
import './style.css'
import './api/mock'
import App from './App.vue'
const app = createApp(App);
installPlugins(app); // 安装elements
installRouter(app) // 安装路由

app.use(store).mount('#app');
