<template>
  <div class="image-gallery-wrap" :style="{'justify-content': centerContent ? 'center' : 'start'}">
    <ul class="image-gallery" ref="imageGallery">
      <li class="image-item" v-for="(image, index) in images" @click="onImageClick(index)">
        <g-image :src="image.preview"></g-image>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: ['images'],
  data () {
    return {
      centerContent: false
    }
  },
  methods: {
    onImageClick (imageIndex) {
      this.$emit('image-clicked', imageIndex)
    },
    onWindowResize () {
      this.centerContent = this.$refs.imageGallery.clientWidth < window.innerWidth
    }
  },
  mounted () {
    if (process.isClient) {
      window.addEventListener('resize', this.onWindowResize)
      this.onWindowResize()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  }
}
</script>

<style lang="scss" scoped>
.image-gallery-wrap {
  margin: -2rem 0;
  overflow-x: scroll;
  @include scroll-mobile;
  display: flex;
}

.image-gallery {
  display: flex;
  align-items: flex-start;
  padding: 2rem;
  perspective: 1200px;

  .image-item {
    position: relative;
    line-height: 0;
    background-color: white;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 2px 3px rgba(0, 0, 0, 0.15);
    padding: 0.75rem;
    transform-origin: 25% 25%;
    transition: all 0.2s var(--ease-in-out-quad);

    &:hover {
      transform: rotateX(6deg) rotateY(-3deg) rotateZ(-1deg);
      box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.15), 0 3px 10px -4px rgba(0, 0, 0, 0.2);
    }

    &:not(:last-child) {
      margin-right: 2rem;
    }

    img {
      max-width: 60vw;
    }
  }
}
</style>
