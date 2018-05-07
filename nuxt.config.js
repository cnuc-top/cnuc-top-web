module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'CNUC.TOP - 第一城建',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '第一城建,摩天大楼,建设进度,高楼'
      },
      {
        hid: 'description',
        name: 'description',
        content: '第一城建网，摩天大楼建设时间表'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  css: ['~styles/cnuc/index.styl'],
  plugins: ['~plugins/element-ui'],
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
