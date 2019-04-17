<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g class="droplets-wrap">
      <circle class="droplet" v-for="(droplet, index) in droplets" :cx="droplet.cx" :cy="droplet.cy" :r="droplet.radius" :fill="droplet.color" :opacity="droplet.opacity" :key="index"></circle>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'EffectDroplets',
  props: ['progress', 'options'],
  data () {
    return {
      droplets: [],
      animationTimeline: null,
      baseOptions: {
        poly: null,
        color: 'white',
        minOpacity: 0.4,
        maxOpacity: 0.6,
        maxDepth: 4,
        maxDelay: 1,
        duration: 0.1,
        radius: 50,
      }
    }
  },
  computed: {
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
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
    insidePoly (point) {
  		let insidePoly = false
  		for (let i = 0, j = this.mergedOptions.poly.length - 1; i < this.mergedOptions.poly.length; j = i++) {
  			let xi = this.mergedOptions.poly[i][0]
        let yi = this.mergedOptions.poly[i][1]
  			let xj = this.mergedOptions.poly[j][0]
        let yj = this.mergedOptions.poly[j][1]
  			let intersect = ((yi > point[1]) !== (yj > point[1])) && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi)
  			if (intersect) insidePoly = !insidePoly
  		}
  		return insidePoly
  	},
    getCorners (droplet, radius) {
      return [
        [droplet.cx - radius, droplet.cy - radius],
        [droplet.cx + radius, droplet.cy - radius],
        [droplet.cx + radius, droplet.cy + radius],
        [droplet.cx - radius, droplet.cy + radius]
      ]
    },
    createDroplet (cx, cy, radius, opacity, depth, startOffset) {
      let droplet = {
        cx,
        cy,
        radius,
        opacity: 0,
        depth,
        color: this.mergedOptions.color
      }

      if (depth === this.mergedOptions.maxDepth) {
        if (this.insidePoly([cx, cy])) {
          let newOpacity = this.mergedOptions.minOpacity + Math.random() * (this.mergedOptions.maxOpacity - this.mergedOptions.minOpacity)
          this.droplets.push(droplet)

          this.animationTimeline.add({
            targets: droplet,
            opacity: [0, newOpacity],
            easing: 'easeInQuad',
            duration: this.mergedOptions.duration * 1000
          }, startOffset)
        }
      } else {
        this.droplets.push(droplet)

        this.animationTimeline.add({
          targets: droplet,
          opacity: [0, opacity],
          easing: 'easeInQuad',
          duration: this.mergedOptions.duration * 1000
        }, startOffset)

        let delay = startOffset + (this.mergedOptions.duration + Math.random() * this.mergedOptions.maxDelay) * 1000

        this.animationTimeline.add({
          targets: droplet,
          opacity: 0,
          easing: 'easeOutQuad',
          duration: this.mergedOptions.duration * 1000
        }, delay)

        let halfRad = radius / 2
    		let corners = this.getCorners(droplet, halfRad)

        let cornersInM = 0
        for (let i = 0; i < corners.length; i++) {
          if (this.insidePoly(corners[i])) {
            cornersInM++
          }
        }
        if (cornersInM) {
          for (let i = 0; i < corners.length; i++) {
            let corner = corners[i]
            let opacity = this.mergedOptions.minOpacity + (cornersInM / 4) * (this.mergedOptions.maxOpacity - this.mergedOptions.minOpacity)
            this.createDroplet(corner[0], corner[1], halfRad, opacity, depth + 1, delay)
          }
        }
      }
    },
    generate () {
      this.animationTimeline = anime.timeline({
        autoplay: false
      })
      this.createDroplet(50, 50, this.mergedOptions.radius, 0.5, 0, 0)
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
}
</style>
