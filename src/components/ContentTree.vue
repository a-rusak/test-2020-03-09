<template>
  <li>
    <article v-observe="observer" :data-id="item.id">
      <h1>{{ item.name }}</h1>
      <slot></slot>
    </article>
    <ul>
      <ContentTree v-for="child of item.children" :key="child.id" :item="child">
        <SectionView :content="content[child.id]" :id="child.id" />
      </ContentTree>
    </ul>
  </li>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SectionView from "./SectionView";
import vObserve from "../directives/v-observe";

export default {
  name: "ContentTree",
  components: {
    SectionView
  },
  directives: {
    observe: vObserve
  },
  data() {
    return {
      observer: undefined
    };
  },
  props: {
    item: Object
  },
  computed: {
    ...mapState(["content", "inView"])
  },
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersection);
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    ...mapMutations(["setInView"]),
    handleIntersection(entries) {
      const inView = this.cleanupInView();

      for (const entry of entries) {
        const id = entry.target.dataset.id;
        if (entry.isIntersecting) {
          inView[id] = entry.isIntersecting;
        } else if (inView[id]) {
          inView[id] = false;
        }
      }

      this.setInView(inView);
    },

    cleanupInView() {
      let inView = {};
      Object.entries(this.inView).forEach(([id, isInView]) => {
        if (isInView) inView[id] = true;
      });
      return inView;
    }
  }
};
</script>
