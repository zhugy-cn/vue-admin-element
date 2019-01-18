import table from '@/mixins/table'
import {
  provinceGetSalesmanList_api,
  cityGetSalesmanList_api,
  districtGetSalesmanList_api
} from '_api/salesman'
import addData from './components/add-data/add-data.vue'
import basic from './components/basic/basic.vue'
import ticketList from '_com/ticket-list/ticket-list.vue'


import { formatDate } from '@/filters/common'
import { agentType, agentTypeColor } from '@/filters/salesman'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "salesmanList",
  mixins: [table],
  components: {
    addData,
    basic,
    ticketList
  },
  filters: {
    formatDate,
    agentType, agentTypeColor
  },
  data() {
    return {
      autoList: false,
      tableData: [],
      add_dialog: false,
      add_dialog_destroy: true,
      details_dialog: false,
      details_dialog_destroy: true,
      activeName: 'basic'
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'agentTypeList'])
  },
  created() {
    this.getTableData();
  },
  methods: {
    ...mapMutations(['SET_ACTIVE_ID', 'SET_ROW_DATA']),
    // 获取表格数据
    getTableData() {
      switch (this.userInfo.type) {
        case 4:
          this.getListApi = provinceGetSalesmanList_api;
          break;
        case 3:
          this.getListApi = cityGetSalesmanList_api;
          break;
        case 2:
          this.getListApi = districtGetSalesmanList_api;
          break;
      }
      this.getList();
    },
    // 获取数据之后执行
    _afterGetList(res) {
      if (res) {
        res.list.forEach(item => {
          let {
            proName,
            cityName,
            countryName,
            townName
          } = item;
          proName = proName ? proName : '';
          cityName = cityName ? ' / ' + cityName : '';
          countryName = countryName ? ' / ' + countryName : '';
          townName = townName ? ' / ' + townName : '';
          item.fullAddress = proName + cityName + countryName + townName;
        });
      }
    },
    // 打开添加弹层
    openAddDialog() {
      this.add_dialog_destroy = true;
      this.add_dialog = true;
    },
    onDetailsDialog() {
      this.activeName = 'basic'
      this.details_dialog_destroy = false;
    },
    // 查看详情
    viewDetails(row) {
      this.SET_ROW_DATA(row);
      this.SET_ACTIVE_ID(row.userId);
      this.details_dialog_destroy = true;
      this.details_dialog = true;
    },
    onConfirm() {
      this.handleSearch();
      this.add_dialog = false;
    }
  }
};


