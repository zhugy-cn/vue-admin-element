
import step1 from './step1'
import step2 from './step2'
import step3 from './step3'
import { makeOverTicket_api } from '_api/ticket'

import { mapState, mapMutations } from 'vuex'

export default {
  name: "ticketSell",
  data() {
    return {
      active: 0,
      isNextStep: false,
      formData: {}
    };
  },
  components: {
    step1,
    step2,
    step3
  },
  computed: {
    ...mapState({
      includeCache: state => state.keepAlive.includeCache
    }),
    componentName() {
      switch (this.active) {
        case 0:
          return 'step1';
        case 1:
          return 'step2';
        case 2:
          return 'step3';
      }
    },
  },
  created() {

  },
  methods: {
    ...mapMutations(['clear_include_cache']),
    nextStep() {
      this.$refs.childComponent.handleSubmit()
      if (this.active != 2) {
        this.active++
      }
    },
    prevStep() {
      this.active--
    },
    async handleSubmit(data) {
      this.formData = {
        ...this.formData,
        ...data
      }
      if (this.active === 2) {
        this.clear_include_cache()
        this.$global.openLoading();
        await makeOverTicket_api(this.formData);
        this.$message({
          message: '资格券转让成功',
          type: 'success',
          showClose: true
        });
        setTimeout(() => {
          this.active = 0;
        }, 100);
        this.$global.closeLoading();
      }
    }
  }
};