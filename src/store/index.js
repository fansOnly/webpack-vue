/*eslint-env node*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import localeStore from './modules/locale'
import settingStore from './modules/setting'
import breadcrumbStore from './modules/breadcrumb'
import page from './modules/page'

import createLogger from '@/utils/storeLogger'

const devMode = process.env.NODE_ENV !== 'production'

const modules = {
    localeStore,
    settingStore,
    breadcrumbStore,
    page,
}

const store = new Vuex.Store({
    modules,
    // strict: devMode,
    plugins: devMode ? [createLogger()] : []
});

export default store;