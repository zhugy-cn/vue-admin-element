<template>
  <div class="page-assets zui-shadow" v-loading="loading" element-loading-text="拼命加载中...">
    <section class="zui-list-wrap">
      <div class="title">基本信息</div>
      <ul class="zui-list">
        <li>
          <span class="label">用户名：</span>
          <span class="value">{{accountInfo.user_name}}</span>
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
              :type="accountInfo.agentType | agentTypeColor"
            >{{accountInfo.agentType | agentType}}</el-tag>
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
          <span class="value active-money">
            <span>￥{{accountInfo.settBalance | smallMoney}}</span>
            <el-button @click="withdrawApply" size="mini" type="primary">提现</el-button>
          </span>
        </li>
      </ul>
    </section>
    <section class="table-wrap">
      <div class="title">我的资格券</div>
      <ticket-list></ticket-list>
    </section>
  </div>
</template>
<script src="./Assets.js"></script>
<style lang='scss' scoped src="./Assets.scss"></style>