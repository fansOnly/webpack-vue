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
        commit('resetRoutes', route);
    },
    addRoutes ({ commit }, route) {
        commit('addRoutes', route)
    },
    updateRoutes ({ commit }, payload) {
        commit('updateRoutes', payload)
    },
}

const mutations = {
    resetRoutes (state, route) {
        state.routes = [].concat(state.routes.shift());
        state.routes.push(route);
    },
    addRoutes (state, route) {
        state.routes.push(route);
    },
    updateRoutes (state, {index, route}) {
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