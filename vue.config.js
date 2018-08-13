module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        styleConfig: '@/stylesheets/config',
        styles: '@/stylesheets/utilities'
      }
    }
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
        'productName': 'Karaw',
        'win': {
          'target': [
            {
              'target': 'portable',
              'arch': [
                'x64',
                'ia32'
              ]
            }
          ]
        },
        'mac': {
          target: 'dmg'
        }
      }
    }
  }
}
