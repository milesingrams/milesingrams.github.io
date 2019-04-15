<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g class="slice-wrap">
      <path class="slice" v-for="(slice, index) in slices" :d="slice.dString" :opacity="slice.opacity" :fill="slice.color" :style="{transform: `translate3d(${slice.translateX}px, ${slice.translateY}px, 0px) scale(${slice.scale})`}" :key="index"></path>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'
import polygonClipping from 'polygon-clipping'

export default {
  name: 'EffectSlices',
  props: ['progress', 'options'],
  data () {
    return {
      slices: [],
      animationTimeline: null,
      baseOptions: {
        poly: null,
        color: 'white',
        numSlices: 15,
        numPointsPerPolygon: 3,
        opacity: 0.25,
        duration: 1,
        maxDelay: 2,
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
      this.animationTimeline.seek(this.progress * this.animationTimeline.duration)
    }
  },
  methods: {
    randomPointPerimeter () {
      let rand = -Math.PI + Math.random() * Math.PI * 2
      let x = Math.floor(50 + this.mergedOptions.radius * Math.cos(rand))
      let y = Math.floor(50 + this.mergedOptions.radius * Math.sin(rand))
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
          color: this.mergedOptions.color,
          opacity: this.mergedOptions.opacity,
          translateX: 0,
          translateY: 0,
          scale: 1
        }

        let startingPoint = this.randomPointPerimeter()

        this.animationTimeline.add({
          targets: slice,
          opacity: [0, slice.opacity],
          translateX: [(startingPoint[0] - 50) / 3, slice.translateX],
          translateY: [(startingPoint[1] - 50) / 3, slice.translateY],
          scale: [1.5, slice.scale],
          duration: this.mergedOptions.duration * 1000,
        }, Math.random() * this.mergedOptions.maxDelay * 1000)

        this.slices.push(slice)
      }
    }
  },
  created () {
    this.animationTimeline = anime.timeline({
      autoplay: false,
      easing: 'easeOutQuad'
    })
    this.generateSlices()
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

.slice-wrap {
  backface-visibility: hidden;
}

.slice {
  transform-origin: center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
