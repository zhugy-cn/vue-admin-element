<template>
  <div v-loading="loading" element-loading-text="拼命加载中..." class="com-bank-list">
    <el-input
      style="width: 80%"
      size="small"
      clearable
      placeholder="请输入支行名称"
      v-model.trim="formData.subBankName"
      @input="inputChange"
      class="input-with-select"
    >
      <el-select
        @change="selectChange"
        filterable
        v-model="formData.headBankNo"
        slot="prepend"
        placeholder="请选择开户行"
      >
        <el-option
          v-for="(item,index) in bankList"
          :key="index"
          :label="item.headBankName+' - '+item.headBankNo"
          :value="item.headBankNo"
        />
      </el-select>
      <el-button @click="selectChange" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <section class="zui-bank__list">
      <template v-if="subBankList.length">
        <div
          class="zui-bank__item"
          v-for="(item,index) in subBankList"
          :key="index"
          @click="submitBank(item)"
        >{{item.subBankName}}</div>
      </template>
      <empty v-else>未找到支行</empty>
    </section>
  </div>
</template>
<script>
import { getBankList_api, getSubBankList_api } from "_api/area";
import { debounce } from "@/libs/utils";
import Empty from "_com/empty/empty";

export default {
  components: {
    Empty
  },
  data() {
    return {
      formData: {
        headBankNo: "102"
      },
      bankList: [],
      subBankList: [],
      loading: false
    };
  },
  async created() {
    this.loading = true;
    this.bankList = await getBankList_api();
    this.loading = false;
  },
  methods: {
    submitBank(item) {
      this.$emit("submitBank", item);
    },
    inputChange: debounce(async function() {
      if (this.formData.subBankName) {
        this.loading = true;
        this.subBankList = (await getSubBankList_api(this.formData)) || [];
        this.loading = false;
      } else {
        this.subBankList = [];
      }
    }, 300),
    async selectChange() {
      if (this.formData.subBankName) {
        this.loading = true;
        this.subBankList = (await getSubBankList_api(this.formData)) || [];
        this.loading = false;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.com-bank-list {
  & /deep/ {
    .el-select .el-input {
      width: 200px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
  .zui-bank__list {
    position: relative;
    width: 80%;
    height: 500px;
    margin-top: 12px;
    overflow: auto;
    border: 1px solid $border-c;
    .zui-bank__item {
      text-align: left;
      cursor: pointer;
      padding: 12px;
      border-bottom: 1px solid $border-c;
      &:hover {
        background-color: $table-hover;
      }
    }
  }
}
</style>