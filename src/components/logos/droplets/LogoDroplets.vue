<template>
  <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <circle class="droplet" v-for="(droplet, index) in droplets" :cx="droplet.cx" :cy="droplet.cy" :r="droplet.radius" :fill="droplet.color" :fill-opacity="droplet.opacity" :parent="droplet.parent" @mouseenter="onDropletMouseEnter(droplet)" :key="index"></circle>
  </svg>
</template>

<script>
import anime from 'animejs'

export default {
  props: ['poly'],
  data () {
    return {
      droplets: [],
      maxDepth: 5,
      subdivideSeconds: 6,
      slowMo: false
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
    createDroplet (cx, cy, radius, depth, parent) {
      let opacity = 1 - depth * Math.random() * 0.1
      let color = `hsl(${Math.random() * 360}, 80%, ${100 - depth * 6}%)`

      let droplet = {
        cx,
        cy,
        radius,
        depth,
        opacity,
        color,
        splittable: false
      }

      let animation = anime({
        targets: droplet,
        cx: [parent.cx, cx],
        cy: [parent.cy, cy],
        radius: [parent.radius, radius],
        opacity: [parent.opacity, opacity],
        easing: 'easeInQuad',
        duration: 300
      })
      animation.finished.then(() => {
        if (depth < this.maxDepth) {
          droplet.splittable = true
          let delay = Math.random() * this.subdivideSeconds * droplet.cx * 2
          if (this.slowMo) {
            delay *= 2
          }
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
      let cornersInPoly = corners.filter((corner) => {
        return this.insidePoly(corner)
      })
      if (droplet.depth + 1 < this.maxDepth && cornersInPoly.length) {
        corners.forEach((corner) => {
          this.createDroplet(corner[0], corner[1], halfRad, droplet.depth + 1, droplet)
        })
      } else {
        cornersInPoly.forEach((corner) => {
          this.createDroplet(corner[0], corner[1], halfRad, droplet.depth + 1, droplet)
        })
      }

      let animation = anime({
        targets: droplet,
        radius: 0,
        opacity: 0,
        easing: 'easeOutQuad',
        duration: 300
      })
    },
    onDropletMouseEnter (droplet) {
      if (droplet.splittable) {
        clearTimeout(droplet.splitTimeout)
        this.splitDroplet(droplet)
      }
    },
    onMouseEnter () {
      this.slowMo = true
    },
    onMouseLeave () {
      this.slowMo = false
    }
  },
  created () {
    this.createDroplet(50, 50, 50, 0, {
      cx: 50,
      cy: 50,
      radius: 50,
      opacity: 1
    })
  }
}
</script>

<style lang="scss" scoped>
.droplet {
  animation: fadeIn .3s;
  mix-blend-mode: lighten;
}
</style>
