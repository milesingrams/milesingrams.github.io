<template>
  <svg v-if="!finished" class="invisible" xmlns="http://www.w3.org/2000/svg">
    <filter :id="inkFilterId">
      <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" :seed="seed"/>
      <feColorMatrix :values="colorMatrixValues" result="texture" />
      <feComposite in="SourceGraphic" in2="texture" operator="in" />
    </filter>
  </svg>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'InkBleedOverlay',
  props: ['options'],
  data () {
    return {
      animation: null,
      progress: 0,
      finished: false,
      seed: Math.floor(Math.random() * 100),
      baseOptions: {
        color: '#ffffff',
        duration: 2,
        intensity: 20
      }
    }
  },
  computed: {
    inkFilterId () {
      return `ink-filter-${this.seed}`
    }
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    },
    colorMatrixValues () {
      return `0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 ${-this.mergedOptions.intensity} ${this.progress * this.mergedOptions.intensity}`
    }
  },
  methods: {
    run () {
      this.animation = anime({
        targets: this,
        progress: 1,
        easing: 'easeInOutQuad',
        duration: this.mergedOptions.duration * 1000,
      })
      this.animation.finished.then(() => {
        this.finished = true
      })
    }
  },
  mounted () {
    if (process.isClient) {
      this.run()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
