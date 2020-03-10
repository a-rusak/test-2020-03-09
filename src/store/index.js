import Vue from "vue";
import Vuex from "vuex";
import { loadToc, loadSection } from "../services/api";

Vue.use(Vuex);

// const content = new Map();

export default new Vuex.Store({
  state: {
    toc: null,
    sectionsInView: ["1", "2", "3", "4"],
    content: {}
  },
  mutations: {
    setToc(state, toc) {
      state.toc = toc;
    },
    setContent(state, section) {
      state.content = {
        ...state.content,
        ...section
      };
    }
  },
  actions: {
    async loadToc({ commit }) {
      const { data } = await loadToc();
      commit("setToc", data);
    },
    loadSections({ commit, dispatch, state }) {
      const loaders = state.sectionsInView.map(id =>
        dispatch("getSelectionById", id)
      );
      Promise.allSettled(loaders).then(results => {
        for (const { value, reason } of results) {
          if (value) {
            const { id, data } = value;
            commit("setContent", { [id]: data });
          }
          if (reason) {
            console.log(reason);
          }
        }
      });
    },
    async getSelectionById({ state }, id) {
      let data = state.content[id];

      if (data) {
        return { id, data };
      } else {
        try {
          const res = await loadSection(id);
          data = res.data;
          return { id, data };
        } catch (err) {
          return { id, data: err.message };
        }
      }
    }
  }
});
