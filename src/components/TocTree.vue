<template>
  <li>
    <div :class="{ selected: item.id === selectedId }" @click="select(item)">
      {{ item.name }}
    </div>
    <ul v-if="isFolder">
      <TocTree
        class="item"
        v-for="child of item.children"
        :key="child.id"
        :item="child"
        :selected-id="selectedId"
        @select-item="select"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "TocTree",
  props: {
    item: Object,
    selectedId: String
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    select(item) {
      // console.log("select", item);
      this.$emit("select-item", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: lightblue;
}
</style>
