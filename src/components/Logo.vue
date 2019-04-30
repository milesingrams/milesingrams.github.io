<template>
  <div class="logo" v-show="progress" :class="{'no-pointer-events': !atPageTop}" @click="onLogoClick">
    <client-only>
      <transition appear name="fadeInOut" mode="out-in">
        <component :is="effect" :progress="progress" :options="{ poly, color }"></component>
      </transition>
    </client-only>
    <transition appear name="click-me">
      <icon-fingerprint class="click-me" v-if="atPageTop"></icon-fingerprint>
    </transition>
  </div>
</template>

<script>
import EffectDroplets from '~/components/effects/EffectDroplets'
import EffectGradient from '~/components/effects/EffectGradient'
import EffectSlices from '~/components/effects/EffectSlices'
import EffectWebs from '~/components/effects/EffectWebs'
import IconFingerprint from '~/assets/icons/IconFingerprint.svg'
import anime from 'animejs'

export default {
  name: 'Logo',
  props: ['color'],
  components: {
    EffectDroplets,
    EffectGradient,
    EffectSlices,
    EffectWebs,
    IconFingerprint
  },
  data () {
    return {
      effects: ['EffectDroplets', 'EffectGradient', 'EffectSlices', 'EffectWebs'],
      effectsToView: [],
      effect: null,
      animationReverse: true,
      animationProgressTarget: 0,
      animationProgress: 0,
      animationEase: 0.075,
      animationPageCoverage: 1.25,
      logoClicked: false,
      poly: [
        [0, 0],
        [50, 49.5],
        [100, 0],
        [100, 100],
        [80, 100],
        [80, 44.5],
        [50, 74.5],
        [20, 44.5],
        [20, 100],
        [0, 100],
        [0, 0]
      ]
    }
  },
  computed: {
    progress () {
      if (this.animationReverse) {
        return 1 - this.animationProgress
      } else {
        return this.animationProgress
      }
    },
    atPageTop () {
      if (this.animationProgressTarget < 0.05) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    rotateEffect () {
      if (!this.effectsToView.length) {
        if (!this.effect) {
          let previousEffect = localStorage.getItem('previousEffect', this.effect)
          if (previousEffect) {
            this.effect = previousEffect
          }
        }
        this.effectsToView = this.effects.filter((effect) => {
          return effect !== this.effect
        })
      }
      let randomEffectIndex = Math.floor(Math.random() * this.effectsToView.length)
      this.effect = this.effectsToView[randomEffectIndex]
      this.effectsToView.splice(randomEffectIndex, 1)
      localStorage.setItem('previousEffect', this.effect)
      this.animationProgress = 10
    },
    onWindowScrollResize () {
      this.scrollY = window.pageYOffset
      this.animationProgressTarget = Math.min(window.pageYOffset / (window.innerHeight * this.animationPageCoverage), 1)
    },
    updateScrollProgress () {
      this.animationProgress += (this.animationProgressTarget - this.animationProgress) * this.animationEase
      if (1 - this.animationProgress < 0.001) {
        this.animationProgress = 1
      }
      window.requestAnimationFrame(this.updateScrollProgress)
    },
    onLogoClick () {
      this.logoClicked = true
      this.rotateEffect()
    }
  },
  mounted () {
    if (process.isClient) {
      window.addEventListener('scroll', this.onWindowScrollResize)
      window.addEventListener('resize', this.onWindowScrollResize)
      this.onWindowScrollResize()
      this.updateScrollProgress()
      this.rotateEffect()
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onWindowScrollResize)
    window.removeEventListener('resize', this.onWindowScrollResize)
  }
}
</script>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.click-me {
  position: absolute;
  width: 20%;
  height: 20%;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  --iconColor: rgba(0, 0, 0, 0.25);

  &-enter-active {
    animation: fadeIn 0.5s var(--ease-in-quad) both;
  }

  &-leave-active {
    animation: fadeOut 0.5s var(--ease-out-quad) both;
  }
}

</style>
