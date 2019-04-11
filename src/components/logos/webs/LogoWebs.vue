<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <clipPath id="logo-clip-path">
        <polygon :points="polyPointString"/>
      </clipPath>
    </defs>
    <rect x="-100" y="-100" width="300" height="300" fill="none" ref="parallaxInput"></rect>
    <g clip-path="url(#logo-clip-path)" ref="parallaxScene">
      <g v-for="(layer, layerIndex) in layers" :data-depth="layer.depth" :key="layerIndex">
        <path class="path" v-for="(path, pathIndex) in layer.paths" :d="path.dString" :opacity="path.opacity" :stroke="path.color" :style="{'animation-delay': path.delay}" vector-effect="non-scaling-stroke" :key="pathIndex"></path>
      </g>
    </g>
  </svg>
</template>

<script>
import Parallax from 'parallax-js'

export default {
  name: 'LogoWebs',
  props: ['poly'],
  data () {
    return {
      layers: [],
      numPathsPerLayer: 8,
      numLayers: 5,
      numInternalPoints: 5,
      minDepth: 0.05,
      maxDepth: 0.2,
      maxDelay: 3,
      radius: 75
    }
  },
  computed: {
    polyPointString () {
      let polyPointString = this.poly.map((point) => {
        return point.join(',')
      }).join(' ')
      return polyPointString
    }
  },
  methods: {
    randomPointPerimeter () {
      let rand = -Math.PI + Math.random() * Math.PI * 2
      let x = Math.floor(50 + this.radius * Math.cos(rand))
      let y = Math.floor(50 + this.radius * Math.sin(rand))
      return [x, y]
    },
    randomPointInternal () {
      let x = Math.random() * 100
      let y = Math.random() * 100
      return [x, y]
    },
    generatePaths () {
      this.layers = []

      for (let i = 0; i < this.numLayers; i++) {
        let layer = {
          depth: this.minDepth + (i / this.numLayers) * (this.maxDepth - this.minDepth),
          paths: []
        }

        for (let j = 0; j < this.numPathsPerLayer; j++) {
          let startingPoint = this.randomPointPerimeter()
          let endingPoint = this.randomPointPerimeter()

          let dString = `M${startingPoint.join(',')}`
          for (let k = 0; k < this.numInternalPoints; k++) {
            let point = this.randomPointInternal()
            dString += ` T${point.join(',')}`
          }
          dString += ` T${endingPoint.join(',')}`

          let path = {
            dString,
            color: `hsl(${Math.random() * 360}, 80%, 65%)`,
            delay: `${Math.random() * this.maxDelay}s`,
            opacity: (i + Math.random()) / this.numLayers
          }

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
    new Parallax(this.$refs.parallaxScene, {
      inputElement: this.$refs.parallaxInput,
      relativeInput: true,
      hoverOnly: true,
      limitX: 75,
      limitY: 75,
      frictionX: 0.05,
      frictionY: 0.05
    })
  }
}
</script>

<style lang="scss" scoped>
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.path {
  fill: none;
  stroke-width: 1;
  stroke-dasharray: 5000;
  stroke-dashoffset: 5000;
  animation: dash 3s ease-in forwards;
}
</style>
