export default {
  data() {
    return {
      autoList: true,
      tableData: [],
      total: 0,
      tableLoading: false,
      queryList: {
        page: 1,
        pageSize: 20,
      },
    }
  },
  mounted() {
    if (this.autoList) {
      this.getList();
    }
  },
  methods: {
    // 获取数据
    getList() {
      return new Promise(async (resolve, reject) => {
        this.tableLoading = true;
        if (this.beforeGetList && typeof this.beforeGetList == "function") {
          this.beforeGetList()
        }
        try {
          let res = await this.getListApi(this.queryList);
          if (this.afterGetList && typeof this.afterGetList == "function") {
            this.afterGetList(res)
          }
          this.total = res.count;
          this.tableData = res.rows;
          this.tableLoading = false;
          resolve();
        } catch (error) {
          this.tableLoading = false;
          reject()
        }
      })
    },
    // 改变每页显示的条数
    handleSizeChange(size) {
      this.queryList.page = 1;
      this.queryList.pageSize = size;
      this.getList();
    },
    // 改变当前页
    handleCurrentChange(currentPage) {
      this.queryList.page = currentPage;
      this.getList();
    },
    // 搜索数据
    handleSearch() {
      this.queryList.page = 1;
      this.getList();
    },
    // 重置表单
    resetForm() {

    }
  }
}
