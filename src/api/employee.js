import request from '@/utils/request'

export function addEmployee(data) {
  return request({
    url: '/api/employee/add',
    method: 'post',
    data
  })
}
export function findAll(query) {
  return request({
    url: '/api/employee/findall',
    method: 'get',
    params: query
  })
}

export function updateEmployee(data) {
  return request({
    url: '/api/employee/edit',
    method: 'post',
    data
  })
}

export function deleteEmployee(params) {
  return request({
    url: '/api/employee/delete',
    method: 'post',
    params
  })
}

