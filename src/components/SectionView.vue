<template>
  <section
    class="section-view"
    :class="{
      'section-view--error': failedIds.includes(id),
      'section-view--edit': isEditing
    }"
  >
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
            :class="{ 'is-active': isActive.link() }"
            @click="commands.link"
          >
            <SvgIcon name="link" />
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
            <span>{{ isActive.link() ? "Update" : "Add" }}</span>
            <SvgIcon name="link" />
          </button>
        </template>
      </div>
    </EditorMenuBubble>
    <EditorContent :editor="editor" class="editor-content" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
import {
  Bold,
  Italic,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
import SvgIcon from "./SvgIcon";

export default {
  name: "SectionView",
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    SvgIcon
  },
  props: {
    content: String,
    id: String
  },
  data() {
    return {
      keepInBounds: true,
      isEditing: false,
      editorContent: this.content,
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    content(newContent, oldContent) {
      if (newContent !== oldContent) {
        this.editor.setContent(newContent);
      }
    }
  },
  computed: {
    ...mapGetters(["failedIds"]),

    editor() {
      return new Editor({
        extensions: [
          new Bold(),
          new Heading(),
          new Italic(),
          new Strike(),
          new Underline(),
          new ListItem(),
          new OrderedList(),
          new BulletList(),
          new Link(),
          new History(),
          new Table({
            resizable: true
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow()
        ],
        onFocus: options => this.onEditorFocus(options),
        onBlur: options => this.onEditorBlur(options)
      });
    }
  },
  methods: {
    onEditorFocus() {
      this.isEditing = true;
      clearTimeout(this.blurTimer);
    },
    onEditorBlur() {
      this.blurTimer = setTimeout(() => {
        this.isEditing = false;
      }, 100);
    },
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
    },
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
.section-view {
  border: 2px solid #eee;
  border-radius: 0.5em;
  position: relative;

  &--error {
    border-color: transparentize(red, 0.7);
    background-color: transparentize(red, 0.95);
    color: red;
  }

  &--edit {
    border-color: lightblue;
  }
}
.menu-bar {
  margin: 0.5em 1em;

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

.editor-content {
  .ProseMirror {
    outline: none;
    padding: 1em;

    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      th,
      td {
        min-width: 1em;
        border: 2px solid #ddd;
        padding: 3px 5px;
        vertical-align: top;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;

        p {
          margin: 0;
        }
      }
    }
  }
}
.menu-bubble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
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
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2em 0.5em;
    margin-right: 0.2rem;
    border-radius: 4px;
    background: transparent;
    border: 0;
    color: #fff;
    cursor: pointer;
  }
}
</style>
