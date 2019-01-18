<template>
  <div class="page-adminList">
    <section class="zui-header-container"></section>
    <section class="zui-main--container zui-shadow">
      <section class="zui-main__search">
        <el-form class="search-com" :inline="true" size="mini" @submit.native.prevent>
          <el-form-item label="手机号码">
            <el-input v-model="queryList.phone" clearable placeholder="输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="queryList.company_name" clearable placeholder="输入公司名称"></el-input>
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
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
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
<script src="./AdminLis.js"></script>
<style lang='scss' scoped>
</style>