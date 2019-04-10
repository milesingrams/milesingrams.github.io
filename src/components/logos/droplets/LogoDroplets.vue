<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <logo-droplets-droplet :cx="50" :cy="50" :r="50" :depth="0" :poly="poly" :options="options"></logo-droplets-droplet>
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
        mouseControl: false,
        maxDepth: 5,
        subdivideSeconds: 2
      }
    }
  },
  methods: {
    onMouseEnter () {
      this.options.mouseControl = true
    },
    onMouseLeave () {
      this.options.mouseControl = false
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
