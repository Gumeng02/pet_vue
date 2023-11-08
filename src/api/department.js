import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/api/department/tree',
    method: 'get',
    params: query
  })
}

export function crateDepartment(data) {
  return request({
    url: '/api/department/add',
    method: 'post',
    data
  })
}

export function deleteDepartment(params) {
  return request({
    url: '/api/department/delete',
    method: 'post',
    params
  })
}
