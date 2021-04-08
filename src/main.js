// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'fontsource-lato'
import 'fontsource-averia-serif-libre'
import 'ress'
import '~/assets/styles/core/_index.scss'
import VueAnimXyz from '@animxyz/vue'
import AnimateVisible from '~/directives/AnimateVisible'
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { isClient }) {
	Vue.use(VueAnimXyz)

  if (isClient) {
    const { VueHammer } = require('vue2-hammer')
    Vue.use(VueHammer)
  }

  Vue.directive('animate-visible', AnimateVisible)

  // Set default layout as a global component
  Vue.component('layout', DefaultLayout)
}
