<template>
  <div class="image-gallery-wrap" :style="{'justify-content': centerContent ? 'center' : 'start'}">
    <div class="image-gallery" ref="imageGallery">
      <image-gallery-image v-for="(image, index) in images" :image="image" @click="onImageClick(index)" :key="index"></image-gallery-image>
    </div>
  </div>
</template>

<script>
import ImageGalleryImage from '~/components/ImageGalleryImage'

export default {
  name: 'ImageGallery',
  props: ['images'],
  components: {
    ImageGalleryImage
  },
  data () {
    return {
      centerContent: false
    }
  },
  methods: {
    onImageClick (imageIndex) {
      console.log('ads')
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
  perspective: 1250px;

  .image-item {
    position: relative;
    line-height: 0;
    background-color: white;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 2px 3px rgba(0, 0, 0, 0.15);
    padding: 0.75rem;
    transition: all 0.15s var(--ease-out-quad);

    &:hover {
      box-shadow: 0 5px 20px -6px rgba(0, 0, 0, 0.2), 0 3px 10px -4px rgba(0, 0, 0, 0.2);
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
