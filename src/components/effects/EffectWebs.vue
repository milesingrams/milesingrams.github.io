<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs v-if="mergedOptions.poly">
      <mask class="effect-mask" id="effect-mask">
        <circle cx="50" cy="50" :r="mergedOptions.radius" fill="white"></circle>
        <path class="path" v-for="(path, index) in paths" :d="path.dString" stroke="black" :opacity="path.opacity" :stroke-width="path.strokeWidth" :stroke-dasharray="path.dashArray" :stroke-dashoffset="path.dashOffset" vector-effect="non-scaling-stroke" :key="index"></path>
      </mask>
    </defs>

    <g class="poly-wrap" mask="url(#effect-mask)">
      <polygon v-if="mergedOptions.poly" :points="polyPointString" :fill="mergedOptions.color" :opacity="mergedOptions.fillOpacity"></polygon>
      <circle v-if="!mergedOptions.poly" cx="50" cy="50" :r="mergedOptions.radius" :fill="mergedOptions.color" :opacity="mergedOptions.fillOpacity"></circle>
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
      baseOptions: {
        poly: null,
        color: 'white',
        fillOpacity: 0.5,
        minOpacity: 0.5,
        maxOpacity: 1,
        minStrokeWidth: 1,
        maxStrokeWidth: 8,
        numPaths: 60,
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
      this.animationTimeline.seek(this.progress * this.animationTimeline.duration)
    },
    randomPointPerimeter () {
      let rand = -Math.PI + Math.random() * Math.PI * 2
      let x = Math.floor(50 + this.mergedOptions.radius * Math.cos(rand))
      let y = Math.floor(50 + this.mergedOptions.radius * Math.sin(rand))
      return [x, y]
    },
    generate () {
      this.paths = []

      for (let i = 0; i < this.mergedOptions.numPaths; i++) {
        let dString = `M${this.randomPointPerimeter().join(',')}`
        for (let j = 0; j < this.mergedOptions.numPointsPerPath; j++) {
          dString += ` L${this.randomPointPerimeter().join(',')}`
        }

        let path = {
          dString,
          color: this.mergedOptions.color,
          opacity: this.mergedOptions.minOpacity + Math.random() * (this.mergedOptions.maxOpacity - this.mergedOptions.minOpacity),
          strokeWidth: this.mergedOptions.maxStrokeWidth,
          dashArray: 400 * this.mergedOptions.numPointsPerPath,
          dashOffset: 0
        }

        this.animationTimeline.add({
          targets: path,
          dashOffset: 400 * this.mergedOptions.numPointsPerPath,
          strokeWidth: this.mergedOptions.minStrokeWidth,
          duration: this.mergedOptions.duration * 1000
        }, Math.random() * this.mergedOptions.maxDelay * 1000)

        this.paths.push(path)
      }
    }
  },
  created () {
    this.animationTimeline = anime.timeline({
      autoplay: false,
      easing: 'easeInQuad'
    })
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

.path {
  fill: none;
  stroke-linecap: round;
}
</style>
