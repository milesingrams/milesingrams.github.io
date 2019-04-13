<template>
  <div class="logo" @click="rotateLogo">
    <client-only>
      <transition appear name="fadeInOut" mode="out-in">
        <component v-if="currentLogo" :is="currentLogo" :options="{ poly }"></component>
      </transition>
    </client-only>
  </div>
</template>

<script>
import LogoDroplets from '~/components/logos/LogoDroplets'
import LogoGradient from '~/components/logos/LogoGradient'
import LogoSlices from '~/components/logos/LogoSlices'
import LogoWebs from '~/components/logos/LogoWebs'

export default {
  name: 'Logo',
  data () {
    return {
      poly: [
        [0, 0],
        [50, 50],
        [100, 0],
        [100, 100],
        [80, 100],
        [80, 45],
        [50, 75],
        [20, 45],
        [20, 100],
        [0, 100],
        [0, 0]
      ],
      logos: [LogoDroplets, LogoGradient, LogoSlices, LogoWebs],
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
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
