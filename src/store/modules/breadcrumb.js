const state = {
    routes: [
        {
            path: '/',
            breadcrumbName: '首页'
        },
    ]
}

const getters = {}

const actions = {
    resetRoutes ({ commit }, route) {
        commit('resetRoutes', route);
    },
    setRoutes ({ commit }, route) {
        commit('setRoutes', route)
    },
}

const mutations = {
    resetRoutes (state, route) {
        state.routes = [{
            path: '/',
            breadcrumbName: '首页'
        },];
        state.routes.push(route);
    },
    setRoutes (state, route) {
        state.routes.push(route);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}