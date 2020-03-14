<template>
  <div class="layout">
    <aside class="layout__aside">
      <ul class="nav">
        <TocTree
          v-for="node of treeData"
          :key="node.id"
          :item="node"
          :selected-id="selectedId"
          class="item"
          @select-item="selectItem"
        />
      </ul>
    </aside>
    <main class="layout__main">
      <ul>
        <ContentTree v-for="node of treeData" :key="node.id" :item="node">
          <SectionView :content="content[node.id]" :id="node.id" />
        </ContentTree>
      </ul>
    </main>
  </div>
</template>

<script>
import ContentTree from "./components/ContentTree";
import TocTree from "./components/TocTree";
import SectionView from "./components/SectionView";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { createTreeFromList } from "./adapters/treeFromList";
import VueScrollTo from "vue-scrollto";

export default {
  name: "App",
  components: {
    ContentTree,
    TocTree,
    SectionView
  },
  mounted() {
    this.loadToc();
  },
  computed: {
    ...mapState(["toc", "content", "selectedId"]),
    ...mapGetters(["inViewIds"]),

    treeData() {
      if (Array.isArray(this.toc)) {
        return createTreeFromList(this.toc);
      }
      return null;
    }
  },
  watch: {
    async inViewIds() {
      await this.loadSections();
      this.updateSelectedId();
    }
  },
  methods: {
    ...mapMutations(["setClickedId"]),
    ...mapActions(["loadToc", "loadSections", "updateSelectedId"]),

    selectItem({ id }) {
      const sectionEl = document.querySelector(`[data-id="${id}"]`);

      VueScrollTo.scrollTo(sectionEl, 300, {
        onDone: () => {
          this.updateSelectedId(id);
        }
      });
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: sans-serif;
  padding: 0;
  margin: 0;
}

.layout {
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-gap: 1em;

  &__aside {
    padding: 1em;
  }
  &__main {
    padding: 1em;
  }
}

.nav {
  position: sticky;
  top: 2em;
}
</style>
