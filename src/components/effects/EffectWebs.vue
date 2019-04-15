<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs v-if="mergedOptions.poly">
      <clipPath class="effect-clip" id="effect-clip">
        <polygon :points="polyPointString"></polygon>
      </clipPath>
    </defs>
    <g class="layers-wrap" :clip-path="mergedOptions.poly ? 'url(#effect-clip)' : 'none'" ref="layersWrap">
      <g class="layer" v-for="(layer, layerIndex) in layers" :data-depth="layer.depth" :key="layerIndex">
        <path class="path" v-for="(path, pathIndex) in layer.paths" :d="path.dString" :opacity="path.opacity" :stroke="path.color" :stroke-dasharray="path.dashArray" :stroke-dashoffset="path.dashOffset" vector-effect="non-scaling-stroke" :key="pathIndex"></path>
      </g>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'
import Parallax from 'parallax-js'

export default {
  name: 'EffectWebs',
  props: ['options'],
  data () {
    return {
      layers: [],
      baseOptions: {
        poly: null,
        interactive: true,
        numPathsPerLayer: 6,
        numLayers: 5,
        numInternalPoints: 5,
        minDepth: 0.25,
        maxDepth: 1,
        maxDelay: 1,
        duration: 4,
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
      this.layers = []

      for (let i = 0; i < this.mergedOptions.numLayers; i++) {
        let layer = {
          depth: this.mergedOptions.minDepth + (i / this.mergedOptions.numLayers) * (this.mergedOptions.maxDepth - this.mergedOptions.minDepth),
          paths: []
        }

        for (let j = 0; j < this.mergedOptions.numPathsPerLayer; j++) {
          let startingPoint = this.randomPointPerimeter()
          let endingPoint = this.randomPointPerimeter()

          let dString = `M${startingPoint.join(',')}`
          for (let k = 0; k < this.mergedOptions.numInternalPoints; k++) {
            let point = this.randomPointInternal()
            dString += ` T${point.join(',')}`
          }
          dString += ` T${endingPoint.join(',')}`

          let path = {
            dString,
            color: `hsl(${Math.random() * 360}, 80%, 70%)`,
            opacity: (i + Math.random()) / this.mergedOptions.numLayers,
            dashArray: this.mergedOptions.numInternalPoints * 1000,
            dashOffset: this.mergedOptions.numInternalPoints * 1000
          }

          anime({
            targets: path,
            dashOffset: [path.dashOffset, 0],
            easing: 'easeInOutQuad',
            duration: this.mergedOptions.duration * 1000,
            delay: Math.random() * this.mergedOptions.maxDelay * 1000
          })

          layer.paths.push(path)
        }

        this.layers.push(layer)
      }
    }
  },
  created () {
    this.generatePaths()
  },
  mounted () {
    if (this.mergedOptions.interactive) {
      new Parallax(this.$refs.layersWrap, {
        relativeInput: true,
        limitX: 10,
        limitY: 10,
        scalarX: 1,
        scalarY: 1,
        frictionX: 0.05,
        frictionY: 0.05
      })
    }
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

.layers-wrap {
  isolation: isolate;
  backface-visibility: hidden;
}

.layer {
  backface-visibility: hidden;
}

.path {
  fill: none;
  stroke-width: 1;
  backface-visibility: hidden;
}
</style>
