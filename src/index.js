import Vue from 'vue';

import router from './router';

import App from './App.vue';

import store from './store'

import './app.css'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

if (module.hot) {
    module.hot.accept();
}