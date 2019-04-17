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
      <canvas class="effect-canvas" ref="canvas" width="40" height="40"></canvas>
    </div>
  </div>
</template>

<script>
import SimplexNoise from 'simplex-noise'

export default {
  name: 'EffectGradient',
  props: ['progress', 'options'],
  data () {
    return {
      context: null,
      noise: null,
      baseOptions: {
        poly: null,
        color: 'white',
        maxOpacity: 0.9,
        noiseScale: 15,
        noiseSpeed: 1
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
    },
    colorRGB () {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.mergedOptions.color)
      let rgb = [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ].join(', ')
      return rgb
    }
  },
  watch: {
    'progress' () {
      this.draw()
    }
  },
  methods: {
    draw () {
      for (let x = 0; x <= this.$refs.canvas.width; x++) {
        let xPos = x / this.mergedOptions.noiseScale
        for (let y = 0; y <= this.$refs.canvas.height; y++) {
          let yPos = y / this.mergedOptions.noiseScale
          let noise = this.noise.noise3D(xPos, yPos, this.progress * this.mergedOptions.noiseSpeed)
          let alpha = Math.abs(noise) * this.progress * this.mergedOptions.maxOpacity
          this.context.fillStyle = `rgba(${this.colorRGB}, ${alpha})`
          this.context.clearRect(x, y, 1, 1)
          this.context.fillRect(x, y, 1, 1)
        }
      }
    }
  },
  mounted () {
    this.noise = new SimplexNoise()
    this.context = this.$refs.canvas.getContext('2d')
    this.draw()
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
  display: block;
  width: 100%;
  height: 100%;
  filter: blur(5px);
}
</style>
