const { merge } = require('webpack-merge');

const commonConfig = require('./configs/webpack/webpack.common');
const productionConfig = require('./configs/webpack/webpack.prod');
const developmentConfig = require('./configs/webpack/webpack.dev');

module.exports = (env, args) => {
	switch(args.mode) {
		case 'development':
			return merge(commonConfig, developmentConfig);
		case 'production':
			return merge(commonConfig, productionConfig);
		default:
			throw new Error(`Проблема в зоне слияния конфигураций.`);
	}
}
