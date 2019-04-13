<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g ref="parallaxScene">
      <g v-for="(slice, index) in slices" :data-depth="slice.depth" :key="index">
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
  name: 'LogoSlices',
  props: ['poly'],
  data () {
    return {
      slices: [],
      numSlices: 20,
      numPointsPerPolygon: 3,
      radius: 75,
      minDepth: -0.75,
      maxDepth: 0.75,
      minOpacity: 0.1,
      maxOpacity: 0.3,
      maxDelay: 2
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
    generateSlices () {
      this.slices = []

      for (let i = 0; i < this.numSlices; i++) {
        let polygon = []
        for (let j = 0; j < this.numPointsPerPolygon; j++) {
          polygon.push(this.randomPointPerimeter())
        }
        polygon.push(polygon[0])

        let slicePolyArray
        if (this.poly) {
          slicePolyArray = polygonClipping.intersection([this.poly], [polygon])
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
          opacity: this.minOpacity + Math.random() * (this.maxOpacity - this.minOpacity),
          depth: this.minDepth + Math.random() * (this.maxDepth - this.minDepth),
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
          delay: Math.random() * this.maxDelay * 1000
        })

        this.slices.push(slice)
      }
    }
  },
  created () {
    this.generateSlices()
  },
  mounted () {
    new Parallax(this.$refs.parallaxScene, {
      relativeInput: true,
      limitX: 30,
      limitY: 30,
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

.slice {
  mix-blend-mode: color-dodge;
  transform-origin: center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
