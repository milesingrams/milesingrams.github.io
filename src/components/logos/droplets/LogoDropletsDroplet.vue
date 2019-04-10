<template>
    <g>
      <circle class="droplet" :cx="center[0]" :cy="center[1]" :r="r" :fill="color" :fill-opacity="opacity" v-if="!split && cornersInPoly.length" @mouseenter="onMouseEnter"/>
      <logo-droplets-droplet v-if="split" v-for="(corner, index) in corners" :center="corner" :r="r / 2" :depth="depth + 1" :poly="poly" :options="options" :key="index"></logo-droplets-droplet>
    </g>
</template>

<script>
export default {
  name: 'logoDropletsDroplet',
  props: ['center', 'r', 'depth', 'poly', 'options'],
  data () {
    return {
      opacity: 0.5 + Math.random() * 0.5,
      color: `hsl(${Math.random() * 360}, 80%, 65%)`,
      split: false,
      splitTimeout: null
    }
  },
  computed: {
    corners () {
      let halfRad = this.r / 2
  		let corners = [
  			[this.center[0] - halfRad, this.center[1] - halfRad],
  			[this.center[0] + halfRad, this.center[1] - halfRad],
  			[this.center[0] + halfRad, this.center[1] + halfRad],
  			[this.center[0] - halfRad, this.center[1] + halfRad]
  		]
  		return corners
    },
    cornersInPoly () {
      let cornersInPoly = this.corners.filter((corner) => {
        return this.insidePoly(corner)
      })
      return cornersInPoly
    },
    splittable () {
      return this.depth < this.options.maxDepth && this.cornersInPoly.length
    }
  },
  watch: {
    'options.mouseOver' () {
      this.clearSplitTimer()
      this.beginSplitTimer()
    }
  },
  methods: {
    insidePoly (point) {
  		let insidePoly = false
  		for (let i = 0, j = this.poly.length - 1; i < this.poly.length; j = i++) {
  			let xi = this.poly[i][0], yi = this.poly[i][1]
  			let xj = this.poly[j][0], yj = this.poly[j][1]
  			let intersect = ((yi > point[1]) != (yj > point[1])) && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi)
  			if (intersect) insidePoly = !insidePoly
  		}
  		return insidePoly
  	},
    onMouseEnter () {
      if (this.splittable) {
        this.clearSplitTimer()
        this.split = true
      }
    },
    beginSplitTimer () {
      if (this.splittable) {
        let delay = Math.random() * this.options.subdivideSeconds * this.center[0] * 2
        if (this.options.mouseOver) {
          delay *= 10
        }
        this.splitTimeout = setTimeout(() => {
          this.clearSplitTimer()
          this.split = true
        }, delay)
      }
    },
    clearSplitTimer () {
      if (this.splitTimeout) {
        clearTimeout(this.splitTimeout)
        this.splitTimeout = null
      }
    }
  },
  created () {
    this.beginSplitTimer()
  },
  beforeDestroy () {
    this.clearSplitTimer()
  }
}
</script>

<style lang="scss" scoped>
.droplet {
  animation: fadeIn .3s
}
</style>
