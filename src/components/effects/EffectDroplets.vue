<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g class="droplets-wrap">
      <circle class="droplet" v-for="(droplet, index) in droplets" :cx="droplet.cx" :cy="droplet.cy" :r="droplet.radius" :fill="droplet.color" :key="index"></circle>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'EffectDroplets',
  props: ['options'],
  data () {
    return {
      droplets: [],
      baseOptions: {
        poly: null,
        color: 'white',
        maxDepth: 4,
        maxDelay: 1,
        radius: 50
      }
    }
  },
  computed: {
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    }
  },
  methods: {
    insidePoly (point) {
  		let insidePoly = false
  		for (let i = 0, j = this.mergedOptions.poly.length - 1; i < this.mergedOptions.poly.length; j = i++) {
  			let xi = this.mergedOptions.poly[i][0], yi = this.mergedOptions.poly[i][1]
  			let xj = this.mergedOptions.poly[j][0], yj = this.mergedOptions.poly[j][1]
  			let intersect = ((yi > point[1]) != (yj > point[1])) && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi)
  			if (intersect) insidePoly = !insidePoly
  		}
  		return insidePoly
  	},
    insideCircle (point) {
      let centerDistance = Math.sqrt(Math.pow(point[0] - 50, 2) + Math.pow(point[1] - 50, 2))
      let insideCircle = centerDistance < this.mergedOptions.radius
      return insideCircle
    },
    createDroplet (cx, cy, radius, depth) {
      let droplet = {
        cx,
        cy,
        radius,
        depth,
        color: Math.round(Math.random()) ? this.mergedOptions.color : 'transparent'
      }

      let animation = anime({
        targets: droplet,
        radius: [0, radius],
        easing: 'easeInQuad',
        duration: 300
      })

      animation.finished.then(() => {
        if (depth < this.mergedOptions.maxDepth) {
          let delay = Math.random() * (this.mergedOptions.maxDelay * 1000) * (droplet.cx / 100)
          droplet.splitTimeout = setTimeout(() => {
            this.splitDroplet(droplet)
          }, delay)
        }
      })

      this.droplets.push(droplet)
    },
    splitDroplet (droplet) {
      let halfRad = droplet.radius / 2
  		let corners = [
  			[droplet.cx - halfRad, droplet.cy - halfRad],
  			[droplet.cx + halfRad, droplet.cy - halfRad],
  			[droplet.cx + halfRad, droplet.cy + halfRad],
  			[droplet.cx - halfRad, droplet.cy + halfRad]
  		]

      let allowedCorners
      if (this.mergedOptions.poly) {
        allowedCorners = corners.filter((corner) => {
          return this.insidePoly(corner)
        })
      } else {
        allowedCorners = corners.filter((corner) => {
          return this.insideCircle(corner)
        })
      }

      if (droplet.depth + 1 < this.mergedOptions.maxDepth && allowedCorners.length) {
        corners.forEach((corner) => {
          this.createDroplet(corner[0], corner[1], halfRad, droplet.depth + 1, droplet)
        })
      } else {
        allowedCorners.forEach((corner) => {
          this.createDroplet(corner[0], corner[1], halfRad, droplet.depth + 1, droplet)
        })
      }

      anime({
        targets: droplet,
        radius: 0,
        easing: 'easeOutQuad',
        duration: 300
      })
    }
  },
  created () {
    this.createDroplet(25, 25, this.mergedOptions.radius / 2, 0)
    this.createDroplet(75, 25, this.mergedOptions.radius / 2, 0)
    this.createDroplet(75, 75, this.mergedOptions.radius / 2, 0)
    this.createDroplet(25, 75, this.mergedOptions.radius / 2, 0)
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

.droplets-wrap {
  backface-visibility: hidden;
}

.droplet {
  backface-visibility: hidden;
}
</style>
