<template>
  <div class="logo" :class="{'no-pointer-events': scrollY > 20}" @click="onLogoClick">
    <client-only>
      <transition appear name="fadeInOut" mode="out-in">
        <component :is="effect" :progress="progress" :options="{ poly, color }"></component>
      </transition>
    </client-only>
    <div class="fold-up" ref="foldUp">
      <div class="fold-up-content">
        <div class="fold-up-text">Click Me</div>
      </div>
    </div>
  </div>
</template>

<script>
import EffectDroplets from '~/components/effects/EffectDroplets'
import EffectGradient from '~/components/effects/EffectGradient'
import EffectSlices from '~/components/effects/EffectSlices'
import EffectWebs from '~/components/effects/EffectWebs'
import anime from 'animejs'

export default {
  name: 'Logo',
  props: ['color'],
  components: {
    EffectDroplets,
    EffectGradient,
    EffectSlices,
    EffectWebs
  },
  data () {
    return {
      effects: ['EffectDroplets', 'EffectGradient', 'EffectSlices', 'EffectWebs'],
      effectsToView: [],
      effect: null,
      animationReverse: true,
      animationProgressTarget: 0,
      animationProgress: 0,
      animationEase: 0.1,
      animationPageCoverage: 1,
      scrollY: 0,
      foldUpAnimation: null,
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
      this.animationProgress = 1
    },
    onWindowScrollResize () {
      this.scrollY = window.pageYOffset
      this.animationProgressTarget = Math.min(window.pageYOffset / (window.innerHeight * this.animationPageCoverage), 1)
      this.updateFoldUpAnimation()
    },
    updateScrollProgress () {
      this.animationProgress += (this.animationProgressTarget - this.animationProgress) * this.animationEase
      window.requestAnimationFrame(this.updateScrollProgress)
    },
    onLogoClick () {
      this.rotateEffect()
    },
    updateFoldUpAnimation () {
      if (!this.foldUpAnimation) {
        this.foldUpAnimation = anime({
          targets: this.$refs.foldUp,
          height: '15%',
          easing: 'easeInOutQuad',
          delay: 3000,
          endDelay: 700,
          duration: 300,
          direction: 'alternate',
          autoplay: false
        })
      }
      if (this.scrollY < 20) {
        this.foldUpAnimation.restart()
        this.foldUpAnimation.play()
      } else {
        this.foldUpAnimation.restart()
        this.foldUpAnimation.pause()
      }
    }
  },
  created () {
    if (process.isClient) {
      this.rotateEffect()
    }
  },
  mounted () {
    if (process.isClient) {
      window.addEventListener('scroll', this.onWindowScrollResize)
      window.addEventListener('resize', this.onWindowScrollResize)
      this.onWindowScrollResize()
      this.updateScrollProgress()
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
  width: 100%;
  height: 100%;
}

.fold-up {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  background-color: white;
  pointer-events: none;
  animation: showFoldUp 5s var(--ease-in-out-quad) infinite;

  .fold-up-content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 -.5px 0 .5px rgba(0, 0, 0, 0.1) inset;
    overflow: hidden;

    .fold-up-text {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
      line-height: 3rem;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(white 60%, #ddd);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
