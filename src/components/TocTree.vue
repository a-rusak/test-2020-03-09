<template>
  <li class="toc__item">
    <a
      class="toc__link"
      :class="{ 'is-selected': item.id === selectedId }"
      @click.prevent="select(item)"
    >
      {{ item.name }}
    </a>
    <ul class="toc__list" v-if="isFolder">
      <TocTree
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
      this.$emit("select-item", item);
    }
  }
};
</script>

<style lang="scss">
.toc {
  &__list {
    list-style: none;
  }
  &__item {
  }

  &__link {
    cursor: pointer;
    display: block;
    padding: 0.5em 1em;
    border-radius: 1em;

    &.is-selected {
      background-color: lightblue;
    }
  }
}
</style>
