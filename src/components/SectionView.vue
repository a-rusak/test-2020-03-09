<template>
  <section
    class="section-view"
    :class="{ 'section-view--error': failedIds.includes(id) }"
  >
    <EditorMenuBar
      :editor="editor"
      v-slot="{ commands, isActive }"
      :class="{ 'is-hidden': !isEditing }"
    >
      <div class="menu-bar">
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
            <SvgIcon name="bold" />
          </button>
          <!--           
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <Icon name="italic" /><i>I</i>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <Icon name="strike" /><s>S</s>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <Icon name="underline" /><u>U</u>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <Icon name="paragraph" />P
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <Icon name="ul" />*
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <Icon name="ol" />1.
          </button>

          <button
            class="menubar__button"
            @click="
              commands.createTable({
                rowsCount: 3,
                colsCount: 3,
                withHeaderRow: false
              })
            "
          >
            <Icon name="table" />Table
          </button>

          <span v-if="isActive.table()">
            <button class="menubar__button" @click="commands.deleteTable">
              <Icon name="delete_table" />Delete
            </button>
            <button class="menubar__button" @click="commands.addColumnBefore">
              <Icon name="add_col_before" />A
            </button>
            <button class="menubar__button" @click="commands.addColumnAfter">
              <Icon name="add_col_after" />B
            </button>
            <button class="menubar__button" @click="commands.deleteColumn">
              <Icon name="delete_col" />C
            </button>
            <button class="menubar__button" @click="commands.addRowBefore">
              <Icon name="add_row_before" />D
            </button>
            <button class="menubar__button" @click="commands.addRowAfter">
              <Icon name="add_row_after" />E
            </button>
            <button class="menubar__button" @click="commands.deleteRow">
              <Icon name="delete_row" />F
            </button>
            <button class="menubar__button" @click="commands.toggleCellMerge">
              <Icon name="combine_cells" />G
            </button>
          </span>
 -->
        </div>
      </div>
    </EditorMenuBar>
    <EditorContent :editor="editor" class="editor-content" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
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
    SvgIcon
  },
  props: {
    content: String,
    id: String
  },
  data() {
    return {
      isEditing: true,
      editorContent: this.content
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
      }, 2000);
    }
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
.menu-bar {
  &__toolbar {
    will-change: transform;
    transition: transform 0.2s, opacity 0.4s;

    .menu-bar.is-hidden & {
      transform: translateY(100%);
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
