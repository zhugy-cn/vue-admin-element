<template>
  <div class="page-adminList">
    <section class="zui-header-container"></section>
    <section class="zui-main--container zui-shadow">
      <section class="zui-main__search">
        <el-form class="search-com" :inline="true" size="mini" @submit.native.prevent>
          <el-form-item label="状态">
            <el-select v-model="queryList.statusList" clearable placeholder="选择提现状态">
              <el-option label="审核中" :value="1"/>
              <el-option label="未通过" :value="2"/>
              <el-option label="等待打款" :value="3"/>
              <el-option label="自动打款异常" :value="4"/>
              <el-option label="打款完成" :value="5"/>
              <el-option label="手动打款" :value="6"/>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="时间">
            <el-date-picker
              v-model="queryList.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item> -->
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
        <el-table-column label="提现金额">
          <template slot-scope="scope">{{scope.row.withdrawalAmount | withdrawStatus}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status | withdrawStatus}}</template>
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
<script src="./WithdrawList.js"></script>
<style lang="scss" scoped>
</style>
