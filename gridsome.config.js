// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
      	path.resolve(__dirname, './src/assets/styles/variables/_index.scss')
      ]
    })
}

module.exports = {
  siteName: 'Miles Ingram',
  siteDescription: 'Miles Ingram\'s Portfolio',
  host: '0.0.0.0',
  runtimeCompiler: true,
  icon: {
    favicon: './src/assets/images/favicon.png',
    touchicon: './src/assets/images/favicon.png',
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Experience',
        baseDir: 'experiences',
        path: '**/*.md'
      }
    },
    {
			use: 'gridsome-plugin-sass-resources-loader',
			options: {
				resources: '~/assets/styles/variables/_index.scss',
			},
		},
    {
			use: 'gridsome-plugin-svg',
			options: {
				svgo: [
					{
						removeViewBox: false,
					},
					{
						prefixIds: false,
					},
				],
			},
		},
  ],
  transformers: {
    remark: {
      slug: false,
      plugins: [],
    }
  },
}
