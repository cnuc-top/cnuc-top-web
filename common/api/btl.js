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
      url: `${base}/v2/buildings/${id}`,
      method: 'get'
    })
  }
}
