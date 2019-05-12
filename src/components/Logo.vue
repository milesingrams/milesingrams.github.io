<template>
  <div class="logo" v-show="progress" :class="{'pointer-events': atPageTop}" @click="onLogoClick">
    <client-only>
      <transition appear name="fadeInOut" mode="out-in">
        <component :is="effect" :progress="progress" :options="{ poly, color }"></component>
      </transition>
    </client-only>
    <transition name="fadeInOut">
      <div class="click-me" v-if="atPageTop && !logoClicked">
        <div class="pulse"></div>
        <icon-pointer class="icon pointer-icon"></icon-pointer>
      </div>
    </transition>
  </div>
</template>

<script>
import EffectDroplets from '~/components/effects/EffectDroplets'
import EffectGradient from '~/components/effects/EffectGradient'
import EffectSlices from '~/components/effects/EffectSlices'
import EffectWebs from '~/components/effects/EffectWebs'
import IconPointer from '~/assets/icons/IconPointer.svg'
import anime from 'animejs'

export default {
  name: 'Logo',
  props: ['color'],
  components: {
    EffectDroplets,
    EffectGradient,
    EffectSlices,
    EffectWebs,
    IconPointer
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

      if (this.animationReverse) {
        this.animationProgress = 1
      } else {
        this.animationProgress = 0
      }
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
  .pointer-icon {
    color: #aaa;
    position: absolute;
    width: 18%;
    height: 18%;
    left: 50%;
    top: 88%;
    transform: translateX(-33%);
    opacity: 0;
    animation: clickMePointer 1.5s var(--ease-in-out-quad) 3.5s forwards;
  }

  .pulse {
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    top: 88%;
    background: radial-gradient(transparent 25%, rgba(0, 0, 0, 0.5));
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: clickMePulse 1s var(--ease-out-quad) 3.9s forwards;
  }
}

@keyframes clickMePointer {
  0% {
    top: 92%;
    opacity: 0;
  }

  33% {
    top: 88%;
    opacity: 1;
  }

  66% {
    top: 92%;
    opacity: 1;
  }

  100% {
    top: 92%;
    opacity: 0;
  }
}

@keyframes clickMePulse {
  from {
    opacity: 1;
    width: 0;
    height: 0;
  }

  to {
    opacity: 0;
    width: 22%;
    height: 22%;
  }
}

</style>
