import request from './request'


// 省代理获取业务员列表
export function provinceGetSalesmanList_api(params) {
  return request.post('saleman/proAgentQuerySalemanAndUser', params)
}


// 市代理获取业务员列表
export function cityGetSalesmanList_api(params) {
  return request.post('saleman/cityAgentQuerySalemanAndUser', params)
}



// 区代理获取业务员列表
export function districtGetSalesmanList_api(params) {
  return request.post('saleman/countryAgentQuerySalemanAndUser', params)
}





// 省级代理添加业务员或市级代理
export function proAgentAddSalesman_api(params) {
  return request.post('saleman/proAgentAddSaleman', params)
}

// 市级代理添加业务员或区代理
export function cityAgentAddSalesman_api(params) {
  return request.post('saleman/cityAgentAddSaleman', params)
}

// 区代理添加业务员
export function townAgentAddSalesman_api(params) {
  return request.post('saleman/countryAgentAddSaleman', params)
}