<template>
  <el-form :inline="true" :model="formData" size="small">
    <el-form-item label="类型">
      <el-select
        style="width: 160px"
        :disabled="typeDisabled"
        @change="changeType"
        v-model="formData.type"
        placeholder="选择代理类型"
      >
        <el-option
          v-for="item in agentTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="手机号">
      <el-select
        style="width: 400px"
        :disabled="!formData.type"
        v-model="formData.targetMobil"
        filterable
        placeholder="选择代理手机号"
      >
        <el-option
          v-for="item in salesmanList"
          :key="item.id"
          :label="item.userName + ' - ' +(item.nickName || '***') +' - '+item.fullAddress"
          :value="item.userName"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from "vuex";
import {
  provinceGetSalesmanList_api,
  cityGetSalesmanList_api,
  districtGetSalesmanList_api
} from "_api/salesman";
import mixin from "./mixin";

export default {
  name: "step1",
  mixins: [mixin],
  data() {
    return {
      getSalesListApi: "",
      formData: {},
      salesmanList: [],
      typeDisabled: false
    };
  },
  computed: {
    ...mapGetters(["agentTypeList", "userInfo"])
  },
  watch: {
    "formData.targetMobil": {
      handler(newUserName) {
        if (newUserName) {
          this.$emit("update:isNextStep", true);
        } else {
          this.$emit("update:isNextStep", false);
        }
      },
      immediate: true
    }
  },
  created() {
    // 根据角色获取业务员列表的api
    switch (this.userInfo.type) {
      case 4:
        this.getSalesListApi = provinceGetSalesmanList_api;
        break;
      case 3:
        this.getSalesListApi = cityGetSalesmanList_api;
        break;
      case 2:
        this.getSalesListApi = districtGetSalesmanList_api;
        this.formData = {
          ...this.formData,
          type: 1
        };
        this.typeDisabled = true;
        this.changeType(1);
        break;
    }
  },
  methods: {
    // 改变类型时获取
    async changeType(type) {
      this.loading = true;
      this.formData = {
        ...this.formData,
        targetMobil: ""
      };
      let params = {
        type,
        pageNum: 1,
        pageSize: 100
      };
      let res = await this.getSalesListApi(params);
      if (res) {
        let salesmanList = res.list;
        salesmanList.forEach(item => {
          let { proName, cityName, countryName, townName } = item;
          proName = proName ? proName : "";
          cityName = cityName ? " / " + cityName : "";
          countryName = countryName ? " / " + countryName : "";
          townName = townName ? " / " + townName : "";
          item.fullAddress = proName + cityName + countryName + townName;
        });
        this.salesmanList = salesmanList;
      }
      this.loading = false;
    },
    handleSubmit() {
      const { targetMobil } = this.formData;
      this.$emit("submit", { targetMobil });
    }
  },
  activated() {
    if (this.formData.targetMobil) {
      this.$emit("update:isNextStep", true);
    } else {
      this.$emit("update:isNextStep", false);
    }
  }
};
</script>
<style lang='scss' scoped>
.el-form {
  margin-top: 120px;
  text-align: center;
}
</style>