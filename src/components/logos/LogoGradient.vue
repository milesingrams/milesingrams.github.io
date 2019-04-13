<template>
  <div>
    <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="logo-clip" clipPathUnits="objectBoundingBox">
          <polygon v-if="mergedOptions.poly" :points="polyPointString"></polygon>
          <circle v-if="!mergedOptions.poly" cx="0.5" cy="0.5" r="0.5"></circle>
        </clipPath>
      </defs>
    </svg>
    <canvas class="logo-canvas" ref="canvas" width="30" height="30"></canvas>
  </div>
</template>

<script>
import SimplexNoise from 'simplex-noise'

export default {
  name: 'LogoGradient',
  props: ['options'],
  data () {
    return {
      context: null,
      noise: null,
      animationFrame: null,
      baseOptions: {
        poly: null,
        interactive: true,
        noiseScale: 30,
        noiseSpeed: 0.2
      }
    }
  },
  computed: {
    mergedOptions () {
      return Object.assign({}, this.baseOptions, this.options)
    },
    polyPointString () {
      let polyPointString = this.mergedOptions.poly.map((point) => {
        return `${point[0] / 100},${point[1] / 100}`
      }).join(' ')
      return polyPointString
    }
  },
  methods: {
    draw (timestamp) {
      let timestampSeconds = timestamp / 1000
      for (let x = 0; x <= this.$refs.canvas.width; x++) {
        let xPos = x / this.mergedOptions.noiseScale
        for (let y = 0; y <= this.$refs.canvas.height; y++) {
          let yPos = y / this.mergedOptions.noiseScale

          let noise = this.noise.noise3D(xPos + timestampSeconds / 10, yPos, timestampSeconds * this.mergedOptions.noiseSpeed)
          this.context.fillStyle = `hsl(${noise * 360}, 80%, 75%)`
          this.context.fillRect(x, y, 1, 1)
        }
      }
      this.animationFrame = requestAnimationFrame(this.draw)
    },
    run () {
      this.draw()
    }
  },
  mounted () {
    this.noise = new SimplexNoise()
    this.context = this.$refs.canvas.getContext('2d')
    this.run()
  },
  beforeDestroy () {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-svg {
  position: absolute;
  width: 0;
  height: 0;
}

.logo-canvas {
  width: 100%;
  height: 100%;
  filter: blur(5px);
  clip-path: url(#logo-clip);
}
</style>
