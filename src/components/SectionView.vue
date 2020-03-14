<template>
  <div
    v-html="content"
    class="section-view"
    :class="{ 'section-view--error': failedIds.includes(id) }"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SectionView",
  props: {
    content: String,
    id: String
  },
  computed: {
    ...mapGetters(["failedIds"])
  }
};
</script>

<style lang="scss">
.section-view {
  padding: 1em;
  border: 2px solid #eee;
  border-radius: 0.5em;

  &--error {
    border-color: transparentize(red, 0.7);
    background-color: transparentize(red, 0.95);
    color: red;
  }
}
</style>
