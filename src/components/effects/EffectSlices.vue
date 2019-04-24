<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g class="slices-wrap" :opacity="mergedOptions.totalOpacity">
      <path class="slice" v-for="(slice, index) in slices" :d="slice.dString" :opacity="slice.opacity" :fill="slice.color" :style="{'transform': `translate3d(${slice.translateX}px, ${slice.translateY}px, 0px) scale(${slice.scale})`}" :key="index"></path>
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
        totalOpacity: 0.8,
        opacity: 0.25,
        numSlices: 25,
        numPointsPerPolygon: 3,
        translateSpread: 1.5,
        maxDelay: 3,
        duration: 0.5,
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
    generate () {
      this.animationTimeline = anime.timeline({
        autoplay: false
      })

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

        for (let j = 0; j < slicePolyArray.length; j++) {
          let slicePoly = slicePolyArray[j]
          let dString = `M${slicePoly[0].join(',')}`
          for (let k = 1; k < slicePoly.length; k++) {
            dString += ` L${slicePoly[k].join(',')}`
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
            translateX: [(startingPoint[0] * this.mergedOptions.translateSpread - 50) / 3, slice.translateX],
            translateY: [(startingPoint[1] * this.mergedOptions.translateSpread - 50) / 3, slice.translateY],
            scale: [1.5, slice.scale],
            easing: 'easeInOutQuad',
            duration: this.mergedOptions.duration * 1000
          }, Math.random() * this.mergedOptions.maxDelay * 1000)

          this.slices.push(slice)
        }
      }
    }
  },
  created () {
    this.generate()
    this.updateSeek()
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

.slices-wrap {
  backface-visibility: hidden;
}

.slice {
  transform-origin: center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
