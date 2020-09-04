require('dotenv').config()
module.exports = {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      { src: '/js/facebook.js' },
      { src: '/js/wx.js' },
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    // 'ant-design-vue/lib/button/style/css',
    'ant-design-vue/dist/antd.less',
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    'quill/dist/quill.bubble.css',
    '~/assets/main.css',
    'swiper/css/swiper.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/axios',
    { src: '@/plugins/vue-quill-editor', ssr: false },
    { src: '@/plugins/avatar.js', ssr: false },
    { src: '@/plugins/vue-swiper', ssr: false },
  ],
  /*
  ** 客户端和服务端共享的环境变量
  */
  env: {
    host_env: process.env.CODE_ENV
  },
  axios: {
    proxy: false,
  },
  proxy: {
    '/': {
      target: '//ashago-api-dev.cc2dbe1fd91f042528f96dc27c2dba5fe.cn-zhangjiakou.alicontainer.com'
    },
    '/api': {
      target: '//ashago-api-dev.cc2dbe1fd91f042528f96dc27c2dba5fe.cn-zhangjiakou.alicontainer.com'
    },
    '/user': {
      target: '//ashago-api-dev.cc2dbe1fd91f042528f96dc27c2dba5fe.cn-zhangjiakou.alicontainer.com'
    },
    // '/api': {
    //   target: '//yapi.cc2dbe1fd91f042528f96dc27c2dba5fe.cn-zhangjiakou.alicontainer.com/mock/25'
    // },
    // '/user': {
    //   target: '//yapi.cc2dbe1fd91f042528f96dc27c2dba5fe.cn-zhangjiakou.alicontainer.com/mock/25'
    // }
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, { isClient }) {
      // 客户端打包配置
      if (isClient) {
      }
    },
    loaders: {
      // 定制ant-design-vue全局主题
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#8D050B',
          }
        }
      }
    },
    vendor: ['axios']
  }
}
