<template>
  <EditorMenuBar :editor="editor" v-slot="{ commands, isActive, focused }">
    <div class="menu-bar is-hidden" :class="{ 'is-focused': focused }">
      <div class="menu-bar__toolbar">
        <button class="menu-bar__button" @click="commands.undo">
          <SvgIcon name="undo" />
        </button>

        <button class="menu-bar__button" @click="commands.redo">
          <SvgIcon name="redo" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <SvgIcon name="format_bold" />
        </button>
        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <SvgIcon name="format_italic" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <SvgIcon name="strikethrough_s" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <SvgIcon name="format_underlined" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <SvgIcon name="format-pilcrow" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <SvgIcon name="format-header-1" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <SvgIcon name="format-header-2" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <SvgIcon name="format-header-3" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <SvgIcon name="format_list_bulleted" />
        </button>

        <button
          class="menu-bar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <SvgIcon name="format_list_numbered" />
        </button>

        <button
          class="menu-bar__button"
          @click="showImagePrompt(commands.image)"
        >
          <SvgIcon name="image" />
        </button>

        <button
          class="menu-bar__button"
          @click="
            commands.createTable({
              rowsCount: 3,
              colsCount: 3,
              withHeaderRow: false
            })
          "
        >
          <SvgIcon name="table" />
        </button>

        <span v-if="isActive.table()" class="menu-bar__section">
          <button class="menu-bar__button" @click="commands.deleteTable">
            <SvgIcon name="table-remove" />
          </button>
          <button class="menu-bar__button" @click="commands.addColumnBefore">
            <SvgIcon name="table-column-plus-before" />
          </button>
          <button class="menu-bar__button" @click="commands.addColumnAfter">
            <SvgIcon name="table-column-plus-after" />
          </button>
          <button class="menu-bar__button" @click="commands.deleteColumn">
            <SvgIcon name="table-column-remove" />
          </button>
          <button class="menu-bar__button" @click="commands.addRowBefore">
            <SvgIcon name="table-row-plus-before" />
          </button>
          <button class="menu-bar__button" @click="commands.addRowAfter">
            <SvgIcon name="table-row-plus-after" />
          </button>
          <button class="menu-bar__button" @click="commands.deleteRow">
            <SvgIcon name="table-row-remove" />
          </button>
          <button class="menu-bar__button" @click="commands.toggleCellMerge">
            <SvgIcon name="table-merge-cells" />
          </button>
        </span>
      </div>
    </div>
  </EditorMenuBar>
</template>

<script>
import { EditorMenuBar } from "tiptap";
import SvgIcon from "./SvgIcon";
export default {
  components: {
    EditorMenuBar,
    SvgIcon
  },
  props: {
    editor: Object
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    }
  }
};
</script>

<style lang="scss">
.menu-bar {
  margin: 1em;
  margin-bottom: 0;

  &__toolbar {
    display: flex;
    flex-wrap: wrap;

    will-change: transform;
    transition: transform 0.2s, opacity 0.4s;

    .menu-bar.is-hidden:not(.is-focused) & {
      opacity: 0;
    }
  }
  &__section {
    display: flex;
    flex-wrap: wrap;
  }
  &__button {
    padding: 4px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
    border-radius: 4px;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
    &.is-active {
      background-color: #ccc;
    }
  }
}
</style>
