const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	lintOnSave: true,
	chainWebpack: config => {
		config.resolve.alias.set('@', resolve('src'))
	},
	devServer: {
		// development server port 8080
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://easybusy.free.svipss.top',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '',
				},
				logLevel: 'debug'
			},
		},
	},
}
