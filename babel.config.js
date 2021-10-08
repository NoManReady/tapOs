let IS_PROD = process.env.NODE_ENV === 'production'
let _plugins = []
if (IS_PROD) {
  _plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '~src/elementui'
      }
    ]
  ]
}
