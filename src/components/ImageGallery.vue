<template>
  <div class="image-gallery-wrap" :style="{'justify-content': centerContent ? 'center' : 'start'}">
    <div class="image-gallery" ref="imageGallery">
      <polaroid-image v-for="(image, index) in images" :image="image" @click="onImageClick(index)" :key="index"></polaroid-image>
    </div>
  </div>
</template>

<script>
import PolaroidImage from '~/components/PolaroidImage'

export default {
  name: 'ImageGallery',
  props: ['images'],
  components: {
    PolaroidImage
  },
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

  .polaroid-wrap {
    &:not(:last-child) {
      margin-right: 2rem;
    }

    /deep/ img {
      max-width: 60vw;
    }
  }
}
</style>
