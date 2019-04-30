<template>
  <svg v-if="!finished" class="invisible" xmlns="http://www.w3.org/2000/svg">
    <filter :id="filterId">
      <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" :seed="seed" />
      <feColorMatrix :values="colorMatrixValues" result="texture" />
      <feComposite in="SourceGraphic" in2="texture" operator="in" />
    </filter>
  </svg>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'InkFilter',
  props: ['id', 'trigger', 'options'],
  data () {
    return {
      animation: null,
      progress: 0,
      finished: false,
      seed: Math.floor(Math.random() * 9999),
      baseOptions: {
        duration: 2,
        intensity: 10
      }
    }
  },
  computed: {
    filterId () {
      return `${this.id}-filter`
    },
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
    let watcher = this.$watch('trigger', () => {
      if (this.trigger) {
        this.run()
        watcher()
      }
    }, { immediate: true })
  }
}
</script>

<style lang="scss" scoped>
</style>
