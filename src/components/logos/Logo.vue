<template>
  <div class="logo">
    <component :is="currentLogo" :poly="poly"></component>
  </div>
</template>

<script>
import LogoDroplets from '~/components/logos/droplets/LogoDroplets'
import LogoWebs from '~/components/logos/webs/LogoWebs'

export default {
  name: 'Logo',
  components: {
    LogoDroplets,
    LogoWebs
  },
  data () {
    return {
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
      logos: [LogoDroplets, LogoWebs],
      currentLogo: null
    }
  },
  methods: {
    rotateLogo () {
      let randomIndex = Math.floor(Math.random() * this.logos.length)
      this.currentLogo = this.logos[randomIndex]
    }
  },
  created () {
    this.rotateLogo()
  }
}
</script>

<style lang="scss" scoped>
.logo, .logo-svg {
  width: 100%;
  height: 100%;
}
</style>
