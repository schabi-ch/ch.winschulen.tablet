import { LocalStorage } from 'quasar'

const state = {
  userMode: null
};

const mutations = {
  setUserMode(state, user) {
    state.userMode = user;
    LocalStorage.set("userMode", user)
  }
};

const actions = {
  setUserMode({ commit }, payload) { 
    commit("setUserMode", payload);
  }
};

const getters = {
  userMode: state => {
    return state.userMode;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};