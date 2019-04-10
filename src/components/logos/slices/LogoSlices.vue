<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g ref="parallax">
      <path class="slice" v-for="(slice, index) in slices" :d="slice.dString" :opacity="slice.opacity" :fill="slice.color" :data-depth="slice.depth" vector-effect="non-scaling-stroke" :key="index"></path>
    </g>
  </svg>
</template>

<script>
import polygonClipping from 'polygon-clipping'
import Parallax from 'parallax-js'

export default {
  name: 'LogoSlices',
  props: ['poly'],
  data () {
    return {
      slices: [],
      numSlices: 20,
      numPointsPerBool: 4,
      radius: 75,
      minDepth: -1,
      maxDepth: 1,
      minOpacity: 0.1,
      maxOpacity: 0.3,
      maxDelay: 3,
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
          delay: `${Math.random() * this.maxDelay}s`,
          opacity: this.minOpacity + Math.random() * (this.maxOpacity - this.minOpacity),
          depth: this.minDepth + Math.random() * (this.maxDepth - this.minDepth)
        }
        this.slices.push(slice)
      }
    }
  },
  created () {
    this.generateSlices()
  },
  mounted () {
    new Parallax(this.$refs.parallax)
  }
}
</script>

<style lang="scss" scoped>
.logo-svg {
  overflow: visible;
}

.slice {
  mix-blend-mode: color-dodge;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
