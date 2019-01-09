// import { getUserInfo_api } from '_api/user'
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),      // token
    roles: [],              // 权限
    userInput: {},          // 登录表单
  },
  mutations: {
    // 设置token
    SET_TOKEN(state, dataStr) {
      state.token = dataStr
    },
    // 设置路由
    SET_ROLES(state, dataArr) {
      state.roles = dataArr
    },
    // 登录表单
    SET_USER_INPUT(state, dataObj) {
      state.userInput = dataObj
    }
  },
  actions: {
    // 登录保存touken
    loginAct({ commit }, token) {
      return new Promise(async resolve => {
        localStorage.setItem('token', token);
        commit('SET_TOKEN', token);
        resolve();
      })
    },
    // 退出登录
    logoutAct({ commit, dispatch }) {
      return new Promise(resolve => {
        localStorage.removeItem('token');
        commit('SET_TOKEN', '');
        // 调用其他的模块
        dispatch('delAllAct', [], { root: true });
        resolve()
      })
    }
  }

}