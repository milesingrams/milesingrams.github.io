<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g class="layers-wrap" ref="layersWrap">
      <g class="slice-wrap" v-for="(slice, index) in slices" :data-depth="slice.depth" :key="index">
        <path class="slice" :d="slice.dString" :opacity="slice.opacity" :fill="slice.color" :style="{transform: `translate3d(${slice.translateX}px, ${slice.translateY}px, 0px) scale(${slice.scale})`}"></path>
      </g>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'
import Parallax from 'parallax-js'
import polygonClipping from 'polygon-clipping'

export default {
  name: 'EffectSlices',
  props: ['options'],
  data () {
    return {
      slices: [],
      baseOptions: {
        poly: null,
        interactive: true,
        numSlices: 24,
        numPointsPerPolygon: 3,
        minDepth: -3,
        maxDepth: 3,
        opacity: 0.25,
        maxDelay: 2
      }
    }
  },
  computed: {
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    },
    radius () {
      return this.mergedOptions.poly ? 75 : 50
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
      let x = Math.floor(50 + this.radius * Math.cos(rand))
      let y = Math.floor(50 + this.radius * Math.sin(rand))
      return [x, y]
    },
    generateSlices () {
      this.slices = []

      for (let i = 0; i < this.mergedOptions.numSlices; i++) {
        let polygon = []
        for (let j = 0; j < this.mergedOptions.numPointsPerPolygon; j++) {
          polygon.push(this.randomPointPerimeter())
        }
        polygon.push(polygon[0])

        let slicePolyArray
        if (this.mergedOptions.poly) {
          slicePolyArray = polygonClipping.intersection([this.mergedOptions.poly], [polygon])
        } else {
          slicePolyArray = [polygon]
        }

        let dString = ''
        for (let j = 0; j < slicePolyArray.length; j++) {
          let slicePoly = slicePolyArray[j]
          dString += `M${slicePoly[0].join(',')}`
          for (let k = 1; k < slicePoly.length; k++) {
            dString += ` L${slicePoly[k].join(',')}`
          }
        }

        let slice = {
          dString,
          color: `hsl(${Math.random() * 360}, 80%, 65%)`,
          opacity: this.mergedOptions.opacity,
          depth: this.mergedOptions.minDepth + Math.random() * (this.mergedOptions.maxDepth - this.mergedOptions.minDepth),
          translateX: 0,
          translateY: 0,
          scale: 1
        }

        let startingPoint = this.randomPointPerimeter()

        anime({
          targets: slice,
          opacity: [0, slice.opacity],
          translateX: [(startingPoint[0] - 50) / 3, slice.translateX],
          translateY: [(startingPoint[1] - 50) / 3, slice.translateY],
          scale: [1.5, slice.scale],
          easing: 'easeOutQuad',
          duration: 1000,
          delay: Math.random() * this.mergedOptions.maxDelay * 1000
        })

        this.slices.push(slice)
      }
    }
  },
  created () {
    this.generateSlices()
  },
  mounted () {
    if (this.mergedOptions.interactive) {
      new Parallax(this.$refs.layersWrap, {
        relativeInput: true,
        limitX: 10,
        limitY: 0,
        scalarX: 1,
        frictionX: 0.05
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

.layers-wrap {
  isolation: isolate;
  backface-visibility: hidden;
}

.slice-wrap {
  backface-visibility: hidden;
}

.slice {
  mix-blend-mode: overlay;
  transform-origin: center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
