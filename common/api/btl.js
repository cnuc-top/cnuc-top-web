import request from '@/utils/request'
const base = '//localhost:7301'

export default {
  buildingList: function buildingList(data) {
    return request({
      url: `${base}/v1/buildings`,
      method: 'get',
      params: data
    })
  },
  buildingId: function buildingId(id) {
    return request({
      url: `${base}/v1/buildings/${id}`,
      method: 'get'
    })
  },

  buildingIdContribute: function buildingIdContribute(id) {
    return request({
      url: `${base}/v1/buildings/${id}/contributes`,
      method: 'get'
    })
  },

  addProcess: function addProcess(data) {
    return request({
      url: `${base}/v1/process`,
      method: 'post',
      data
    })
  },
  addContribute: function addContribute(data) {
    return request({
      url: `${base}/v1/contributes`,
      method: 'post',
      data
    })
  },
  uploadToken: function uploadToken() {
    return request({
      url: `${base}/v1/upload/token`,
      method: 'get'
    })
  }
}
