<template>
  <el-form :model="formData" size="small">
    <el-form-item>
      <el-input
        prefix-icon="el-icon-z-mobile"
        clearable
        :disabled="true"
        v-model="userInfo.user_name"
        placeholder="请输入代理手机号"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-col :span="18">
        <el-input
          prefix-icon="el-icon-z-safe"
          clearable
          maxlength="6"
          v-model.trim="formData.code"
          placeholder="请输入验证码"
          @keyup.enter.native="handleSubmit"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button
          @click="sendSMSCode"
          :disabled="verifyCode.disabled"
          style="float: right;width: 92px"
          type="primary"
        >{{verifyCode.content}}</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from "vuex";
import { getSmsCode_api } from "_api/user";

export default {
  name: "step3",
  data() {
    return {
      formData: {},
      verifyCode: {
        countDown: 120,
        content: "发送验证码",
        disabled: false
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    // 发送验证码
    async sendSMSCode() {
      this.$global.openLoading();
      await getSmsCode_api(this.userInfo.user_name);
      this.startTimer();
      this.$global.closeLoading();
      this.$message({
        type: "success",
        message: "验证码发送成功，请注意查收",
        showClose: true
      });
    },
    // 启动定时器
    startTimer() {
      let countDown = this.verifyCode.countDown;
      this.verifyCode.content = countDown + " s";
      this.verifyCode.disabled = true;
      this.timer = setInterval(() => {
        countDown--;
        if (!countDown) {
          clearInterval(this.timer);
          this.verifyCode.content = "验证码";
          this.verifyCode.disabled = false;
          return;
        }
        this.verifyCode.content = countDown + " s";
      }, 1000);
    },
    // 提交
    handleSubmit() {
      const { code } = this.formData;
      if (!code || code.length != 6) {
        this.$message({
          type: "warning",
          message: "验证码格式不正确",
          showClose: true
        });
        return;
      }
      let params = {
        code,
        mobile: this.userInfo.user_name
      };
      this.$emit("submit", params);
    }
  }
};
</script>
<style lang='scss' scoped>
.el-form {
  width: 410px;
  margin: 120px auto 0;
}
</style>