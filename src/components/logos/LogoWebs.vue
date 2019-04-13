<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs v-if="poly">
      <clipPath class="logo-clip" id="logo-clip">
        <polygon :points="polyPointString"></polygon>
      </clipPath>
    </defs>
    <g :clip-path="poly ? 'url(#logo-clip)' : 'none'" ref="parallaxScene">
      <g v-for="(layer, layerIndex) in layers" :data-depth="layer.depth" :key="layerIndex">
        <path class="path" v-for="(path, pathIndex) in layer.paths" :d="path.dString" :opacity="path.opacity" :stroke="path.color" :stroke-dasharray="path.dashArray" :stroke-dashoffset="path.dashOffset" vector-effect="non-scaling-stroke" :key="pathIndex"></path>
      </g>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'
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
      duration: 3,
    }
  },
  computed: {
    radius () {
      return this.poly ? 75 : 50
    },
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
            opacity: (i + Math.random()) / this.numLayers,
            dashArray: this.numInternalPoints * 1000,
            dashOffset: this.numInternalPoints * 1000
          }

          anime({
            targets: path,
            dashOffset: [path.dashOffset, 0],
            easing: 'easeInOutQuad',
            duration: this.duration * 1000,
            delay: Math.random() * this.maxDelay * 1000
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
    new Parallax(this.$refs.parallaxScene, {
      relativeInput: true,
      limitX: 50,
      limitY: 50,
      frictionX: 0.05,
      frictionY: 0.05
    })
  }
}
</script>

<style lang="scss" scoped>
.logo-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.logo-clip {
  transform-origin: center;
  animation: shrink 5s var(--ease-in-out-quad) forwards;
}

.path {
  fill: none;
  stroke-width: 1;
}

@keyframes shrink {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
</style>
