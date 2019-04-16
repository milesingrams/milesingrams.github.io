<template>
  <section class="logo-section" :style="{'background-color': color}">
    <div class="logo-section-content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  name: 'LogoSection',
  props: ['color']
}
</script>

<style lang="scss" scoped>
.logo-section {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-section-content {
  padding: $spacing-s;
  z-index: 1;
}
</style>
