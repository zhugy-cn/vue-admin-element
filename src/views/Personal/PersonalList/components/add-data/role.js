import { mapGetters } from 'vuex'
import {
  proAgentAddSalesman_api,
  cityAgentAddSalesman_api,
  townAgentAddSalesman_api,
} from '_api/salesman'
import {
  getCityByProvinceCode_api,
  getDistrictByCityCode_api,
  getTownByDistrictCode_api,
} from '_api/area'
export default {
  data() {
    return {
      regionDisabled: {},
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.formLoading = true;
    this.getApiByRole();
  },
  methods: {
    // 根据角色获取添加业务员的api
    getApiByRole() {
      switch (this.userInfo.type) {
        case 4:
          this.isProvince();
          break;
        case 3:
          this.isCity();
          break;
        case 2:
          this.isDistrict();
          break;
      }
    },
    // 省
    async isProvince() {
      const { proCode, proName } = this.userInfo;
      this.addSalesmanApi = proAgentAddSalesman_api;
      this.formData = {
        ...this.formData,
        proCode,
      };
      this.provinceList = [{
        areaCode: proCode,
        areaName: proName,
      }]
      // 获取市
      this.cityList = await getCityByProvinceCode_api(proCode);
      this.formLoading = false;
    },
    // 市
    async isCity() {
      const { proCode, proName, cityCode, cityName } = this.userInfo;
      this.addSalesmanApi = cityAgentAddSalesman_api;
      this.formData = {
        ...this.formData,
        proCode,
        cityCode
      }
      this.regionDisabled = {
        city: true
      }
      this.provinceList = [{
        areaCode: proCode,
        areaName: proName,
      }]
      this.cityList = [{
        areaCode: cityCode,
        areaName: cityName,
      }]
      // 获取县
      this.districtList = await getDistrictByCityCode_api(cityCode);
      this.formLoading = false;
    },
    // 区县
    async isDistrict() {
      const {
        proCode, cityCode, countryCode,
        proName, cityName, countryName
      } = this.userInfo;
      this.regionDisabled = {
        city: true,
        district: true,
        type: true,
      }
      this.provinceList = [{
        areaCode: proCode,
        areaName: proName,
      }]
      this.cityList = [{
        areaCode: cityCode,
        areaName: cityName,
      }]
      this.districtList = [{
        areaCode: countryCode,
        areaName: countryName,
      }]

      // 获取镇
      this.townList = await getTownByDistrictCode_api(countryCode);
      this.addSalesmanApi = townAgentAddSalesman_api;
      this.formData = {
        ...this.formData,
        proCode,
        cityCode,
        countryCode,
        type: 1,
        rate: '40%'
      }
      this.formLoading = false;
    },
  },
}