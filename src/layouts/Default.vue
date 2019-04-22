<template>
  <div class="page-content">
    <slot/>
    <div class="texture"></div>
    <svg-filters></svg-filters>
  </div>
</template>

<script>
import SvgFilters from '~/components/SvgFilters'

export default {
  components: {
    SvgFilters
  }
}
</script>

<style lang="scss">
.page-content {
  position: relative;
}

.texture {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/textures/paper.png');
  pointer-events: none;
  z-index: 100;
}
</style>
