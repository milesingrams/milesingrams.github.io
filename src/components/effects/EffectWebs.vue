<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs v-if="mergedOptions.poly">
      <clipPath class="effect-clip" id="effect-clip">
        <polygon :points="polyPointString"></polygon>
      </clipPath>
    </defs>
    <g class="paths-wrap" :clip-path="mergedOptions.poly ? 'url(#effect-clip)' : 'none'">
      <path class="path" v-for="(path, index) in paths" :d="path.dString" :stroke="path.color" :opacity="path.opacity" :stroke-width="path.strokeWidth" :stroke-dasharray="path.dashArray" :stroke-dashoffset="path.dashOffset" vector-effect="non-scaling-stroke" :key="index"></path>
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

        let depth = Math.random()

        let path = {
          dString,
          color: this.mergedOptions.color,
          opacity: 0.2 + depth * 0.6,
          strokeWidth: 1 + depth,
          dashArray: 400 * this.mergedOptions.numPointsPerPath,
          dashOffset: 400 * this.mergedOptions.numPointsPerPath
        }

        this.animationTimeline.add({
          targets: path,
          dashOffset: [path.dashOffset, 0],
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
    this.generatePaths()
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

.effect-clip {
  transform-origin: center;
}

.paths-wrap {
}

.path {
  fill: none;
}
</style>
