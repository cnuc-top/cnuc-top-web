import request from '@/utils/request'
const base = '//localhost:7301'

export default {
  // Building
  buildingCreate: function buildingCreate(data) {
    return request({
      url: `${base}/v1/buildings`,
      method: 'post',
      data
    })
  },

  buildingDelete: function buildingDelete(id) {
    return request({
      url: `${base}/v1/buildings/${id}`,
      method: 'delete'
    })
  },

  buildingUpdate: function buildingUpdate(id, data) {
    return request({
      url: `${base}/v1/buildings/${id}`,
      method: 'put',
      data
    })
  },

  buildingList: function buildingList(data) {
    return request({
      url: `${base}/v1/buildings`,
      params: data
    })
  },

  building: function building(id) {
    return request({
      url: `${base}/v1/buildings/${id}`
    })
  },

  buildingContribute: function buildingContribute(id) {
    return request({
      url: `${base}/v1/buildings/${id}/contributes`
    })
  },

  buildingCompaniesCreate: function buildingCompaniesCreate(id, data) {
    return request({
      url: `${base}/v1/buildings/${id}/companies`,
      method: 'post',
      data
    })
  },

  buildingCompaniesDelete: function buildingCompaniesDelete(id) {
    return request({
      url: `${base}/v1/buildings/${id}/companies`,
      method: 'delete'
    })
  },

  buildingCompanies: function buildingCompanies(id) {
    return request({
      url: `${base}/v1/buildings/${id}/companies`
    })
  },

  buildingContributes: function buildingContributes(id) {
    return request({
      url: `${base}/v1/buildings/${id}/contributes`
    })
  },


  // City
  // cityCreate: function cityCreate(id) {
  //   return request({
  //     url: `${base}/v1/citys`,
  //     method: 'post'
  //   })
  // },

  // cityUpdate: function cityUpdate(id) {
  //   return request({
  //     url: `${base}/v1/citys/${id}`,
  //     method: 'put'
  //   })
  // },

  // cityList: function cityList(data) {
  //   return request({
  //     url: `${base}/v1/citys`,
  //     data
  //   })
  // },

  // cityId: function cityId(id) {
  //   return request({
  //     url: `${base}/v1/citys/${id}`
  //   })
  // },

  // Svgfile
  svgfileCreate: function svgfileCreate(data) {
    return request({
      url: `${base}/v1/svgfiles`,
      method: 'post',
      data
    })
  },

  svgfileDelete: function svgfileDelete(id) {
    return request({
      url: `${base}/v1/svgfiles/${id}`,
      method: 'delete'
    })
  },

  svgfileUpdate: function svgfileUpdate(id, data) {
    return request({
      url: `${base}/v1/svgfiles/${id}`,
      method: 'put',
      data
    })
  },

  // Processes
  processCreate: function processCreate(data) {
    return request({
      url: `${base}/v1/processes`,
      method: 'post',
      data
    })
  },

  processDelete: function processDelete(id) {
    return request({
      url: `${base}/v1/processes/${id}`,
      method: 'delete'
    })
  },

  processUpdate: function processUpdate(id, data) {
    return request({
      url: `${base}/v1/processes/${id}`,
      method: 'put',
      data
    })
  },

  // Companies
  companyCreate: function companyCreate(data) {
    return request({
      url: `${base}/v1/companies`,
      method: 'post',
      data
    })
  },

  companyDelete: function companyDelete(id) {
    return request({
      url: `${base}/v1/companies/${id}`,
      method: 'delete'
    })
  },

  companyUpdate: function companyUpdate(id, data) {
    return request({
      url: `${base}/v1/companies/${id}`,
      method: 'put',
      data
    })
  },

  companyList: function companyList(data) {
    return request({
      url: `${base}/v1/companies`,
      params: data
    })
  },

  // Contributes
  contributeCreate: function contributeCreate(data) {
    return request({
      url: `${base}/v1/contributes`,
      method: 'post',
      data
    })
  },

  contributeDelete: function contributeDelete(id) {
    return request({
      url: `${base}/v1/contributes/${id}`,
      method: 'delete'
    })
  },

  contributeUpdate: function contributeUpdate(id, data) {
    return request({
      url: `${base}/v1/contributes/${id}`,
      method: 'put',
      data
    })
  },

  contributeList: function contributeList(data) {
    return request({
      url: `${base}/v1/contributes`,
      params: data
    })
  },

  // token
  uploadToken: function uploadToken() {
    return request({
      url: `${base}/v1/upload/token`
    })
  }
}
