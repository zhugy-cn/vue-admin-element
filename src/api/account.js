import request from './request'


// 用户账户的所有结算信息
export function getAccountInfoAll_api() {
  return request.post('payAccount/salemanSettlementInfo')
}

// 业务员 、市/ 省代理申请提现
export function withdrawApply_api() {
  return request.post('withdraw/salemanLevelApplyCash')
}

// 查询提现记录
export function getWithdrawRecord_api(params) {
  return request.post('withdraw/agentQueryWithdrawCash', params)
}

// 根据用户id查询下级结算信息
export function getAccountInfoLower_api(userId) {
  return request.post('payAccount/agentQuerySalemanSettlementInfo', { userId })
}

// 获取银行流水信息
export function getBankWater_api(params) {
  return request.post('tradeDetail/userQueryTradeDetail', params)
}