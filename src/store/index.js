import Vue from "vue";
import Vuex from "vuex";
import { loadToc } from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toc: null
  },
  mutations: {
    setToc(state, toc) {
      state.toc = toc;
    }
  },
  actions: {
    async loadToc({ commit }) {
      const response = await loadToc();
      commit("setToc", response.data);
    }
  },
  modules: {}
});
