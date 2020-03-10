<template>
  <li>
    <div :class="{ bold: isFolder }" @click="select(item)">
      {{ item.name }}
    </div>
    <ul v-if="isFolder">
      <TreeItem
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @select-item="select"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "TreeItem",
  props: {
    item: Object
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    select(item) {
      this.$emit("select-item", item);
    }
  }
};
</script>
