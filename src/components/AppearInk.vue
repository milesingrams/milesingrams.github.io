<template>
  <div :style="styleObj">
    <svg v-if="running" class="ink-filter-svg" xmlns="http://www.w3.org/2000/svg">
      <filter :id="filterId">
        <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="2" :seed="seed" />
        <feColorMatrix :values="colorMatrixValues" result="texture" />
        <feComposite in="SourceGraphic" in2="texture" operator="in" />
      </filter>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'AppearInk',
  props: ['options'],
  data () {
    return {
      animation: null,
      intersectionObserver: null,
      progress: 0,
      running: false,
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
      return `ink-filter-${this.seed}`
    },
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    },
    colorMatrixValues () {
      return `0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 ${-this.mergedOptions.intensity} ${this.progress * this.mergedOptions.intensity}`
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
  },
  mounted () {
    let observerOptions = {
      threshold: 0.5
    }

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.run()
          this.intersectionObserver.disconnect()
        }
      })
    }, observerOptions)

    this.intersectionObserver.observe(this.$el)
  },
  beforeDestroy () {
    this.intersectionObserver.disconnect()
  }
}
</script>

<style lang="scss" scoped>
.ink-filter-svg {
  position: absolute;
  width: 0;
  height: 0;
  visibility: hidden;
}
</style>
