<template>
  <div class="logo" @click="rotateLogo">
    <component :is="currentLogo" :poly="poly"></component>
  </div>
</template>

<script>
import LogoDroplets from '~/components/logos/droplets/LogoDroplets'
import LogoSlices from '~/components/logos/slices/LogoSlices'
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
        [20, 100],
        [0, 100]
      ],
      logos: [LogoDroplets, LogoSlices, LogoWebs],
      logosToView: [],
      currentLogo: null
    }
  },
  methods: {
    rotateLogo () {
      if (!this.logosToView.length) {
        this.logosToView = this.logos.filter((logo) => {
          return logo !== this.currentLogo
        })
      }
      let randomIndex = Math.floor(Math.random() * this.logosToView.length)
      this.currentLogo = this.logosToView[randomIndex]
      this.logosToView.splice(randomIndex, 1)
    }
  },
  created () {
    this.rotateLogo()
    this.currentLogo = LogoSlices
  }
}
</script>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
}

.logo, .logo-svg {
  width: 100%;
  height: 100%;
}
</style>
