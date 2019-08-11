/*eslint-env node*/
import Vue from 'vue';
import Vuex from 'vuex';

import locale from './modules/locale';
import setting from './modules/setting';
import breadcrumb from './modules/breadcrumb';

import createLogger from '@/utils/logger'

Vue.use(Vuex);

const devMode = process.env.NODE_ENV !== 'production';

const modules = {
    locale,
    setting,
    breadcrumb,
}

const store = new Vuex.Store({
    modules,
    // strict: devMode,
    plugins: devMode ? [createLogger()] : []
});

export default store;