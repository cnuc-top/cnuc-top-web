const BUILD_SHOW_MODE = {
  MEDIA: 1,
  STRUCTURE: 2
}

const BUILD_SHOW_MODE_DETAIL = [
  {
    id: BUILD_SHOW_MODE.MEDIA,
    name: '图文',
    class: 'media'
  },
  {
    id: BUILD_SHOW_MODE.STRUCTURE,
    name: '结构',
    class: 'structure'
  }
]

// 贡献类型
const CONTRIBUTE_TYPE = {
  DESIGN: 1,
  PROCESS: 2
}

const CONTRIBUTE_TYPE_DETAIL = [
  {
    id: CONTRIBUTE_TYPE.DESIGN,
    name: '效果图'
  },
  {
    id: CONTRIBUTE_TYPE.PROCESS,
    name: '进度图'
  }
]

// SVG 类型
const SVGFILE_TYPE = {
  STRUCTURE: 1,
  SCOUNDS: 2
}

const SVG_FILL_COLORS = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const SVGFILE_TYPE_DETAIL = [
  {
    id: SVGFILE_TYPE.STRUCTURE,
    name: '主体结构'
  },
  {
    id: SVGFILE_TYPE.SCOUNDS,
    name: '二次结构'
  }
]

const WEBLINK_TYPE = {
  DEVELOPERS: 1,
  DESIGNER: 2,
  BUILDER: 3,
  BBS: 4
}

const WEBLINK_TYPE_DETAIL = [
  {
    id: WEBLINK_TYPE.DEVELOPERS,
    name: '开发商'
  },
  {
    id: WEBLINK_TYPE.DESIGNER,
    name: '设计商'
  },
  {
    id: WEBLINK_TYPE.BUILDER,
    name: '建设商'
  },
  {
    id: WEBLINK_TYPE.BBS,
    name: '论坛'
  }
]

// 公司类型
const COMPANY_TYPE = {
  DEVELOPERS: 1,
  DESIGNER: 2,
  BUILDER: 3
}

const COMPANY_TYPE_DETAIL = [
  {
    id: COMPANY_TYPE.DEVELOPERS,
    name: '开发商'
  },
  {
    id: COMPANY_TYPE.DESIGNER,
    name: '设计商'
  },
  {
    id: COMPANY_TYPE.BUILDER,
    name: '建设商'
  }
]

module.exports = {
  BUILD_SHOW_MODE,
  BUILD_SHOW_MODE_DETAIL,
  CONTRIBUTE_TYPE,
  CONTRIBUTE_TYPE_DETAIL,
  SVGFILE_TYPE,
  SVGFILE_TYPE_DETAIL,
  SVG_FILL_COLORS,
  WEBLINK_TYPE,
  WEBLINK_TYPE_DETAIL,
  COMPANY_TYPE,
  COMPANY_TYPE_DETAIL
}
