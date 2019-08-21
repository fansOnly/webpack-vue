import { SET_CONDITION, UPDATE_CONDITION, RESET_CONDITION } from '../mutations'

const state = {
    // conditions: new Map()
    filter: {},
    page: 1,
    pageSize: 10,
    total: 10,
    sort: {}
}

const getters = {}

const actions = {
    setCondition ({ commit }, payload) {
        commit('SET_CONDITION', payload);
    },
    // setPage ({ commit }, payload) {
    //     commit('SET_CONDITION', payload);
    // },
    // setPagheSize ({ commit }, payload) {
    //     commit('SET_CONDITION', payload);
    // },
    // setTotal ({ commit }, payload) {
    //     commit('SET_CONDITION', payload);
    // },
    // setSort ({ commit }, payload) {
    //     commit('SET_CONDITION', payload);
    // },
}

const mutations = {
    [SET_CONDITION] (state, payload) {
        state.filter = payload;
    },
    [UPDATE_CONDITION] (state, payload) {
        state.filter = payload;
    },
    [RESET_CONDITION] (state, payload) {
        state.filter = payload;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}