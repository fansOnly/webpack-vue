import Vue from 'vue'

import Antd from 'ant-design-vue'
import echarts from 'echarts'

import App from './App.vue'

import router from './router'
import store from './store'

import 'ant-design-vue/dist/antd.css'
import './assets/style/reset.css'
import './app.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.$echarts = echarts

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

if (module.hot) {
    module.hot.accept();
}