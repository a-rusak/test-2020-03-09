<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
  >
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 24
    },
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    iconPath() {
      let icon = require(`../assets/icons/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, "default")) {
        icon = icon.default;
      }
      return icon.url;
    },
    className() {
      return "svg-icon svg-icon--" + this.name;
    }
  }
};
</script>

<style>
.svg-icon {
  fill: currentColor;
}
</style>
