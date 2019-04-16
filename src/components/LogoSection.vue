<template>
  <div class="logo-section">
    <div class="logo-wrap">
      <keep-alive>
        <logo v-if="inViewport" :effect="effect" :color="color" :progress="progress"></logo>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  name: 'LogoSection',
  props: ['effect', 'color', 'progress'],
  components: {
    Logo
  },
  data () {
    return  {
      inViewport: false
    }
  },
  watch: {
    'progress' () {
      this.updateInViewport()
    }
  },
  methods: {
    updateInViewport () {
      let rect = this.$el.getBoundingClientRect()
      let height = rect.bottom - rect.top
      this.inViewport = rect.top > -height && rect.bottom < window.innerHeight + height
    }
  },
  mounted () {
    this.updateInViewport()
  }
}
</script>

<style lang="scss" scoped>
.logo-section {
  min-height: 50vh;
  clip-path: inset(0 0 0 0);

  &:nth-child(even) {
    background-color: #eee;
  }
}

.logo-wrap {
  position: fixed;
  left: 50vw;
  top: 50vh;
  width: 30vh;
  height: 30vh;
  transform: translate(-50%, -50%);
}
</style>
