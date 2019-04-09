<template>
  <svg class="logo-svg" viewbox="0 0 100 100" @mouseenter="onMouseEnter">
    <logo-droplets-droplet :cx="50" :cy="50" :r="50" :opacity="1" :depth="0" :options="options"></logo-droplets-droplet>
  </svg>
</template>

<script>
import LogoDropletsDroplet from '~/components/logos/droplets/LogoDropletsDroplet'
export default {
  components: {
    LogoDropletsDroplet
  },
  data () {
    return {
      options: {
        poly: [
          [0, 100],
          [0, 0],
          [50, 50],
          [100, 0],
          [100, 100],
          [80, 100],
          [80, 45],
          [50, 75],
          [20, 45],
          [20, 100]
        ],
        mouseControl: false,
        maxDepth: 5,
        subdivideSeconds: 2
      }
    }
  },
  methods: {
    onMouseEnter () {
      this.options.mouseControl = true
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
