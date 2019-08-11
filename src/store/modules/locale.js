import zh_CN from '../../../node_modules/ant-design-vue/lib/locale-provider/zh_CN';
import zh_TW from '../../../node_modules/ant-design-vue/lib/locale-provider/zh_TW';
import en_US from '../../../node_modules/ant-design-vue/lib/locale-provider/default';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';
import 'moment/locale/en-gb';

const state = {
    locale: 'zh_CN',
    LAN: zh_CN
}

const getters = {}

const actions = {
    setLocale ({ commit }, locale) {
        commit('setLocale', locale)
    }
}

const mutations = {
    setLocale (state, locale) {
        state.locale = locale;
        locale === 'zh_CN' && (state.LAN = zh_CN, moment.locale('zh-cn'));
        locale === 'zh_TW' && (state.LAN = zh_TW, moment.locale('zh-tw'));
        locale === 'en_US' && (state.LAN = en_US, moment.locale('en-gb'));
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}