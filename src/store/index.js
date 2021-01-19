import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
function getStorage(key, defaults) {
  let data = localStorage.getItem(key);
  return data !== null ? data : defaults;
}

const store = new Vuex.Store({
  state:{
    language:'zh-CN',
    account:  JSON.parse(getStorage('account', '{}')), // 账户信息
  },
  mutations:{
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      localStorage.setItem('language', language);
    },
    // 账户信息
    SET_ACCOUNT: (state, account) => {
      state.account = account;
      localStorage.setItem('account', JSON.stringify(account));
    },
  },
  actions:{
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
    // 账户信息
    setAccount({ commit }, account) {
      commit('SET_ACCOUNT', account);
    },
  }
});


export default store;
