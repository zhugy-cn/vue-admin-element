import request from './request'


// 查询所有省份
export function getProvince_api() {
  return request.post('address/getProvince')
}


// 根据省份code获取城市信息
export function getCityByProvinceCode_api(code) {
  return request.post('address/getCityByProvinceCode', { code })
}


// 根据城市code获取区域信息
export function getDistrictByCityCode_api(code) {
  return request.post('address/getDistrictByCityCode', { code })
}


// 根据城区code获取城镇、街道信息
export function getTownByDistrictCode_api(code) {
  return request.post('address/getTownByDistrictCode', { code })
}


// 查询总行
export function getBankList_api(headBankName) {
  return request.post('bankInfo/getHeadBankInfo', { headBankName })
}

// 根据总行No查询支行
export function getSubBankList_api(params) {
  return request.post('bankInfo/getSubBankInfo', params)
}