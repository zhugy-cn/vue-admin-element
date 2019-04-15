<template>
  <div class="page-ticketSell zui-shadow">
    <el-steps :active="active" align-center>
      <el-step title="步骤1" description="选择转让的代理"></el-step>
      <el-step title="步骤2" description="选择转让的资格券"></el-step>
      <el-step title="步骤3" description="验证当前代理信息"></el-step>
    </el-steps>
    <section class="zui-ticket-main">
      <keep-alive :include="includeCache">
        <component
          ref="childComponent"
          :isNextStep.sync="isNextStep"
          :is="componentName"
          @submit="handleSubmit"
        ></component>
      </keep-alive>
    </section>
    <div class="zui-button-box">
      <el-button v-if="active>0" @click="prevStep" size="small" type="primary">上一步</el-button>
      <el-button
        :disabled="!isNextStep"
        @click="nextStep"
        size="small"
        type="primary"
      >{{active < 2 ? '下一步':'确认提交'}}</el-button>
      <!-- <el-button @click="nextStep" size="small" type="primary"></el-button> -->
    </div>
  </div>
</template>
<script src="./TicketSell.js"></script>
<style lang='scss' scoped src="./TicketSell.scss"></style>