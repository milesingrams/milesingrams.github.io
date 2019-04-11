<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect x="-100" y="-100" width="300" height="300" fill="none" ref="parallaxInput"></rect>
    <g ref="parallaxScene">
      <g v-for="(slice, index) in slices" :data-depth="slice.depth" :key="index">
        <path class="slice" :d="slice.dString" :opacity="slice.opacity" :fill="slice.color" :transform="`translate(${slice.translateX} ${slice.translateY})`" vector-effect="non-scaling-stroke"></path>
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
      numPointsPerBool: 3,
      radius: 75,
      minDepth: -0.75,
      maxDepth: 0.75,
      minOpacity: 0.05,
      maxOpacity: 0.3,
      maxDelay: 2.5
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
        let sliceBool = []
        for (let j = 0; j < this.numPointsPerBool; j++) {
          sliceBool.push(this.randomPointPerimeter())
        }
        sliceBool.push(sliceBool[0])

        let sliceIntersection = polygonClipping.intersection([this.poly], [sliceBool])

        let dString = ''
        for (let j = 0; j < sliceIntersection.length; j++) {
          let intersectionPoly = sliceIntersection[j]
          dString += `M${intersectionPoly[0].join(',')}`
          for (let k = 1; k < intersectionPoly.length; k++) {
            dString += ` L${intersectionPoly[k].join(',')}`
          }
        }

        let slice = {
          dString,
          color: `hsl(${Math.random() * 360}, 80%, 65%)`,
          opacity: this.minOpacity + Math.random() * (this.maxOpacity - this.minOpacity),
          depth: this.minDepth + Math.random() * (this.maxDepth - this.minDepth),
          translateX: 0,
          translateY: 0
        }

        let startingPoint = this.randomPointPerimeter()

        let animation = anime({
          targets: slice,
          opacity: [0, slice.opacity],
          translateX: [(startingPoint[0] - 50) / 2, slice.translateX],
          translateY: [(startingPoint[1] - 50) / 2, slice.translateY],
          easing: 'easeInOutQuad',
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
.logo-svg {
  overflow: visible;
}

.slice {
  mix-blend-mode: color-dodge;
  transform-origin: center;
}
</style>
