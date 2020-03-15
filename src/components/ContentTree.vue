<template>
  <li>
    <article v-observe="observer" :data-id="item.id">
      <h1>{{ item.id }} - {{ item.name }}</h1>
      <p>
        <small>{{ item.description }}</small>
      </p>
      <slot></slot>
    </article>
    <ul>
      <ContentTree v-for="child of item.children" :key="child.id" :item="child">
        <ContentTreeSection :content="content[child.id]" :id="child.id" />
      </ContentTree>
    </ul>
  </li>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import ContentTreeSection from "./ContentTreeSection";
import vObserve from "../directives/v-observe";

export default {
  name: "ContentTree",
  components: {
    ContentTreeSection
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
    ...mapState(["content", "inView"]),
    ...mapGetters(["failedIds"])
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
