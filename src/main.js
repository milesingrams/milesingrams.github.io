// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import 'typeface-lato'
import 'typeface-averia-serif-libre'
import '~/assets/styles/_index.scss'
import VueObserveVisibility from 'vue-observe-visibility'
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  Vue.use(VueObserveVisibility)

  if (isClient) {
    const { VueHammer } = require('vue2-hammer')
    Vue.use(VueHammer)
  }

  // Set default layout as a global component
  Vue.component('layout', DefaultLayout)
}
