import request from '@/utils/request'

export function registerShop(data) {
  return request({
    url: '/api/shop/register',
    method: 'post',
    data
  })
}

export function list(params) {
  return request({
    url: '/api/shop/list',
    method: 'get',
    params
  })
}

export function paginationList(params) {
  return request({
    url: '/api/shop/paginationList',
    method: 'post',
    params: params
  })
}

export function outShop(params) {
  return request({
    url: '/api/shop/out',
    method: 'post',
    params
  })
}

export function deleteShop(params) {
  return request({
    url: '/api/shop/delete',
    method: 'post',
    params
  })
}

export function updateShop(data) {
  return request({
    url: '/api/shop/edit',
    method: 'post',
    data
  })

}
