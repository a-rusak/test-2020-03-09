<template>
  <div v-html="content" />
</template>

<script>
export default {
  name: "SectionView",
  props: {
    content: String
  }
};
</script>

<style></style>
