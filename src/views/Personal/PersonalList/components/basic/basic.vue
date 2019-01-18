<template>
  <ul class="zui-list" v-loading="loading" element-loading-text="拼命加载中...">
    <li>
      <span class="label">姓名：</span>
      <span class="value">{{accountInfo.nickName || '暂无'}}</span>
    </li>
    <li>
      <span class="label">手机号：</span>
      <span class="value">{{accountInfo.userName}}</span>
    </li>
    <li>
      <span class="label">费率：</span>
      <span class="value">{{accountInfo.rate}}%</span>
    </li>
    <li>
      <span class="label">代理类型：</span>
      <span class="value">
        <el-tag
          size="small"
          :type="accountInfo.type | agentTypeColor"
        >{{accountInfo.type | agentType}}</el-tag>
      </span>
    </li>
    <li>
      <span class="label">代理区域：</span>
      <span class="value">{{accountInfo.fullAddress}}</span>
    </li>
    <li>
      <span class="label">银行卡号：</span>
      <span class="value">{{accountInfo.bankCardNo}}</span>
    </li>
    <li>
      <span class="label">支行名称：</span>
      <span class="value">{{accountInfo.bankName}}</span>
    </li>
    <li>
      <span class="label">持卡人姓名：</span>
      <span class="value">{{accountInfo.bankCardHolder}}</span>
    </li>
    <li>
      <span class="label">银行卡所绑手机号：</span>
      <span class="value">{{accountInfo.bankMobile}}</span>
    </li>
    <li>
      <span class="label">账户余额：</span>
      <span class="value">￥{{accountInfo.accountBalance | smallMoney}}</span>
    </li>
    <li>
      <span class="label">可提现余额：</span>
      <span class="value">￥{{accountInfo.settBalance | smallMoney}}</span>
    </li>
  </ul>
</template>
<script>
import { smallMoney } from "@/filters/common";
import { agentType, agentTypeColor } from "@/filters/salesman";
import { getAccountInfoLower_api } from "_api/account";
import { mapState } from "vuex";

export default {
  name: "",
  filters: {
    smallMoney,
    agentType,
    agentTypeColor
  },
  data() {
    return {
      loading: true,
      accountInfo: {}
    };
  },
  computed: {
    ...mapState({
      activeId: state => state.active.activeId,
      rowData: state => state.active.rowData
    })
  },
  async created() {
    try {
      let { accountVO, bankCardVO, salemanVO } = await getAccountInfoLower_api(
        this.activeId
      );
      let { nickName, userName, fullAddress, type, rate } = this.rowData;
      this.accountInfo = {
        nickName,
        userName,
        fullAddress,
        type,
        rate: rate / 10,
        accountBalance: accountVO.accountBalance,
        settBalance: accountVO.settBalance,
        bankCardHolder: bankCardVO.bankCardHolder,
        bankCardNo: bankCardVO.bankCardNo,
        bankMobile: bankCardVO.bankMobile,
        bankName: bankCardVO.bankName
      };
    } catch (error) {}
    this.loading = false;
  }
};
</script>
<style lang='scss' scoped>
.zui-list {
  padding-left: 20px;
  overflow: auto;
}
li {
  display: flex;
  height: 42px;
  line-height: 42px;
  align-items: center;
  .label {
    width: 140px;
    text-align: right;
  }
  .value {
    flex: 1;
    width: 1px;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .active-money span {
    margin-right: 40px;
  }
}
</style>