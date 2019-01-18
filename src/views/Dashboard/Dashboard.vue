<template>
  <div class="page-dashboard">
    <!-- <el-row :gutter="20" class="report-group">
      <el-col :span="6" v-for="(item,index) in reportList" :key="index">
        <div class="zui-shadow report-item">
          <div class="title">{{item.title}}</div>
          <div class="count">{{item.count}}</div>
          <div class="yesterday">{{item.yesterday}}</div>
        </div>
      </el-col>
    </el-row>-->
    <div>此功能正在开发中...</div>
  </div>
</template>
<script>
export default {
  name: "dashboard",
  data() {
    return {
      reportList: [
        {
          id: 1,
          status: true,
          title: "营业额",
          count: "￥121,312.23",
          yesterday: "昨日营业额：￥121,312.23"
        },
        {
          id: 2,
          status: true,
          title: "营业额",
          count: "￥121,312.23",
          yesterday: "昨日营业额：￥121,312.23"
        },
        {
          id: 3,
          status: true,
          title: "营业额",
          count: "￥121,312.23",
          yesterday: "昨日营业额：￥121,312.23"
        },
        {
          id: 4,
          status: true,
          title: "营业额",
          count: "￥121,312.23",
          yesterday: "昨日营业额：￥121,312.23"
        }
      ]
    };
  },
  mounted() {
    console.log("DashBoard");
  }
};
</script>
<style lang='scss' scoped>
.report-group {
  margin-bottom: 20px;
}
.zui-shadow {
  position: relative;
  padding: 20px;
}
.report-item {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 150px;
  & /deep/ .refresh-box {
    top: 10px;
    right: 20px;
    .el-icon-z-icon-refresh {
      color: #666;
    }
  }
  .title {
    color: #666;
    padding-left: 4px;
    margin-bottom: 20px;
  }
  .count {
    flex: 1;
    font-size: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .yesterday {
    color: #666;
    padding-left: 4px;
    margin-top: 10px;
  }
}
.daterange {
  position: absolute;
  z-index: 9;
  top: 14px;
  right: 20px;
  display: flex;
  align-items: center;
  .search-btn {
    margin-left: 10px;
  }
}
.pane-container {
  height: 520px;
  .title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .item {
    display: flex;
    line-height: 34px;
    padding: 0 20px;
    justify-content: space-between;
  }
}
</style>