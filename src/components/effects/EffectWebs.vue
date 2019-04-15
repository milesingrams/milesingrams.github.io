<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs v-if="mergedOptions.poly">
      <clipPath class="effect-clip" id="effect-clip">
        <polygon :points="polyPointString"></polygon>
      </clipPath>
    </defs>
    <g class="paths-wrap" :clip-path="mergedOptions.poly ? 'url(#effect-clip)' : 'none'">
      <path class="path" v-for="(path, index) in paths" :d="path.dString" :stroke="path.color" :stroke-dasharray="path.dashArray" :stroke-dashoffset="path.dashOffset" vector-effect="non-scaling-stroke" :key="index"></path>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'EffectWebs',
  props: ['options'],
  data () {
    return {
      paths: [],
      baseOptions: {
        poly: null,
        color: 'white',
        numPaths: 75,
        numPointsPerPath: 3,
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
  methods: {
    randomPointPerimeter () {
      let rand = -Math.PI + Math.random() * Math.PI * 2
      let x = Math.floor(50 + this.mergedOptions.radius * Math.cos(rand))
      let y = Math.floor(50 + this.mergedOptions.radius * Math.sin(rand))
      return [x, y]
    },
    randomPointInternal () {
      let x = Math.random() * 100
      let y = Math.random() * 100
      return [x, y]
    },
    generatePaths () {
      this.paths = []

      for (let i = 0; i < this.mergedOptions.numPaths; i++) {
        let dString = `M${this.randomPointPerimeter().join(',')}`
        for (let j = 0; j < this.mergedOptions.numPointsPerPath; j++) {
          dString += ` L${this.randomPointPerimeter().join(',')}`
        }

        let path = {
          dString,
          color: this.mergedOptions.color,
          dashArray: 400 * this.mergedOptions.numPointsPerPath,
          dashOffset: 400 * this.mergedOptions.numPointsPerPath
        }

        anime({
          targets: path,
          dashOffset: [path.dashOffset, 0],
          easing: 'easeInQuad',
          duration: this.mergedOptions.duration * 1000,
          delay: Math.random() * this.mergedOptions.maxDelay * 1000
        })

        this.paths.push(path)
      }
    }
  },
  created () {
    this.generatePaths()
  }
}
</script>

<style lang="scss" scoped>
.effect-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  backface-visibility: hidden;
}

.effect-clip {
  transform-origin: center;
}

.paths-wrap {
  backface-visibility: hidden;
}

.path {
  fill: none;
  stroke-width: 1.5;
  backface-visibility: hidden;
}
</style>
