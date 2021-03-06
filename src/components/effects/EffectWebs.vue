<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs v-if="mergedOptions.poly">
      <mask class="effect-mask" id="effect-mask">
        <circle class="mask-circle" cx="50" cy="50" :r="mergedOptions.radius"></circle>
        <g class="paths-wrap">
          <path class="path" v-for="(path, index) in paths" :d="path.dString" :opacity="path.opacity" :stroke-width="path.strokeWidth" :stroke-dasharray="path.dashArray" :stroke-dashoffset="path.dashOffset" vector-effect="non-scaling-stroke" :key="index"></path>
        </g>
      </mask>
    </defs>

    <g class="poly-wrap" mask="url(#effect-mask)">
      <polygon v-if="mergedOptions.poly" :points="polyPointString" :fill="mergedOptions.color" :opacity="totalOpacity"></polygon>
      <circle v-if="!mergedOptions.poly" cx="50" cy="50" :r="mergedOptions.radius" :fill="mergedOptions.color" :opacity="totalOpacity"></circle>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'EffectWebs',
  props: ['progress', 'options'],
  data () {
    return {
      paths: [],
      animationTimeline: null,
      totalOpacity: 0,
      baseOptions: {
        poly: null,
        color: 'white',
        totalOpacity: 1,
        strokeOpacity: 0.8,
        minStrokeWidth: 3,
        maxStrokeWidth: 6,
        numPaths: 50,
        numPointsPerPath: 10,
        maxDelay: 2,
        duration: 1,
        radius: 75
      }
    }
  },
  computed: {
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    },
    polyPointString () {
      let polyPointString = this.mergedOptions.poly.map((point) => {
        return point.join(',')
      }).join(' ')
      return polyPointString
    }
  },
  watch: {
    'progress' () {
      this.updateSeek()
    }
  },
  methods: {
    updateSeek () {
      this.animationTimeline.seek(this.progress * this.animationTimeline.duration * 0.9)
    },
    randomPointPerimeter () {
      let rand = -Math.PI + Math.random() * Math.PI * 2
      let x = Math.floor(50 + this.mergedOptions.radius * Math.cos(rand))
      let y = Math.floor(50 + this.mergedOptions.radius * Math.sin(rand))
      return [x, y]
    },
    generate () {
      this.animationTimeline = anime.timeline({
        autoplay: false
      })

      this.paths = []
      for (let i = 0; i < this.mergedOptions.numPaths; i++) {
        let dString = `M${this.randomPointPerimeter().join(',')}`
        for (let j = 0; j < this.mergedOptions.numPointsPerPath; j++) {
          dString += ` L${this.randomPointPerimeter().join(',')}`
        }

        let path = {
          dString,
          color: this.mergedOptions.color,
          opacity: this.mergedOptions.strokeOpacity,
          dashArray: 500 * this.mergedOptions.numPointsPerPath,
          strokeWidth: this.mergedOptions.maxStrokeWidth,
          dashOffset: 0
        }

        this.animationTimeline.add({
          targets: path,
          strokeWidth: this.mergedOptions.minStrokeWidth,
          dashOffset: 500 * this.mergedOptions.numPointsPerPath,
          easing: 'easeInOutQuad',
          duration: this.mergedOptions.duration * 1000
        }, Math.random() * this.mergedOptions.maxDelay * 1000)

        this.paths.push(path)
      }

      this.totalOpacity = 0
      this.animationTimeline.add({
        targets: this,
        totalOpacity: this.mergedOptions.totalOpacity,
        easing: 'easeInOutQuad',
        duration: this.animationTimeline.duration * 0.66
      }, 0)
    }
  },
  created () {
    this.generate()
    this.updateSeek()
  }
}
</script>

<style lang="scss" scoped>
.effect-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.mask-circle {
  fill: white;
}

.path {
  fill: none;
  stroke: black;
  stroke-linecap: round;
}
</style>
