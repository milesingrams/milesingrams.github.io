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
      	path.resolve(__dirname, './src/assets/styles/_variables.sass')
      ]
    })
}

module.exports = {
  siteName: 'Miles Ingram',
  siteDescription: 'Miles Ingram\'s Website',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: []
    }
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Experience',
        path: 'experiences/*.md'
      }
    }
  ],
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            {
              removeViewBox: false
            }
          ]
        }
      })
  }
}
