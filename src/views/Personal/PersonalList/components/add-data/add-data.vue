<template>
  <section>
    <el-form
      v-loading="formLoading"
      element-loading-text="拼命加载中..."
      class="zui-dialog__form"
      size="small"
      label-width="150px"
      ref="form"
      :model="formData"
      :rules="rules"
      @submit.native.prevent
    >
      <el-form-item label="类型" prop="type">
        <el-select
          :disabled="regionDisabled.type"
          v-model="formData.type"
          @change="changeType"
          placeholder="选择类型"
        >
          <el-option
            v-for="item in agentTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手续费" prop="rate">
        <el-input v-model="formData.rate" disabled placeholder="根据选择的类型生成"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="userName">
        <el-input maxlength="11" v-model="formData.userName" clearable placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="所属地址" prop="proCode" class="zui-region">
        <el-select disabled filterable v-model="formData.proCode" placeholder="选择省">
          <el-option
            v-for="item in provinceList"
            :key="item.areaCode"
            :label="item.areaName+' - '+item.areaCode"
            :value="item.areaCode"
          />
        </el-select>
        <el-select
          v-if="formData.type<=3 || userInfo.type <=3"
          :disabled="regionDisabled.city"
          v-model="formData.cityCode"
          @change="changeCity"
          placeholder="选择市"
        >
          <el-option
            v-for="item in cityList  || userInfo.type <=2"
            :key="item.areaCode"
            :label="item.areaName+' - '+item.areaCode"
            :value="item.areaCode"
          />
        </el-select>

        <el-select
          v-if="formData.type<=2  || userInfo.type <=2"
          :disabled="regionDisabled.district"
          v-model="formData.countryCode"
          @change="changeDistrict"
          placeholder="选择区/县"
        >
          <el-option
            v-for="item in districtList"
            :key="item.areaCode"
            :label="item.areaName+' - '+item.areaCode"
            :value="item.areaCode"
          />
        </el-select>

        <!-- <el-select v-if="formData.type<=2" v-model="formData.townCode" placeholder="选择镇">
          <el-option
            v-for="item in townList"
            :key="item.areaCode"
            :label="item.areaName+' - '+item.areaCode"
            :value="item.areaCode"
          />
        </el-select>-->
      </el-form-item>
      <el-form-item label="银行卡类型" prop="cardType">
        <el-select v-model="formData.cardType" clearable placeholder="选择银行卡类型">
          <el-option label="对公" :value="1"/>
          <el-option label="对私" :value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="开户行" prop="subBankName">
        <el-input v-model="formData.subBankName" disabled placeholder="请点击按钮查询开户行"></el-input>
        <el-button @click="innerDialog=true" style="margin-left: 4px" type="primary">查询开户行</el-button>
      </el-form-item>
      <el-form-item label="银行卡号" prop="bankCardNo">
        <el-input v-model="formData.bankCardNo" placeholder="输入银行卡号"></el-input>
      </el-form-item>
      <el-form-item label="持卡人姓名" prop="bankCardHolder">
        <el-input v-model="formData.bankCardHolder" placeholder="输入持卡人姓名"></el-input>
      </el-form-item>
      <el-form-item label="开户行所绑手机号" prop="bankMobile">
        <el-input v-model="formData.bankMobile" placeholder="输入开户行所绑定的手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" native-type="submit" type="primary">保存</el-button>
        <el-button @click="$emit('cancel')">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      custom-class="bank-list"
      align="center"
      title="选择开户行"
      :visible.sync="innerDialog"
      append-to-body
      width="800px"
    >
      <bank-list @submitBank="onSubmitBank"></bank-list>
    </el-dialog>
  </section>
</template>
<script src="./add-data.js"></script>
<style lang='scss'>
.bank-list /deep/ .el-dialog__body {
  overflow: auto;
}
</style>