<template>
  <div>
    <svg class="effect-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="effect-clip" clipPathUnits="objectBoundingBox">
          <polygon v-if="mergedOptions.poly" :points="polyPointString"></polygon>
          <circle v-if="!mergedOptions.poly" cx="0.5" cy="0.5" r="0.5"></circle>
        </clipPath>
      </defs>
    </svg>
    <div class="effect-canvas-wrap">
      <canvas class="effect-canvas" ref="canvas" width="30" height="30"></canvas>
    </div>
  </div>
</template>

<script>
import SimplexNoise from 'simplex-noise'
export default {
  name: 'EffectGradient',
  props: ['options'],
  data () {
    return {
      context: null,
      noise: null,
      animationFrame: null,
      colorPrimary: null,
      colorSecondary: null,
      baseOptions: {
        poly: null,
        color: 'white',
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
          this.context.fillStyle = this.mergedOptions.color
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
    let bodyStyle = getComputedStyle(document.body)
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
.effect-svg {
  position: absolute;
  width: 0;
  height: 0;
}

.effect-canvas-wrap {
  clip-path: url(#effect-clip);
}

.effect-canvas {
  width: 100%;
  height: 100%;
  filter: blur(5px);
}
</style>
