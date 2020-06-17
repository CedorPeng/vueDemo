export default {
  state: {
    params: null
  },
  getters: {
    getParams: state => {
      return state.params
    }
  },
  actions: {
    clickParams({state, commit}, data) {
      console.log(data);
      commit('setParams', data)
    }
  },
  mutations: {
    setParams(state, data) {
      state.params = data
    }
  }
}
