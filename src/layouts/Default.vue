<template>
  <div class="page-content">
    <slot/>
    <div class="texture"></div>
  </div>
</template>

<style lang="scss">
.page-content {
  position: relative;
}

.texture {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/textures/paper.png');
  pointer-events: none;
}
</style>
