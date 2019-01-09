<template>
  <div
    id="app"
    v-loading="globalLoading"
    :element-loading-text="loadingMessage"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapGetters(["globalLoading", "loadingMessage"])
  }
};
</script>

