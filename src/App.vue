<template>
  <div>
    <ul>
      <TocTree
        v-for="node of treeData"
        :key="node.id"
        :item="node"
        :selected-id="selectedId"
        class="item"
        @select-item="selectItem"
      />
    </ul>
    <hr />
    <ul>
      <ContentTree
        v-for="node of treeData"
        :key="node.id"
        :item="node"
        :selected-id="selectedId"
      >
        <SectionView :content="content[node.id]" />
      </ContentTree>
    </ul>
  </div>
</template>

<script>
import ContentTree from "./components/ContentTree";
import TocTree from "./components/TocTree";
import SectionView from "./components/SectionView";
import { mapActions, mapState } from "vuex";
import { createTreeFromList } from "./adapters/treeFromList";

export default {
  name: "App",
  components: {
    ContentTree,
    TocTree,
    SectionView
  },
  data() {
    return {
      selectedId: "2"
    };
  },
  async mounted() {
    await this.loadToc();
    await this.loadSections();
  },
  computed: {
    ...mapState(["toc", "content"]),
    treeData() {
      if (Array.isArray(this.toc)) {
        return createTreeFromList(this.toc);
      }
      return null;
    }
  },
  methods: {
    ...mapActions(["loadToc", "loadSections"]),
    selectItem(item) {
      console.log("select", item);
      this.selectedId = item.id;
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: sans-serif;
}
</style>
