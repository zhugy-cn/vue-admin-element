<template>
  <el-menu
    router
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    :collapse="sideStatus"
    :default-active="$route.path"
  >
    <side-item :routes="$router.options.routes" />
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
import SideItem from "./SideItem";

export default {
  name: "sidebar",
  components: {
    SideItem
  },
  computed: {
    ...mapGetters(["sideStatus"])
  }
};
</script>
