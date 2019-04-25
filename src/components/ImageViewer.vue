<template>
  <transition appear name="image-viewer">
    <div class="image-viewer" v-if="isOpen" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <div class="image-viewer-background" @click="close"></div>
      <div class="image-viewer-content">
          <g-image class="current-image" :src="currentImage.image"></g-image>
      </div>
      <transition appear name="fadeInOut" :duration="200">
        <div class="image-viewer-nav" v-if="showNav">
          <button class="viewer-button close-button" @click="close">
            <icon-close class="icon"></icon-close>
          </button>
          <button class="viewer-button left-button" @click="previousImage">
            <icon-arrow-left class="icon"></icon-arrow-left>
          </button>
          <button class="viewer-button right-button" @click="nextImage">
            <icon-arrow-right class="icon"></icon-arrow-right>
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import IconClose from '~/assets/icons/IconClose.svg'
import IconArrowLeft from '~/assets/icons/IconArrowLeft.svg'
import IconArrowRight from '~/assets/icons/IconArrowRight.svg'

export default {
  name: 'ImageViewer',
  props: ['images'],
  components: {
    IconClose,
    IconArrowLeft,
    IconArrowRight
  },
  data () {
    return {
      isOpen: false,
      imageIndex: 0,
      showNav: false
    }
  },
  computed: {
    currentImage () {
      return this.images[this.imageIndex]
    }
  },
  methods: {
    open (imageIndex) {
      if (imageIndex) {
        this.imageIndex = imageIndex
      }
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    nextImage () {
      this.imageIndex++
      if (this.imageIndex > this.images.length - 1) {
        this.imageIndex = 0
      }
    },
    previousImage () {
      this.imageIndex--
      if (this.imageIndex < 0) {
        this.imageIndex = this.images.length - 1
      }
    },
    onMouseEnter () {
      this.showNav = true
    },
    onMouseLeave () {
      this.showNav = false
    },
    onWindowKeyDown (event) {
      switch (event.keyCode) {
        case 27:
          this.close()
          break
        case 37:
        case 38:
          this.previousImage()
          break
        case 39:
        case 40:
          this.nextImage()
          break
      }
      event.preventDefault()
    },
    onWindowScroll (event) {
      event.preventDefault()
    }
  },
  created () {
    window.addEventListener('keydown', this.onWindowKeyDown)
    window.addEventListener('scroll', this.onWindowScroll)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.onWindowKeyDown)
    window.removeEventListener('scroll', this.onWindowScroll)
  }
}
</script>

<style lang="scss" scoped>
.image-viewer {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  padding: 1.5rem 0.5rem;
}

.image-viewer-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: -1;
}

.image-viewer-content {
  margin: auto;

  img {
    max-width: 100%;
    max-height: calc(100vh - 3rem);
  }
}

.viewer-button {
  display: flex;
  position: absolute;
  padding: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.1s var(--ease-in-out-quad);
  border: none;

  .icon {
    margin: auto;
  }

  &:hover {
    color: white;
  }
}

.close-button {
  top: 6px;
  right: 6px;
  background-color: transparent;

  .icon {
    width: 1.2rem;
    height: 1.2rem;
  }
}

.left-button, .right-button {
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.4);
}

.left-button {
  left: 6px;
}

.right-button {
  right: 6px;
}

.image-viewer-enter-active {
  animation: fadeIn 0.3s var(--ease-in-quad) both;

  .image-viewer-content {
    animation: fadeInUp 0.4s var(--ease-out-quad) 0.4s both;
  }
}

.image-viewer-leave-active {
  animation: fadeOut 0.3s var(--ease-out-quad) both;

  .image-viewer-content {
    animation: fadeOutDown 0.4s var(--ease-in-quad) both;
  }
}
</style>
