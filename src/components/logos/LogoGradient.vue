<template>
  <canvas class="logo-canvas" ref="canvas" width="100" height="100"></canvas>
</template>

<script>

export default {
  name: 'LogoGradient',
  props: ['poly'],
  data () {
    return {
      context: null,
      baseColorVal: 190,
    }
  },
  computed: {
    modifiedColorVal () {
      return 256 - this.baseColorVal
    }
  },
  methods: {
    draw (timestamp) {
      let timestampSeconds = timestamp / 1000
      for (let x = 0; x <= 20; x++) {
        for (let y = 0; y <= 20; y++) {
          let red = Math.floor(this.baseColorVal + this.modifiedColorVal * Math.cos((x * x - y * y) / 300 + timestampSeconds))
          let green = Math.floor(this.baseColorVal + this.modifiedColorVal * Math.sin((x * x * Math.cos(timestampSeconds / 4) + y * y * Math.sin(timestampSeconds / 3)) / 300))
          let blue = Math.floor(this.baseColorVal + this.modifiedColorVal * Math.sin(5 * Math.sin(timestampSeconds / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100))
          this.context.fillStyle = `rgb(${red}, ${green}, ${blue})`
          this.context.fillRect(x, y, 1, 1)
        }
      }
      window.requestAnimationFrame(this.draw)
    },
    run () {
      this.draw()
    }
  },
  created () {
  },
  mounted () {
    this.context = this.$refs.canvas.getContext('2d')
    this.run()
  }
}
</script>

<style lang="scss" scoped>
</style>
