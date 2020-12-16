import { LocalStorage } from 'quasar'

const state = {
  userMode: null,
  tasksDone: []
};

const mutations = {
  setUserMode(state, user) {
    state.userMode = user;
    LocalStorage.set("userMode", user)
  },
  setAllTasksDone(state, tasksDone) {
    state.tasksDone = tasksDone;
  },
  setTaskDone(state, payload) {
    if (payload.value) {
      // task done
      state.tasksDone.push(payload.id);
    } else {
      // task undone
      var index = state.tasksDone.indexOf(payload.id);
      state.tasksDone.splice(index, 1);
    }
    console.log("tasksDone", state.tasksDone);
    LocalStorage.set("tasksDone", state.tasksDone);
  }
};

const actions = {
  setUserMode({ commit }, payload) { 
    commit("setUserMode", payload);
  },
  setTaskDone({ commit }, payload) {
    commit("setTaskDone", payload);
  },
  getAllTasksDone({ commit }) {
    if (state.tasksDone.length == 0) {
      commit("setAllTasksDone", LocalStorage.getItem("tasksDone"));
    }
    return state.tasksDone;
  }
};

const getters = {
  userMode: state => {
    return state.userMode;
  },
  tasksDone: state => {
    return state.tasksDone;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};