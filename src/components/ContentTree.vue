<template>
  <li>
    <article>
      <h1>
        {{ item.name }}
      </h1>
      <slot></slot>
    </article>
    <ul>
      <ContentTree
        v-for="child of item.children"
        :key="child.id"
        :item="child"
        :selected-id="selectedId"
      >
        <SectionView :content="content[child.id]" />
      </ContentTree>
    </ul>
  </li>
</template>

<script>
import { mapState } from "vuex";
import SectionView from "./SectionView";

export default {
  name: "ContentTree",
  components: {
    SectionView
  },
  props: {
    item: Object,
    selectedId: String
  },
  computed: {
    ...mapState(["content"])
  }
};
</script>
