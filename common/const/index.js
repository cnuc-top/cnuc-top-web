const UPLOAD_URL = 'https://upload.qiniup.com'
const CDN_URL = 'http://cdn.cnuc.top'

const DIALOG_MODE = {
  CREATE: 1,
  UPDATE: 2
}

const DIALOG_MODE_DETAIL = [
  {
    id: DIALOG_MODE.CREATE,
    title: '添加'
  },
  {
    id: DIALOG_MODE.UPDATE,
    title: '编辑'
  }
]

module.exports = {
  UPLOAD_URL,
  CDN_URL,
  DIALOG_MODE,
  DIALOG_MODE_DETAIL,
}
