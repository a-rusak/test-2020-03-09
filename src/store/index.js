import Vue from "vue";
import Vuex from "vuex";
import { loadToc, loadSection } from "../services/api";

Vue.use(Vuex);

const LoadingStatus = {
  NOT_ASKED: "notAsked",
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed"
};

export default new Vuex.Store({
  state: {
    toc: null,
    inView: {},
    loadingStatuses: {},
    content: {},
    selectedId: ""
  },
  getters: {
    inViewIds({ inView }) {
      return Object.entries(inView)
        .filter(([, isInView]) => isInView)
        .map(([id]) => id);
    },
    failedIds({ loadingStatuses }) {
      return Object.entries(loadingStatuses)
        .filter(([, status]) => status === LoadingStatus.FAILED)
        .map(([id]) => id);
    }
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
    },
    setInView(state, inView) {
      state.inView = inView;
    },
    setLoadingStatus(state, { id, status }) {
      state.loadingStatuses = {
        ...state.loadingStatuses,
        [id]: status
      };
    },
    setSelectedId(state, id) {
      state.selectedId = id;
    }
  },
  actions: {
    updateSelectedId({ commit, getters: { inViewIds } }, id) {
      if (inViewIds.length > 0) {
        if (id && inViewIds.includes(id)) {
          commit("setSelectedId", id);
        } else {
          commit("setSelectedId", inViewIds[0]);
        }
      }
    },
    async loadToc({ commit }) {
      const { data } = await loadToc();
      commit("setToc", data);
    },
    loadSections({ commit, dispatch, getters }) {
      const loaders = getters.inViewIds.map(id =>
        dispatch("getSelectionById", id)
      );
      Promise.allSettled(loaders).then(results => {
        for (const { value } of results) {
          if (value) {
            const { id, data } = value;
            commit("setContent", { [id]: data });
          }
        }
      });
    },
    async getSelectionById({ state, commit }, id) {
      const loadingStatus = state.loadingStatuses[id];
      let data = state.content[id];

      if (data && loadingStatus === LoadingStatus.LOADED) {
        return { id, data };
      } else {
        try {
          if (
            loadingStatus === LoadingStatus.LOADING ||
            loadingStatus === LoadingStatus.FAILED
          )
            return;

          commit("setLoadingStatus", { id, status: LoadingStatus.LOADING });
          const res = await loadSection(id);
          commit("setLoadingStatus", { id, status: LoadingStatus.LOADED });
          data = res.data;
          return { id, data };
        } catch (err) {
          commit("setLoadingStatus", { id, status: LoadingStatus.FAILED });
          return { id, data: err.message };
        }
      }
    }
  }
});
