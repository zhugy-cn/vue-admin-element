<template>
  <div class="com-ticket zui-dialog-container">
    <section class="zui-main--container">
      <section class="zui-main__search">
        <el-form class="search-com" :inline="true" size="mini" @submit.native.prevent>
          <el-form-item label="状态">
            <el-select v-model="queryList.status" clearable placeholder="选择资格券状态">
              <el-option label="未消费" :value="1"/>
              <el-option label="消费中" :value="2"/>
              <el-option label="已消费" :value="3"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
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
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="返现金额(元)">
          <template slot-scope="scope">￥{{scope.row.returnMoney | formatMoney}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="scope.row.status | ticketStatusColor"
            >{{scope.row.status | ticketStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.createDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="viewDetails(scope.row)" size="mini" type="primary">转让记录</el-button>
          </template>
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
import { agentGetTicketByUserId_api } from "_api/ticket";
import { mapState } from "vuex";
import { formatDate, formatMoney } from "@/filters/common";
import { ticketStatus, ticketStatusColor } from "@/filters/ticket";

export default {
  name: "ticket",
  mixins: [table],
  data() {
    return {
      getListApi: agentGetTicketByUserId_api
    };
  },
  filters: {
    formatDate,
    formatMoney,
    ticketStatus,
    ticketStatusColor
  },
  computed: {
    ...mapState({
      activeId: state => state.active.activeId
    })
  },
  methods: {
    _beforeGetList() {
      this.queryList = {
        ...this.queryList,
        offlineUserId: this.activeId
      };
    },
    viewDetails(row) {}
  }
};
</script>