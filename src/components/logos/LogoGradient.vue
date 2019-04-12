<template>
  <div class="logo-clip" :style="{'clip-path': `polygon(${polyPointString})`}">
    <canvas class="logo-canvas" ref="canvas" width="100" height="100"></canvas>
  </div>
</template>

<script>
import SimplexNoise from 'simplex-noise'

export default {
  name: 'LogoGradient',
  props: ['poly'],
  data () {
    return {
      context: null,
      noiseH: null,
      noiseScale: 30,
      noiseSpeed: 0.2,
      baseColorVal: 172,
      animationFrame: null
    }
  },
  computed: {
    polyPointString () {
      let polyPointString = this.poly.map((point) => {
        return `${point[0]}% ${point[1]}%`
      }).join(', ')
      return polyPointString
    }
  },
  methods: {
    draw (timestamp) {
      let timestampSeconds = timestamp / 1000
      for (let x = 0; x <= this.$refs.canvas.width; x++) {
        let xPos = x / this.noiseScale
        for (let y = 0; y <= this.$refs.canvas.height; y++) {
          let yPos = y / this.noiseScale

          let hue = this.noiseH.noise3D(xPos + timestampSeconds / 5, yPos, timestampSeconds * this.noiseSpeed) * 360
          this.context.fillStyle = `hsl(${hue}, 80%, 65%)`
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
    this.noiseH = new SimplexNoise()
    this.context = this.$refs.canvas.getContext('2d')
    this.run()
  },
  beforeDestroy () {
    cancelAnimationFrame(this.animationFrame)
  }
}
</script>

<style lang="scss" scoped>
.logo-canvas {
  width: 100%;
  height: 100%;
}

.logo-clip {
  animation: clipShrink 6s;
}

@keyframes clipShrink {
  from {
    transform: scale(1.2);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
