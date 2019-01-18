import { withdrawApply_api, getAccountInfoAll_api } from "_api/account";
import { smallMoney } from "@/filters/common";
import { mapState } from 'vuex'
import { agentType, agentTypeColor } from '@/filters/salesman'
import TicketList from '_com/ticket-list/ticket-list.vue'

export default {
  name: "assets",
  filters: {
    smallMoney,
    agentType,
    agentTypeColor
  },
  components: {
    TicketList
  },
  data() {
    return {
      loading: true,
      accountInfo: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  async created() {
    this.loading = true;
    let fullAddress;
    let { accountVO, bankCardVO } = await getAccountInfoAll_api();
    let { user_name, proName, cityName, countryName, townName, rate, type } = this.userInfo;
    proName = proName ? proName : '';
    cityName = cityName ? ' / ' + cityName : '';
    countryName = countryName ? ' / ' + countryName : '';
    townName = townName ? ' / ' + townName : '';
    fullAddress = proName + cityName + countryName + townName;
    this.accountInfo = {
      rate: rate / 10,
      agentType: type,
      user_name,
      fullAddress,
      accountBalance: accountVO.accountBalance,
      settBalance: accountVO.settBalance,
      bankCardHolder: bankCardVO.bankCardHolder,
      bankCardNo: bankCardVO.bankCardNo,
      bankMobile: bankCardVO.bankMobile,
      bankName: bankCardVO.bankName,
    };
    this.loading = false;
  },
  methods: {
    // 点击提现
    async withdrawApply() {
      const { settBalance } = this.accountInfo;
      if (settBalance < 1000) {
        this.$message({
          type: "warning",
          message: "提现金额不能小于 10 元",
          showClose: true
        });
        return;
      }
      await this.$confirm(
        `提现手续费2元，预计到账 ${(settBalance - 200) / 100} 元`,
        "温馨提示",
        {
          type: "warning"
        }
      );
      this.$global.openLoading();
      await withdrawApply_api();
      this.$message({
        type: "success",
        message: "提现申请提交成功",
        showClose: true
      });
    }
  }
};