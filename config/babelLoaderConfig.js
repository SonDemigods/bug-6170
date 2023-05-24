var plugin = [
	[
		require.resolve('babel-plugin-named-asset-import'),
		{
			loaderMap: {},
		},
	],
	[
		'import',
		{
			libraryName: 'antd-mobile',
			style: true,
		},
		'antd-mobile',
	],
	[
		'import',
		{
			libraryName: 'ehome-rcm',
			style: true,
		},
		'ehome-rcm',
	],
	[
		'import',
		{
			libraryName: 'ehome-utils',
			camel2DashComponentName: false,
		},
		'ehome-utils',
	],
];

module.exports = process.env.NODE_ENV === 'production' ? [...plugin] : plugin;
