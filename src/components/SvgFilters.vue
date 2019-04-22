<template>
  <svg class="svg-filters" xmlns="http://www.w3.org/2000/svg">
    <filter id="watercolor-filter">
      <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="4" />
      <feColorMatrix values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.6 1.2" result="texture" />
      <feComposite in="SourceGraphic" in2="texture" operator="in" />
    </filter>
    <filter id="pencil-filter">
      <feTurbulence baseFrequency="0.02" numOctaves="6" type="fractalNoise" />
      <feDisplacementMap scale="4" in="SourceGraphic" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
</template>

<script>
export default {
  name: 'SvgFilters'
}
</script>

<style lang="scss" scoped>
.svg-filters {
  position: absolute;
  width: 0;
  height: 0;
  visibility: hidden;
}
</style>
