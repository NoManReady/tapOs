module.exports = {
  main: {
    entry: 'src/main.js',
    template: 'publish/index.html',
    filename: 'index.html',
    title: 'Tap Os',
    resources_js: [
      { src: `${process.env.VUE_APP_PUBLIC_PATH}config.js`, cache: false },
    ],
    resources_css: [
      { src: `//at.alicdn.com/t/font_2050407_m26xf0zyet.css`, cache: true },
    ]
  }
}