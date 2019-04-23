<template>
  <div class="ink-bleed-overlay" v-if="!finished">
    <svg class="invisible" xmlns="http://www.w3.org/2000/svg">
      <filter id="ink-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.0025" numOctaves="4" :seed="seed"/>
        <feColorMatrix :values="colorMatrixValues" result="texture" />
        <feComposite in="SourceGraphic" in2="texture" operator="in" />
      </filter>
    </svg>
    <div class="filter-overlay" :style="{'background-color': this.mergedOptions.color}"></div>
  </div>
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
        intensity: 10
      }
    }
  },
  computed: {
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    },
    colorMatrixValues () {
      return `0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 ${-this.mergedOptions.intensity} ${(1 - this.progress) * this.mergedOptions.intensity}`
    }
  },
  methods: {
    run () {
      this.animation = anime({
        targets: this,
        progress: 1,
        easing: 'easeInOutQuad',
        duration: this.mergedOptions.duration * 1000,
      }, 0)
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
.filter-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  filter: url(#ink-filter);
}
</style>
