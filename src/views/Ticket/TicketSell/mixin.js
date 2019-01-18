import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["add_include_cache"]),
  },
  created() {
    this.add_include_cache(this.$options.name);
  },

}