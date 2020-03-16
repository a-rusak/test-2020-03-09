<template>
  <div class="layout" :class="{ 'show-nav': showNav }">
    <aside class="layout__aside">
      <button
        class="layout__toggler"
        :class="{ 'show-nav': showNav }"
        @click.prevent="showNav = !showNav"
      >
        <SvgIcon name="arrow_forward" />
      </button>
      <ul class="nav">
        <TocTree
          v-for="node of treeData"
          :key="node.id"
          :item="node"
          :selected-id="selectedId"
          @select-item="selectItem"
        />
      </ul>
    </aside>
    <main class="layout__main">
      <ContentTree v-for="node of treeData" :key="node.id" :item="node">
        <ContentTreeSection :content="content[node.id]" :id="node.id" />
      </ContentTree>
    </main>
  </div>
</template>

<script>
import ContentTree from "./components/ContentTree";
import TocTree from "./components/TocTree";
import ContentTreeSection from "./components/ContentTreeSection";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { createTreeFromList } from "./adapters/treeFromList";
import VueScrollTo from "vue-scrollto";
import SvgIcon from "./components/SvgIcon";

export default {
  name: "App",
  components: {
    ContentTree,
    TocTree,
    ContentTreeSection,
    SvgIcon
  },
  data() {
    return {
      showNav: true
    };
  },
  mounted() {
    this.loadToc();
  },
  computed: {
    ...mapState(["toc", "content", "selectedId"]),
    ...mapGetters(["inViewIds"]),

    treeData() {
      if (Array.isArray(this.toc)) {
        return createTreeFromList(this.toc);
      }
      return null;
    }
  },
  watch: {
    async inViewIds() {
      await this.loadSections();
      this.updateSelectedId();
    }
  },
  methods: {
    ...mapMutations(["setClickedId"]),
    ...mapActions(["loadToc", "loadSections", "updateSelectedId"]),

    selectItem({ id }) {
      const sectionEl = document.querySelector(`[data-id="${id}"]`);

      VueScrollTo.scrollTo(sectionEl, 300, {
        onDone: () => {
          this.updateSelectedId(id);
        }
      });
    }
  }
};
</script>

<style lang="scss">
$show-nav: ".layout.show-nav &";

.layout {
  display: grid;
  grid-template-columns: 2em auto;

  &.show-nav {
    grid-template-columns: 300px auto;
    grid-gap: 1em;
  }

  &__aside {
    #{$show-nav} {
      padding: 1em;
      border-right: 1px solid #ddd;
    }
  }
  &__main {
    padding: 1em;
  }
  &__toggler {
    position: fixed;
    top: 0;
    left: 0;
    border: none;
    width: 2em;
    height: 2em;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .svg-icon {
      transition: transform 0.2s;
    }

    #{$show-nav} {
      .svg-icon {
        transform: rotate(180deg);
      }
    }
  }
}

.nav {
  position: sticky;
  top: 4em;
  list-style: none;
  margin: 0;
  padding-left: 0;
  display: none;

  #{$show-nav} {
    display: block;
  }
}
</style>
