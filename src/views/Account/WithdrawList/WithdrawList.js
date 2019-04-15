import table from "@/mixins/table";
import { getWithdrawRecord_api } from "_api/account"
import { formatDate, formatMoney } from '@/filters/common'
import { withdrawStatus } from '@/filters/account'


export default {
  name: "withdrawList",
  mixins: [table],
  data() {
    return {
      multilevel: true,
      getListApi: getWithdrawRecord_api,
    };
  },
  filters: {
    formatDate,
    formatMoney,
    withdrawStatus
  },
  created() { }
};