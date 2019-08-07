const state = {
    //状态管理,获取城市的名称,如果本地没有数据,默认为"北京"
    nm: window.localStorage.getItem('nowNm') || '北京',
    //状态管理,获取城市的ID,如果本地没有数据,默认是北京的ID:1
    id: window.localStorage.getItem('nowId') || 1,
};

const actions = {};

const mutations = {
    CITY_INFO(state, payload) {
        state.nm = payload.nm;
        state.id = payload.id;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
