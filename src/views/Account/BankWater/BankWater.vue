<template>
  <div class="page-bankWater">
    <section class="zui-header-container"></section>
    <section class="zui-main--container zui-shadow">
      <section class="zui-main__search">
        <el-form class="search-com" :inline="true" size="mini" @submit.native.prevent>
          <el-form-item label="交易类型">
            <el-select v-model="queryList.tradeTypeList" clearable placeholder="选择交易类型">
              <el-option label="充值" :value="[1]"/>
              <el-option label="消费" :value="[2]"/>
              <el-option label="入账" :value="[3]"/>
              <el-option label="出账" :value="[4]"/>
              <el-option label="提现" :value="[5]"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-tag size="small">入账：￥ {{totalCount.inAccount | smallMoney}}</el-tag>
          </el-form-item>
          <el-form-item>
            <el-tag size="small" type="danger">出账：￥ {{totalCount.outAccount | smallMoney}}</el-tag>
          </el-form-item>
        </el-form>
      </section>
      <el-table
        height="1"
        border
        v-loading="tableLoading"
        element-loading-text="拼命加载中..."
        :data="tableData"
      >
        <el-table-column label="交易描述">
          <template slot-scope="scope">{{scope.row.productName || '游戏订单'}}</template>
        </el-table-column>
        <el-table-column label="交易金额(元)">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              type="danger"
              v-if="scope.row.amount<0"
            >￥{{scope.row.amount | smallMoney}}</el-tag>
            <el-tag size="mini" v-else>￥{{scope.row.amount | smallMoney}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="交易类型">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.tradeType | tradeTypeColor"
            >{{scope.row.tradeType | tradeType}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.createDate | formatDate}}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryList.pageNum"
        :page-size="queryList.pageSize"
        :page-sizes="[20,40,60]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </section>
  </div>
</template>

<script>
import table from "@/mixins/table";
import { getBankWater_api } from "_api/account";
import { formatDate, smallMoney } from "@/filters/common";
import { tradeType, tradeTypeColor } from "@/filters/account";

export default {
  name: "bankWater",
  mixins: [table],
  filters: {
    formatDate,
    smallMoney,
    tradeType,
    tradeTypeColor
  },
  data() {
    return {
      multilevel: true,
      getListApi: getBankWater_api,
      totalCount: {}
    };
  },
  methods: {
    _afterGetList(res) {
      this.totalCount = {
        inAccount: res.inAccount,
        outAccount: res.outAccount
      };
    },
    handleSearch() {
      if (!this.queryList.statusList) {
        delete this.queryList.statusList;
      }
      this.queryList.pageNum = 1;
      this.getList();
    }
  }
};
</script>