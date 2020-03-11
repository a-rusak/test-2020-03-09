<template>
  <div
    v-html="content"
    class="section-content"
    :class="{ 'section-content--error': failedIds.includes(id) }"
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
.section-content {
  min-height: 12em;
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
