<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <clipPath id="logo-clip-path">
        <polygon :points="polyPointString"/>
      </clipPath>
    </defs>
    <g clip-path="url(#logo-clip-path)" ref="parallax">
      <g data-depth="0.1">
        <path class="path" v-for="(path, index) in paths" :d="path.dString" :opacity="path.opacity" :stroke="path.color" :style="{'animation-delay': path.delay}" vector-effect="non-scaling-stroke" :key="index"></path>
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
      paths: [],
      numPaths: 75,
      radius: 75,
      maxDelay: 1.5,
      minOpacity: 0.1
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
      this.paths = []
      for (let i = 0; i < this.numPaths; i++) {
        let startingPoint = this.randomPointPerimeter()
        let endingPoint = this.randomPointPerimeter()
        let dString = `M${startingPoint.join(',')}`
        for (let j = 0; j < 2; j++) {
          let point = this.randomPointInternal()
          dString += ` T${point.join(',')}`
        }
        dString += ` T${endingPoint.join(',')}`
        let path = {
          dString,
          color: `hsl(${Math.random() * 360}, 80%, 65%)`,
          delay: `${Math.random() * this.maxDelay}s`,
          opacity: this.minOpacity + Math.random() * (1 - this.minOpacity)
        }
        this.paths.push(path)
      }
    }
  },
  created () {
    this.generatePaths()
  },
  mounted () {
    new Parallax(this.$refs.parallax)
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
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  animation: dash 3s ease-in-out forwards;
}
</style>
