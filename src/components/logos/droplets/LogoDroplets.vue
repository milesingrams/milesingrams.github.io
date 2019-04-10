<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <logo-droplets-droplet :center="[50, 50]" :r="50" :depth="0" :poly="poly" :options="options"></logo-droplets-droplet>
  </svg>
</template>

<script>
import LogoDropletsDroplet from '~/components/logos/droplets/LogoDropletsDroplet'
export default {
  components: {
    LogoDropletsDroplet
  },
  props: ['poly'],
  data () {
    return {
      options: {
        mouseOver: false,
        maxDepth: 5,
        subdivideSeconds: 6
      }
    }
  },
  methods: {
    onMouseEnter () {
      this.options.mouseOver = true
    },
    onMouseLeave () {
      this.options.mouseOver = false
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-svg {
  width: 100%;
  height: 100%;
}
</style>
