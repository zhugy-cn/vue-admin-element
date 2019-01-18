<template>
  <el-table
    height="500px"
    :data="tableData"
    v-loading="tableLoading"
    element-loading-text="拼命加载中..."
  >
    <el-table-column align="center" label="转让者">
      <el-table-column align="center" prop="fromUserName" label="手机号"></el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.fromUserType | agentTypeColor"
          >{{scope.row.fromUserType | agentType}}</el-tag>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column align="center" label="接收者">
      <el-table-column align="center" prop="currentUserName" label="手机号"></el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.currentType | agentTypeColor"
          >{{scope.row.currentType | agentType}}</el-tag>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column align="center" label="转让时间">
      <template slot-scope="scope">{{scope.row.createDate | formatDate}}</template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getTicketRecord_api } from "_api/ticket";
import { agentType, agentTypeColor } from "@/filters/salesman";
import { formatDate } from "@/filters/common";

export default {
  name: "",
  props: {
    ticketId: {
      type: String
    }
  },
  data() {
    return {
      tableLoading: true,
      tableData: []
    };
  },
  filters: {
    formatDate,
    agentType,
    agentTypeColor
  },
  methods: {
    async getList(ticketId) {
      this.tableData = (await getTicketRecord_api(ticketId)) || [];
      this.tableLoading = false;
    }
  },
  watch: {
    ticketId: {
      handler(newTicketId) {
        this.getList(newTicketId);
      },
      immediate: true
    }
  }
};
</script>
<style lang='scss' scoped></style>