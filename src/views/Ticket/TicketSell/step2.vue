<template>
  <section class="com-step2">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-tag size="small">选中 {{totalCount.number || 0}} 张资格券</el-tag>
      </el-form-item>
      <el-form-item>
        <el-tag size="small">返现金额总计：￥ {{totalCount.totalMoney | formatMoney}} 元</el-tag>
      </el-form-item>
    </el-form>
    <el-table
      border
      v-loading="tableLoading"
      element-loading-text="拼命加载中..."
      ref="multipleTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="返现金额(元)">
        <template slot-scope="scope">￥{{scope.row.returnMoney | formatMoney}}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.createDate | formatDate}}</template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
import { getTicketByUserId_api } from "_api/ticket";
import { formatMoney, formatDate } from "@/filters/common";
import mixin from "./mixin";

export default {
  name: "step2",
  mixins: [mixin],
  data() {
    return {
      tableLoading: false,
      ticketIdList: [],
      tableData: [],
      totalCount: {}
    };
  },
  filters: {
    formatMoney,
    formatDate
  },
  async created() {
    this.tableLoading = true;
    this.tableData = (await getTicketByUserId_api(1)) || [];
    this.tableLoading = false;
  },
  watch: {
    ticketIdList: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.$emit("update:isNextStep", true);
        } else {
          this.$emit("update:isNextStep", false);
        }
        this.getSelectTicket();
      },
      immediate: true
    }
  },
  methods: {
    handleSelectionChange(row) {
      this.ticketIdList = row;
    },
    handleRowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    handleSubmit() {
      let ticketIdList = [];
      this.ticketIdList.forEach(item => {
        ticketIdList.push(item.id);
      });
      this.$emit("submit", { ticketIdList });
    },
    getSelectTicket() {
      let totalMoney = 0;
      let number = 0;
      this.ticketIdList.forEach(item => {
        totalMoney += item.returnMoney;
        number++;
      });
      this.totalCount = {
        totalMoney,
        number
      };
    }
  },
  activated() {
    if (this.ticketIdList.length) {
      this.$emit("update:isNextStep", true);
    } else {
      this.$emit("update:isNextStep", false);
    }
  }
};
</script>
<style lang='scss' scoped>
.com-step2 {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form-item {
    margin-bottom: 12px;
  }
}
.el-table {
  flex: 1;
  & /deep/ {
    .el-table__body-wrapper {
      height: calc(100% - 48px);
      overflow-y: auto;
    }
    td {
      padding: 10px 0;
    }
    .el-table__row {
      cursor: pointer;
    }
  }
}
</style>