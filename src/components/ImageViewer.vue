<template>
  <transition appear name="image-viewer">
    <div class="image-viewer" v-if="isOpen" @wheel="onWheel" v-hammer:swipe="onSwipe">
      <div class="image-viewer-background" @click="close"></div>
      <div class="image-viewer-content">
        <div class="images" :style="{'transform': `translateX(calc(${-100 * imageIndex}vw - ${2 * imageIndex}rem))`}">
          <div class="image-wrap" v-for="image in images">
            <g-image :src="image.image" blur="10" :alt="image.caption"></g-image>
            <p class="image-caption" v-if="image.caption">{{image.caption}}</p>
          </div>
        </div>
      </div>
      <div class="image-viewer-nav">
        <button class="viewer-button close-button" aria-label="close" @click="close">
          <icon-close class="icon"></icon-close>
        </button>
        <button class="viewer-button left-button" aria-label="previous" :disabled="this.imageIndex === 0" @click="previousImage">
          <icon-arrow-left class="icon"></icon-arrow-left>
        </button>
        <button class="viewer-button right-button" aria-label="next" :disabled="this.imageIndex === this.images.length - 1" @click="nextImage">
          <icon-arrow-right class="icon"></icon-arrow-right>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import IconClose from '~/assets/icons/IconClose.svg'
import IconArrowLeft from '~/assets/icons/IconArrowLeft.svg'
import IconArrowRight from '~/assets/icons/IconArrowRight.svg'
import utilities from '~/utilities'

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
      imageIndex: 0
    }
  },
  methods: {
    open (imageIndex) {
      if (imageIndex !== undefined) {
        this.imageIndex = imageIndex
      }
      this.addWindowListeners()
      this.isOpen = true
    },
    close () {
      this.removeWindowListeners()
      this.isOpen = false
    },
    nextImage () {
      if (this.imageIndex < this.images.length - 1) {
        this.imageIndex++
      }
    },
    previousImage () {
      if (this.imageIndex > 0) {
        this.imageIndex--
      }
    },
    onWindowKeyDown (event) {
      switch (event.keyCode) {
        case 27:
          this.close()
          event.preventDefault()
          break
        case 37:
        case 38:
          this.previousImage()
          event.preventDefault()
          break
        case 39:
        case 40:
          this.nextImage()
          event.preventDefault()
          break
      }
    },
    onWheel: utilities.throttle(function (event) {
      if (event.deltaY > 0) {
        this.nextImage()
      } else {
        this.previousImage()
      }
    }, 300),
    onSwipe (event) {
      switch (event.direction) {
        case 8:
        case 16:
          this.close()
          break
        case 4:
          this.previousImage()
          break
        case 2:
          this.nextImage()
          break
      }
    },
    addWindowListeners () {
      window.addEventListener('keydown', this.onWindowKeyDown)
      document.documentElement.style.overflow = 'hidden'
    },
    removeWindowListeners () {
      window.removeEventListener('keydown', this.onWindowKeyDown)
      document.documentElement.style.overflow = 'auto'
    }
  },
  beforeDestroy () {
    this.removeWindowListeners()
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

  &:hover {
    .image-viewer-nav {
      opacity: 1;
    }
  }
}

.image-viewer-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -1;
}

.image-viewer-content {
  pointer-events: none;

  .images {
    display: flex;
    align-items: flex-start;
    transition: transform 0.2s var(--ease-in-out-quad);

    .image-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      padding: 2rem 0;


      &:not(:last-child) {
        margin-right: 2rem;
      }

      img {
        background-color: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        pointer-events: all;
        flex: 0;
        max-width: 100%;
        max-height: 100%;
      }

      .image-caption {
        position: absolute;
        bottom: 2.5rem;
        padding: 0.5rem 0.75rem;
        margin-right: 1rem;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.8);
        max-width: 600px;
        color: white;
      }
    }
  }
}

.image-viewer-nav {
  transition: opacity 0.2s var(--ease-in-out-quad);

  .viewer-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 0.75rem;
    color: rgba(255, 255, 255, 0.75);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    transition: color 0.1s var(--ease-in-out-quad);
    border: none;
    cursor: pointer;
    font-size: 1.05rem;

    &:disabled {
      opacity: 0.5;
      color: white;
    }

    &:hover {
      color: white;
    }
  }

  .close-button {
    top: 0.5rem;
    right: 0.5rem;
  }

  .left-button, .right-button {
    top: 50%;
    transform: translateY(-50%);
  }

  .left-button {
    left: 0.5rem;
  }

  .right-button {
    right: 0.5rem;
  }

  @include media('>=desktop') {
    opacity: 0;
  }
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
