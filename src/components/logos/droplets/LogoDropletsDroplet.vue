<template>
    <g>
      <circle class="droplet" :cx="cx" :cy="cy" :r="r" :opacity="opacity" v-if="!split && cornersInPoly" @mouseenter="onMouseEnter"/>
      <logo-droplets-droplet v-if="split" v-for="corner in corners" :cx="corner.cx" :cy="corner.cy" :r="r / 2" :opacity="cornersInPoly / 4" :depth="depth + 1" :options="options" :key="`${corner.cx}_${corner.cy}`"></logo-droplets-droplet>
    </g>
</template>

<script>
export default {
  name: 'logoDropletsDroplet',
  props: ['cx', 'cy', 'r', 'opacity', 'depth', 'options'],
  data () {
    return {
      split: false,
      splitTimeout: null
    }
  },
  computed: {
    corners () {
      let halfRad = this.r / 2
  		let corners = [
  			{
          cx: this.cx - halfRad,
          cy: this.cy - halfRad
        },
  			{
          cx: this.cx + halfRad,
          cy: this.cy - halfRad
        },
  			{
          cx: this.cx + halfRad,
          cy: this.cy + halfRad
        },
  			{
          cx: this.cx - halfRad,
          cy: this.cy + halfRad
        }
  		]
  		return corners
    },
    cornersInPoly () {
      let cornersInPoly = 0
      this.corners.forEach((corner) => {
        if (this.insidePoly(corner)) {
          cornersInPoly++
        }
      })
      return cornersInPoly
    },
    splittable () {
      return this.depth < this.options.maxDepth && this.cornersInPoly
    }
  },
  watch: {
    'options.mouseControl' () {
      this.clearSplitTimer()
      if (!this.options.mouseControl) {
        this.beginSplitTimer()
      }
    }
  },
  methods: {
    insidePoly (circle) {
  		let insidePoly = false
  		for (let i = 0, j = this.options.poly.length - 1; i < this.options.poly.length; j = i++) {
  			let xi = this.options.poly[i][0], yi = this.options.poly[i][1]
  			let xj = this.options.poly[j][0], yj = this.options.poly[j][1]
  			let intersect = ((yi > circle.cy) != (yj > circle.cy)) && (circle.cx < (xj - xi) * (circle.cy - yi) / (yj - yi) + xi)
  			if (intersect) insidePoly = !insidePoly
  		}
  		return insidePoly
  	},
    onMouseEnter () {
      if (this.splittable) {
        if (this.options.mouseControl) {
          this.split = true
        }
      }
    },
    beginSplitTimer () {
      if (this.splittable && !this.options.mouseControl) {
        this.splitTimeout = setTimeout(() => {
          this.split = true
        }, Math.random() * this.options.subdivideSeconds * this.cx * 10)
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
  fill: #ed2332;
  animation: fadeIn .3s
}
</style>
