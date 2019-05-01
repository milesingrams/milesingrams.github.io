<template>
  <div class="polaroid-wrap">
    <div class="polaroid" @click="onClick" @mousemove="onMouseMove" @mouseleave="onMouseLeave" :style="{'transform': `translateZ(${translateZ}rem) rotate3d(${axisX}, ${axisY * -1}, 0, ${magnitude * 10}deg)`}">
      <g-image :src="image.preview" immediate="true" blur="10"></g-image>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'PolaroidImage',
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
      this.translateZ = 2
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
.polaroid-wrap {
  perspective: 1000px;
}

.polaroid {
  position: relative;
  line-height: 0;
  background-color: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 2px 3px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
  transition: all 0.2s var(--ease-out-quad);
  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 20px -10px rgba(0, 0, 0, 0.20), 0 3px 10px -5px rgba(0, 0, 0, 0.25);
  }
}
</style>
