import { RESET_BREADCRUMB, ADD_BREADCRUMB, UPDATE_BREADCRUMB } from '../mutations'

const state = {
    routes: [
        {
            path: '/admin/index',
            breadcrumbName: '首页'
        },
    ]
}

const getters = {}

const actions = {
    resetRoutes ({ commit }, route) {
        commit('RESET_BREADCRUMB', route);
    },
    addRoutes ({ commit }, route) {
        commit('ADD_BREADCRUMB', route)
    },
    updateRoutes ({ commit }, payload) {
        commit('UPDATE_BREADCRUMB', payload)
    },
}

const mutations = {
    [RESET_BREADCRUMB] (state, route) {
        state.routes = [].concat(state.routes.shift());
        state.routes.push(route);
    },
    [ADD_BREADCRUMB] (state, route) {
        state.routes.push(route);
    },
    [ UPDATE_BREADCRUMB] (state, {index, route}) {
        state.routes[index] = route;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}