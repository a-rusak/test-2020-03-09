<template>
  <section
    class="section-view"
    :class="{
      'section-view--error': failedIds.includes(id),
      'section-view--edit': isEditing
    }"
  >
    <EditorMenuBarToolbar :editor="editor" />
    <EditorMenuBubbleToolbar :editor="editor" />
    <EditorContent :editor="editor" class="editor-content" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { Editor, EditorContent } from "tiptap";
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
import EditorMenuBarToolbar from "./EditorMenuBarToolbar";
import EditorMenuBubbleToolbar from "./EditorMenuBubbleToolbar";

export default {
  name: "ContentTreeSection",
  components: {
    EditorContent,
    EditorMenuBarToolbar,
    EditorMenuBubbleToolbar
  },
  props: {
    content: String,
    id: String
  },
  data() {
    return {
      isEditing: false,
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
      }, 100);
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
</style>
