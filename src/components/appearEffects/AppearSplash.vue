<template>
  <div :style="styleObj">
    <svg v-if="running" class="filter-svg" xmlns="http://www.w3.org/2000/svg">
      <filter :id="filterId">
        <feTurbulence type="fractalNoise" :baseFrequency="mergedOptions.frequency" numOctaves="2" :seed="seed" result="turbulence"/>
        <feDisplacementMap in2="turbulence" in="SourceGraphic" :scale="scaleValue"/>
      </filter>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
import anime from 'animejs'
import RunOnVisible from '~/mixins/RunOnVisible'

export default {
  name: 'AppearInk',
  props: ['options'],
  mixins: [RunOnVisible],
  data () {
    return {
      animation: null,
      progress: 0,
      running: false,
      finished: false,
      seed: Math.floor(Math.random() * 9999),
      baseOptions: {
        duration: 2,
        frequency: 0.1,
        scale: 50,
      }
    }
  },
  computed: {
    filterId () {
      return `splash-filter-${this.seed}`
    },
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    },
    scaleValue () {
      return (1 - this.progress) * this.mergedOptions.scale
    },
    styleObj () {
      if (this.running) {
        return {
          filter: `url(#${this.filterId})`
        }
      }
      if (!this.finished) {
        return {
          opacity: 0
        }
      }
    }
  },
  methods: {
    async run () {
      this.running = true
      this.animation = anime({
        targets: this,
        progress: 1,
        easing: 'easeInOutQuad',
        duration: this.mergedOptions.duration * 1000,
        loop: true,
      })
      await this.animation.finished
      this.running = false
      this.finished = true
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-svg {
  position: absolute;
  width: 0;
  height: 0;
  visibility: hidden;
}
</style>
