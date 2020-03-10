<template>
  <div>
    <ul>
      <TreeItem
        class="item"
        v-for="node of treeData"
        :key="node.id"
        :item="node"
        @select-item="selectItem"
      />
    </ul>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import TreeItem from "./components/TreeItem";
import { mapActions, mapState } from "vuex";
import { createTreeFromList } from "./adapters/treeFromList";

export default {
  name: "App",
  components: {
    HelloWorld,
    TreeItem
  },
  async mounted() {
    await this.loadToc();
    // const tree = createTreeFromList(this.toc);
    // console.log(tree);
  },
  computed: {
    ...mapState(["toc"]),
    treeData() {
      if (Array.isArray(this.toc)) {
        return createTreeFromList(this.toc);
      }
      return null;
    }
  },
  methods: {
    ...mapActions(["loadToc"]),
    selectItem(id) {
      console.log("select", id);
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: sans-serif;
}
</style>
