module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        styleConfig: '@/stylesheets/config',
        styles: '@/stylesheets/utilities'
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('svg-inline-loader')
      .loader('svg-inline-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        return {
          name: 'img/[name].[hash:8].[ext]'
        }
      })
  },
  css: {
    modules: true,
    loaderOptions: {
      css: {
        localIdentName: '[name]-[local]-[hash:base64:10]',
        camelCase: 'only'
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
    electronBuilder: {
      builderOptions: {
        'appId': 'com.electron.karaw',
        'productName': 'E2A-Analysis',
        'win': {
          'target': [
            {
              'target': 'portable',
              'arch': [
                'x64',
                'ia32'
              ]
            }
          ],
          'icon': 'src/assets/electron/icon.ico'
        },
        'mac': {
          'target': 'dmg',
          'icon': 'src/assets/electron/icon.png'
        }
      }
    }
  }
}
