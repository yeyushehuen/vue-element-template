<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
$nav-height: 41px;
.app-main {
  width: 100%;
  position: relative;
  overflow: auto;
  padding: 12px;
  &.base-table-scope{
    scrollbar-width: none;
    &::-webkit-scrollbar-track-piece {
      background: #f0f0f0;
    }

    &::-webkit-scrollbar {
      width: 0;
    }

    &::-webkit-scrollbar-thumb {
      background: #cfd1d4;
    }
  }
}

.fixed-header+.app-main {
  // padding-top: 50px;
  padding-top: $nav-height;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
    // min-height: calc(100% - #{$nav-height});
  }

  .fixed-header+.app-main {
    // padding-top: 84px;
    padding-top: $nav-height;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
