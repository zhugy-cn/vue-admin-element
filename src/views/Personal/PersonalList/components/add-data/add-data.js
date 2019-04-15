import { serviceCharge } from '@/filters/salesman'
import BankList from '_com/bank-list/bank-list'
import { mapGetters } from 'vuex'
import roleMixin from './role'
import { validator } from '@/libs/utils'

import {
  getDistrictByCityCode_api,
  getTownByDistrictCode_api,
} from '_api/area'

export default {
  components: {
    BankList
  },
  mixins: [roleMixin],
  computed: {
    ...mapGetters(['agentTypeList', 'userInfo'])
  },
  data() {
    let validatePhone = (rule, value, callback) => {
      if (validator('phone', value)) {
        return callback();
      } else {
        return callback(new Error('手机号格式不正确'));
      }
    }
    return {
      addSalesmanApi: '',
      formData: {
        countryCode: '',
        townCode: '',
      },
      provinceList: [], // 省
      cityList: [],     // 市
      districtList: [], // 县
      townList: [],     // 镇
      formLoading: false,
      innerDialog: false,
      rules: {
        type: [
          { required: true, message: '请选择类型', trigger: 'change' },
        ],
        rate: [
          { required: true, message: '请选择类型', trigger: 'change' },
        ],
        userName: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: validatePhone, trigger: 'change' }
        ],
        proCode: [
          { required: true, message: '请选择所属地址', trigger: 'change' }
        ],
        cardType: [
          { required: true, message: '请选择银行卡类型', trigger: 'change' }
        ],
        subBankName: [
          { required: true, message: '请输入开户行', trigger: 'change' }
        ],
        bankCardNo: [
          { required: true, message: '请输入银行卡号', trigger: 'change' }
        ],
        bankCardHolder: [
          { required: true, message: '请输入持卡人姓名', trigger: 'change' }
        ],
        bankMobile: [
          { required: true, message: '请输入开户行所绑手机号', trigger: 'change' },
          { validator: validatePhone, trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    // 类型改变
    changeType(val) {
      this.formData.rate = serviceCharge(val);
    },
    // 市改变
    async changeCity(code) {
      this.formData = {
        ...this.formData,
        countryCode: '',
        townCode: '',
      }
      this.districtList = await getDistrictByCityCode_api(code);
    },
    // 区改变
    async changeDistrict(code) {
      this.formData.townCode = '';
      this.townList = await getTownByDistrictCode_api(code);
    },
    // 监听银行提交
    onSubmitBank(bankInfo) {
      const { subBankName, id: bankId } = bankInfo;
      this.formData = {
        ...this.formData,
        subBankName,
        bankId
      }
      this.innerDialog = false;
    },
    // 表单提交
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addSalesman()
        } else {
          return false;
        }
      });
    },
    // 添加业务员
    async addSalesman() {
      const { type, cityCode, countryCode } = this.formData;
      // 市代理
      if (type === 3 && !cityCode) {
        this.$message({
          type: 'warning',
          showClose: true,
          message: '请选择市'
        })
        return
      }
      // 区县代理
      if (type === 2 && !countryCode) {
        this.$message({
          type: 'warning',
          showClose: true,
          message: '请选择区县'
        })
        return
      }
      this.$global.openLoading();
      let { rate } = this.formData;
      let params = {
        ...this.formData,
        rate: rate.slice(0, rate.length - 1) * 10
      }
      await this.addSalesmanApi(params);
      this.$message({
        showClose: true,
        message: '添加成功',
        type: 'success'
      })
      this.$emit('confirm');
    }
  },
};