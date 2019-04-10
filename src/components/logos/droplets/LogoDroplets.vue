<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <transition-group appear v-on:enter="onDropletEnter" v-on:leave="onDropletLeave" v-bind:css="false" tag="g">
      <circle class="droplet" v-for="droplet in droplets" :cx="droplet.center[0]" :cy="droplet.center[1]" :r="droplet.radius" :fill="droplet.color" :fill-opacity="droplet.opacity" @mouseenter="onDropletMouseEnter(droplet)" :key="`${droplet.center[0]},${droplet.center[1]}`"></circle>
    </transition-group>
  </svg>
</template>

<script>

export default {
  props: ['poly'],
  data () {
    return {
      droplets: [],
      maxDepth: 5,
      subdivideSeconds: 6
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
    createDroplet (center, radius, depth) {
      let droplet = {
        center,
        radius,
        depth,
        opacity: 0.5 + Math.random() * 0.5,
        color: `hsl(${Math.random() * 360}, 80%, 65%)`
      }

      if (droplet.depth < this.maxDepth) {
        let delay = Math.random() * this.subdivideSeconds * droplet.center[0] * 2
        droplet.splitTimeout = setTimeout(() => {
          this.splitDroplet(droplet)
        }, delay)
      }

      this.droplets.push(droplet)
    },
    splitDroplet (droplet) {
      let halfRad = droplet.radius / 2
  		let corners = [
  			[droplet.center[0] - halfRad, droplet.center[1] - halfRad],
  			[droplet.center[0] + halfRad, droplet.center[1] - halfRad],
  			[droplet.center[0] + halfRad, droplet.center[1] + halfRad],
  			[droplet.center[0] - halfRad, droplet.center[1] + halfRad]
  		]
      let cornersInPoly = corners.filter((corner) => {
        return this.insidePoly(corner)
      })
      if (droplet.depth + 1 < this.maxDepth && cornersInPoly.length) {
        corners.forEach((corner) => {
          this.createDroplet(corner, halfRad, droplet.depth + 1)
        })
      } else {
        cornersInPoly.forEach((corner) => {
          this.createDroplet(corner, halfRad, droplet.depth + 1)
        })
      }
      this.droplets.splice(this.droplets.indexOf(droplet), 1)
    },
    onDropletMouseEnter (droplet) {
      if (droplet.depth < this.maxDepth) {
        clearTimeout(droplet.splitTimeout)
        this.splitDroplet(droplet)
      }
    },
    onDropletEnter (el, done) {
      done()
    },
    onDropletLeave (el, done) {
      done()
    }
  },
  created () {
    this.createDroplet([50, 50], 50, 0)
  }
}
</script>

<style lang="scss" scoped>
.droplet {
  animation: fadeIn .3s
}
</style>
