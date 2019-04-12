<template>
  <div>
    <svg class="logo-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="logo-clip" clipPathUnits="objectBoundingBox">
          <polygon :points="polyPointString"></polygon>
        </clipPath>
      </defs>
    </svg>
    <div class="logo-canvas-wrap">
      <canvas class="logo-canvas" ref="canvas" width="30" height="30"></canvas>
    </div>
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
      noise: null,
      noiseScale: 30,
      noiseSpeed: 0.1,
      baseColorVal: 172,
      animationFrame: null
    }
  },
  computed: {
    polyPointString () {
      let polyPointString = this.poly.map((point) => {
        return `${point[0] / 100},${point[1] / 100}`
      }).join(' ')
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

          let hue = this.noise.noise3D(xPos + timestampSeconds / 10, yPos, timestampSeconds * this.noiseSpeed) * 360
          this.context.fillStyle = `hsl(${hue}, 80%, 75%)`
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
    if (process.isClient) {
      this.noise = new SimplexNoise()
      this.context = this.$refs.canvas.getContext('2d')
      this.run()
    }
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

.logo-canvas-wrap {
  animation: shrink 5s ease-in-out forwards;
}

.logo-canvas {
  clip-path: url(#logo-clip);
  width: 100%;
  height: 100%;
  filter: blur(5px);
}

@keyframes shrink {
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
