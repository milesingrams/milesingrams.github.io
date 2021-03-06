<template>
  <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g class="droplets-wrap" :opacity="totalOpacity">
      <circle class="droplet" v-for="(droplet, index) in droplets" :cx="droplet.cx" :cy="droplet.cy" :r="droplet.radius" :fill="droplet.color" :opacity="droplet.opacity" :key="index"></circle>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs'
import insidePoly from 'robust-point-in-polygon'

export default {
  name: 'EffectDroplets',
  props: ['progress', 'options'],
  data () {
    return {
      droplets: [],
      animationTimeline: null,
      totalOpacity: 0,
      baseOptions: {
        poly: null,
        color: 'white',
        totalOpacity: 1,
        minDropOpacity: 0.6,
        maxDropOpacity: 1,
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
    inside (point) {
      if (this.mergedOptions.poly) {
        return insidePoly(this.mergedOptions.poly, point) < 1
      } else {
        return false
      }
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
        if (this.inside([cx, cy])) {
          let newOpacity = this.mergedOptions.minDropOpacity + Math.random() * (this.mergedOptions.maxDropOpacity - this.mergedOptions.minDropOpacity)
          this.droplets.push(droplet)

          this.animationTimeline.add({
            targets: droplet,
            opacity: [0, newOpacity],
            easing: 'easeInOutQuad',
            duration: this.mergedOptions.duration * 1000
          }, startOffset)
        }
      } else {
        this.droplets.push(droplet)

        this.animationTimeline.add({
          targets: droplet,
          opacity: [0, opacity],
          easing: 'easeInOutQuad',
          duration: this.mergedOptions.duration * 1000
        }, startOffset)

        let delay = startOffset + (this.mergedOptions.duration + Math.random() * this.mergedOptions.maxDelay) * 1000

        this.animationTimeline.add({
          targets: droplet,
          opacity: 0,
          easing: 'easeInOutQuad',
          duration: this.mergedOptions.duration * 1000
        }, delay)

        let halfRad = radius / 2
    		let corners = this.getCorners(droplet, halfRad)

        let cornersInM = 0
        for (let i = 0; i < corners.length; i++) {
          if (this.inside(corners[i])) {
            cornersInM++
          }
        }
        if (cornersInM) {
          for (let i = 0; i < corners.length; i++) {
            let corner = corners[i]
            let opacity = this.mergedOptions.minDropOpacity + (cornersInM / 4) * (this.mergedOptions.maxDropOpacity - this.mergedOptions.minDropOpacity)
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
      this.totalOpacity = 0
      this.animationTimeline.add({
        targets: this,
        totalOpacity: this.mergedOptions.totalOpacity,
        easing: 'easeInOutQuad',
        duration: this.animationTimeline.duration * 0.66
      }, 0)
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
