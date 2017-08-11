var webpack = require('webpack');

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var path = require('path');


console.log( path.resolve(__dirname,'./public'))

module.exports = {
  entry: {
    index:'./public/scripts/index',

		'authority/index':'./public/scripts/authority/index',

		'shop/index':'./public/scripts/shop/index',

		'user/login':'./public/scripts/user/login',

		'user/reset':'./public/scripts/user/reset',

		'user/register/index':'./public/scripts/user/register/index',

		'user/register/verify':'./public/scripts/user/register/verify',

		'user/forget':'./public/scripts/user/forget',


		'borrowers/index':'./public/scripts/borrowers/index',

		'borrowers/detail':'./public/scripts/borrowers/detail',

		'borrowers/vehicle/detail':'./public/scripts/borrowers/vehicle/detail',

		'borrowers/vehicle/add':'./public/scripts/borrowers/vehicle/add',

		'borrowers/add':'./public/scripts/borrowers/add',

		'borrowers/bind':'./public/scripts/borrowers/bind',

		'borrowers/vehicle/list/index':'./public/scripts/borrowers/vehicle/list/index',

		'borrowers/vehicle/list/add':'./public/scripts/borrowers/vehicle/list/add',

		'borrowers/modify/password':'./public/scripts/borrowers/modify/password',

		'business/index':'./public/scripts/business/index',

		'business/detail':'./public/scripts/business/detail',

		'vehicles/index':'./public/scripts/vehicles/index',

		'personnel/index':'./public/scripts/personnel/index',

		'message/index':'./public/scripts/message/index',

		'account/index':'./public/scripts/account/index'




  },
  output: {
		path: path.resolve(__dirname, './public/dist/scripts'),
		filename: '[name].js'
		//publicPath: '/dist/', // 设置require.ensure路径
		//chunkFilename: 'scripts/[name].js' // 设置require.ensure 文件名
  },
  module: {
    loaders: [
      {
				test: /\.js?$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.ejs$/,
				loader: ['ejs-loader']
			}
    ]
  },
  resolve:{
    extensions:['*','.js','.json','.ejs']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
