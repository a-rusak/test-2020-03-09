<template>
  <EditorMenuBubble
    :editor="editor"
    @hide="hideLinkMenu"
    v-slot="{ commands, isActive, getMarkAttrs, menu }"
  >
    <div
      class="menu-bubble"
      :class="{ 'is-active': menu.isActive }"
      :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
    >
      <form
        class="menu-bubble__form"
        v-if="linkMenuIsActive"
        @submit.prevent="setLinkUrl(commands.link, linkUrl)"
      >
        <input
          class="menu-bubble__input"
          type="text"
          v-model="linkUrl"
          placeholder="https://"
          ref="linkInput"
          @keydown.esc="hideLinkMenu"
        />
        <button
          class="menu-bubble__button"
          @click="setLinkUrl(commands.link, null)"
          type="button"
        >
          <SvgIcon name="close" />
        </button>
      </form>

      <template v-else>
        <button
          class="menu-bubble__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <SvgIcon name="format_bold" />
        </button>

        <button
          class="menu-bubble__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <SvgIcon name="format_italic" />
        </button>
        <button
          class="menu-bubble__button"
          @click="showLinkMenu(getMarkAttrs('link'))"
          :class="{ 'is-active': isActive.link() }"
        >
          <span class="menu-bubble__button-title">{{
            isActive.link() ? "Update" : "Add "
          }}</span>
          <SvgIcon name="link" />
        </button>
      </template>
    </div>
  </EditorMenuBubble>
</template>

<script>
import { EditorMenuBubble } from "tiptap";
import SvgIcon from "./SvgIcon";

export default {
  name: "EditorMenuBubbleToolbar",
  components: {
    EditorMenuBubble,
    SvgIcon
  },
  props: {
    editor: Object
  },
  data() {
    return {
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    }
  }
};
</script>

<style lang="scss">
.menu-bubble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.2em;
  margin-bottom: 0.2em;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: #fff;
    margin-left: 0.5em;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2em 0.5em;
    border-radius: 4px;
    background: transparent;
    border: 0;
    color: #fff;
    cursor: pointer;
  }
  &__button-title {
    margin-right: 0.5em;
  }
}
</style>
