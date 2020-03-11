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
          <SectionView :content="content[node.id]" />
        </ContentTree>
      </ul>
    </main>
  </div>
</template>

<script>
import ContentTree from "./components/ContentTree";
import TocTree from "./components/TocTree";
import SectionView from "./components/SectionView";
import { mapActions, mapState, mapGetters } from "vuex";
import { createTreeFromList } from "./adapters/treeFromList";

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
    ...mapState(["toc", "content"]),
    ...mapGetters(["selectedId", "inViewIds"]),

    treeData() {
      if (Array.isArray(this.toc)) {
        return createTreeFromList(this.toc);
      }
      return null;
    }
  },
  watch: {
    inViewIds() {
      this.loadSections();
    }
  },
  methods: {
    ...mapActions(["loadToc", "loadSections"]),

    selectItem(item) {
      const sectionEl = document.querySelector(`[data-id="${item.id}"]`);
      sectionEl &&
        sectionEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
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
