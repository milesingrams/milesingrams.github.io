<template>
  <div :style="styleObj">
    <svg v-if="running" class="filter-svg" xmlns="http://www.w3.org/2000/svg">
      <filter :id="filterId">
        <feTurbulence type="fractalNoise" :baseFrequency="mergedOptions.frequency" numOctaves="2" :seed="seed" />
        <feColorMatrix :values="colorMatrixValues" result="texture" />
        <feComposite in="SourceGraphic" in2="texture" operator="in" />
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
        frequency: 0.005,
        sharpness: 20
      }
    }
  },
  computed: {
    filterId () {
      return `ink-filter-${this.seed}`
    },
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    },
    colorMatrixValues () {
      return `0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 ${-this.mergedOptions.sharpness} ${this.progress * this.mergedOptions.sharpness}`
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
