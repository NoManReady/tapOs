module.exports = {
    // '/gateway/gpx-bidcore': {
    //     target: 'http://172.28.31.29:18001',
    //     changeOrigin: true,
    //     pathRewrite: {
    //         '/gateway/gpx-bidcore': '/'
    //     }
    // },
    '/file': {
        target: process.env.PROXY_URL,
        changeOrigin: true
    },
    '/gpx-meeting': {
        target: process.env.PROXY_URL,
        changeOrigin: true
    },
    '/gateway': {
        target: process.env.PROXY_URL,
        changeOrigin: true
    },

    // '/gateway/gpx-bidcore': {
    //     target: "127.0.0.1",
    //     changeOrigin: true,
    //     pathRewhrite:{
    //         '/gateway/gpx-bidcore':'/'
    //     }
    // },



}