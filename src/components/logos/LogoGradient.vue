<template>
  <div class="logo-clip" :style="{'clip-path': `polygon(${polyPointString})`}">
    <canvas class="logo-canvas" ref="canvas" width="20" height="20"></canvas>
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
      noiseR: null,
      noiseG: null,
      noiseB: null,
      noiseScale: 15,
      noiseSpeed: 0.5,
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

          let red = this.baseColorVal + this.noiseR.noise3D(xPos, yPos, timestampSeconds * this.noiseSpeed) * (256 - this.baseColorVal)
          let green = this.baseColorVal + this.noiseG.noise3D(xPos, yPos, timestampSeconds * this.noiseSpeed) * (256 - this.baseColorVal)
          let blue = this.baseColorVal + this.noiseB.noise3D(xPos, yPos, timestampSeconds * this.noiseSpeed) * (256 - this.baseColorVal)
          this.context.fillStyle = `rgb(${red}, ${green}, ${blue})`
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
    this.noiseR = new SimplexNoise()
    this.noiseG = new SimplexNoise()
    this.noiseB = new SimplexNoise()
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
