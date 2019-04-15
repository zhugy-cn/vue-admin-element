<template>
  <div class="page-salesmanList">
    <section class="zui-header-container"></section>
    <section class="zui-main--container zui-shadow">
      <section class="zui-main__search">
        <el-form class="search-com" :inline="true" size="mini" @submit.native.prevent>
          <el-form-item label="手机号码">
            <el-input v-model="queryList.userName" clearable placeholder="输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="queryList.name" clearable placeholder="输入姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="userInfo.type>2" label="类型">
            <el-select v-model="queryList.type" clearable placeholder="选择代理类型">
              <el-option
                v-for="item in agentTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
          <el-form-item style="float: right;">
            <el-button style="width: 100px;" @click="openAddDialog" type="success">添加</el-button>
          </el-form-item>
        </el-form>
      </section>
      <el-table
        border
        height="1"
        v-loading="tableLoading"
        element-loading-text="拼命加载中..."
        :data="tableData"
      >
        <el-table-column prop="userName" label="手机号"></el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">{{scope.row.nickName || '暂无'}}</template>
        </el-table-column>
        <el-table-column label="费率">
          <template slot-scope="scope">{{scope.row.rate / 10}}%</template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="scope.row.type | agentTypeColor"
            >{{scope.row.type | agentType}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="fullAddress" label="地址"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.createDate | formatDate}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="viewDetails(scope.row)" size="mini" type="primary">查看</el-button>
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

    <!-- 添加弹层 -->
    <el-dialog width="800px" :visible.sync="add_dialog" @closed="add_dialog_destroy=false">
      <add-data v-if="add_dialog_destroy" @cancel="add_dialog=false" @confirm="onConfirm"></add-data>
    </el-dialog>
    <!-- 详情弹层 -->
    <el-dialog
      custom-class="zui-dialog--fullscreen"
      :visible.sync="details_dialog"
      @closed="onDetailsDialog"
    >
      <el-tabs v-if="details_dialog_destroy" v-model="activeName">
        <el-tab-pane lazy label="基本信息" name="basic">
          <basic/>
        </el-tab-pane>
        <el-tab-pane lazy label="资格券" name="ticket">
          <ticket-list :type="2"></ticket-list>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script src="./PersonalList.js"></script>
<style lang='scss' scoped>
</style>