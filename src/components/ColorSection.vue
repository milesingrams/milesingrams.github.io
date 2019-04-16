<template>
  <section class="section" :style="{'background-color': color}">
    <div class="section-content">
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
.section {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-content {
  padding: $spacing-s;
  z-index: 1;
}
</style>
