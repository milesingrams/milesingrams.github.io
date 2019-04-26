<template>
  <div class="image-item" @click="onClick" @mousemove="onMouseMove" @mouseleave="onMouseLeave" :style="{'transform': `translateZ(${translateZ}rem) rotate3d(${axisX}, ${axisY * -1}, 0, ${magnitude * 7.5}deg)`}">
    <g-image :src="image.preview" immediate="true" blur="10"></g-image>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'ImageGalleryImage',
  props: ['image'],
  data () {
    return {
      axisX: 0,
      axisY: 0,
      magnitude: 0,
      translateZ: 0
    }
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
    },
    onMouseMove (event) {
      let halfWidth = this.$el.clientWidth / 2
      let halfHeight = this.$el.clientHeight / 2
      let distX = event.offsetX - halfWidth
      let distY = event.offsetY - halfHeight
      this.translateZ = 1.5
      this.axisX = distY
      this.axisY = distX
      this.magnitude = Math.sqrt(Math.pow(distX / halfWidth, 2) + Math.pow(distY / halfHeight, 2))
    },
    onMouseLeave () {
      this.translateZ = 0
      this.magnitude = 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
