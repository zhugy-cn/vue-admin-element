import request from './request'


// 根据用户id查询资格券(分页)
export function getPageTicketByUserId_api(params) {
  return request.post('ticket/getTicketPageByUserId', params)
}

// 根据用户id查询资格券(不分页)
export function getTicketByUserId_api(status) {
  return request.post('ticket/getTicketByUserId', { status })
}


// 资格券批量转让
export function makeOverTicket_api(params) {
  return request.post('ticket/makeOverBatchTicket', params)
}


// 上线根据下线用户id查询资格券
export function agentGetTicketByUserId_api(params) {
  return request.post('ticket/agentQueryTicketByUserId', params)
}


// 
export function getTicketRecord_api(ticketId) {
  return request.post('ticketUseRecord/getTicketUseRecordByTicketId', { ticketId })
}
